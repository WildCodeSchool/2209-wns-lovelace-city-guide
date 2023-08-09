"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
var storage = multer_1.default.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
app.post("/uploader/image-upload", upload.single("file"), (req, res) => {
    var _a, _b, _c;
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const originalName = (_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname;
    const filePath = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
    res.send({
        message: "Image uploaded",
        filename: fileName,
        originalname: originalName,
        filepath: filePath,
    });
});
app.use("/uploader", express_1.default.static("uploads"));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
