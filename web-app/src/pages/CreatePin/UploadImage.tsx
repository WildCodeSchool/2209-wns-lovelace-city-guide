import { useState } from "react";
import { useParams } from "react-router-dom";

const UploadImage = () => {
  type PinIdParams = {
    pinId: string;
  };
  let { pinId } = useParams<PinIdParams>();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const response = await fetch("http://localhost:5000/api/image-upload", {
        method: "POST",
        body: formData,
      });
      if (response) {
        setStatus(response.statusText);
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
