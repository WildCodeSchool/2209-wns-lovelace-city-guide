import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddImageToPinMutation,
  AddImageToPinMutationVariables,
} from "../../gql/graphql";

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
      const responseUploadImage = await fetch(
        "http://localhost:5000/api/image-upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const responseAddImageToPin = await addImageToPin();
      console.log(responseAddImageToPin);
      if (responseUploadImage && responseAddImageToPin) {
        setStatus(responseUploadImage.statusText);
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
    <div>
      <h1>Pin : {pinId}</h1>
      <h1>Upload image to server</h1>
      {image.preview && (
        <img alt="preview" src={image.preview} width="100" height="100" />
      )}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  );
};

export default UploadImage;
