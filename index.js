import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import qr from "qr-image";
import file from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit",(req,res)=>{
  console.log(req.body.url);
  var qrimg=qr.image(req.body.url);
  qrimg.pipe(file.createWriteStream("./public/qr_img.png"))
   res.sendFile(__dirname + "/public/index.html");
   
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


