import { gql, useMutation } from "@apollo/client";
import { Box, Button, Flex, Heading} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddImageToPinMutation,
  AddImageToPinMutationVariables,
} from "../../gql/graphql";
import { ContainerTable } from "pages/Admin/ContainerTable.style";
import { FaAngleDoubleLeft } from "react-icons/fa";

const ADD_IMAGE_TO_PIN = gql`
  mutation addImageToPin($fileName: String!, $pinId: String!) {
    addImageToPin(fileName: $fileName, pinId: $pinId) {
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
type PinIdParams = {
  pinId: string;
};

const UploadImage = () => {
  let { pinId } = useParams() as PinIdParams;
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  const [addImageToPin] = useMutation<
    AddImageToPinMutation,
    AddImageToPinMutationVariables
  >(ADD_IMAGE_TO_PIN, {
    variables: {
      fileName,
      pinId,
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const responseUploadImage = await fetch("/uploader/image-upload", {
        method: "POST",
        body: formData,
      });
      const responseAddImageToPin = await addImageToPin();
      console.log(responseAddImageToPin);
      if (responseUploadImage && responseAddImageToPin) {
        setStatus(responseUploadImage.statusText);
        navigate(`/preview-pin/${pinId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event: any) => {
    const image = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(image);
    setFileName(event.target.files[0].name);
  };
  return (
    <>
      <ContainerTable>
        <Flex width="full" align="center" justifyContent="center">
          <Box
            bg="#fff"
            p={8}
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Link to={`/preview-pin/${pinId}`}>
                <Button bgColor="#ff8787" color="#fff">
                  <FaAngleDoubleLeft />
                </Button>
              </Link>
            </Box>
            <Box textAlign="center">
              <Heading>Ajoute une image</Heading>
            </Box>
            <Box my={4} textAlign="left">
              {image.preview && (
                <img
                  alt="preview"
                  src={image.preview}
                  width="100"
                  height="100"
                />
              )}
              <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={handleFileChange} />
                <Button colorScheme="teal" type="submit">
                  Envoyer
                </Button>
              </form>
              {status && <h4>{status}</h4>}
            </Box>
          </Box>
        </Flex>
      </ContainerTable>
    </>
  );
};

export default UploadImage;
