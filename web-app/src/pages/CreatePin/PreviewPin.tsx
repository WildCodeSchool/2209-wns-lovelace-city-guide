import { gql, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Img } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { GetPinByIdQuery } from "../../gql/graphql";

const GET_PIN_BY_ID = gql`
  query GetPinById($pinId: String!) {
    getPinById(id: $pinId) {
      id
      name
      address
      categories {
        id
        categoryName
      }
      description
      images {
        id
        fileName
      }
      latitude
      longitude
      createdAt
    }
  }
`;
const PreviewPin = () => {
  let { pinId } = useParams();
  const { data, loading, error } = useQuery<GetPinByIdQuery>(GET_PIN_BY_ID, {
    variables: { pinId },
  });

  const renderPin = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.getPinById) {
      return "Pin not found";
    }
    const images = data?.getPinById?.images;
    return (
      <div>
        <h1>PreviewPin : {pinId}</h1>
        <p>Name : {data.getPinById.name}</p>
        {images &&
          images.map((image) => (
            <img src={`http://localhost:5000/${image.fileName}`} alt="pin" />
          ))}
        <Link to={`/upload-image/${pinId}`}>
          <Button>Ajoute image</Button>
        </Link>
      </div>
    );
  };
  return <>{renderPin()}</>;
};

export default PreviewPin;
