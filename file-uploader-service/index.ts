import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import multer, { FileFilterCallback } from "multer";
import cors from "cors";

const app = express();
const port = 5000;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads"));

var storage = multer.diskStorage({
  destination: function (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    callback(null, "uploads");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

app.post(
  "/image-upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    const fileName = req.file?.filename;
    const originalName = req.file?.originalname;
    const filePath = req.file?.path;
    res.send({
      message: "Image uploaded",
      filename: fileName,
      originalname: originalName,
      filepath: filePath,
    });
  }
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
