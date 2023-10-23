"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dataSource_1 = __importDefault(require("./db/dataSource"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const contentRoutes_js_1 = __importDefault(require("./routes/contentRoutes.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/', authRoutes_js_1.default);
app.use('/user', contentRoutes_js_1.default);
const s3 = new aws_sdk_1.default.S3({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    signatureVersion: 'v4'
});
app.post('/category', (req, res) => {
    let fileType = req.body.type;
    let uploadData;
    let keyPath = '';
    switch (fileType) {
        case 'link':
            uploadData = Buffer.from(req.body.link);
            keyPath = 'links/' + Date.now() + '.txt';
            break;
        case 'json':
            uploadData = Buffer.from(JSON.stringify(req.body.data));
            keyPath = 'json/' + Date.now() + '.json';
            break;
        case 'text':
            uploadData = Buffer.from(req.body.text);
            keyPath = 'text/' + Date.now() + '.txt';
            break;
        default:
            return res.status(400).send("Invalid file type");
    }
    s3.putObject({
        Bucket: 'suzans3',
        Key: keyPath,
        Body: uploadData
    }, (error, data) => {
        if (error) {
            console.error(`Error uploading ${fileType} to S3:`, error);
            res.status(500).send("Error uploading to S3");
        }
        else {
            res.status(200).json({ message: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully` });
        }
    });
});
// // Upload link
// app.post('/category', (req, res) => {
//   const link = req.body.link;
//   s3.putObject({
//     Bucket: 'suzans3',
//     Key: 'links/' + Date.now() + '.txt',
//     Body: Buffer.from(link)
//   }, (error: any, data: any) => {
//     if (error) {
//       console.error("Error uploading link to S3:", error);
//       res.status(500).send("Error uploading to S3");
//     } else {
//       res.status(200).json({ message: "Link uploaded successfully" });
//     }
//   });
// });
// // Upload JSON
// app.post('/category', (req, res) => {
//   const jsonData = JSON.stringify(req.body);
//   s3.putObject({
//     Bucket: 'suzans3',
//     Key: 'json/' + Date.now() + '.json',
//     Body: Buffer.from(jsonData)
//   }, (error: any, data: any) => {
//     if (error) {
//       console.error("Error uploading JSON to S3:", error);
//       res.status(500).send("Error uploading to S3");
//     } else {
//       res.status(200).json({ message: "JSON uploaded successfully" });
//     }
//   });
// });
// // Upload text
// app.post('/category', (req, res) => {
//   const text = req.body.text;
//   s3.putObject({
//     Bucket: 'suzans3',
//     Key: 'text/' + Date.now() + '.txt',
//     Body: Buffer.from(text)
//   }, (error: any, data: any) => {
//     if (error) {
//       console.error("Error uploading text to S3:", error);
//       res.status(500).send("Error uploading to S3");
//     } else {
//       res.status(200).json({ message: "Text uploaded successfully" });
//     }
//   });
// });
const PORT = process.env.PORT || 5000;
dataSource_1.default.initialize().then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
