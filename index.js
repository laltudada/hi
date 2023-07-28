import express from "express";
import fs from "fs";
import ytdl from "ytdl-core";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let vidId;
let vidData;

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const downloader = (req, res, next) => {
  const vidUrl = req.body["youtube"];
  const vidQ = req.body["quality"];
  vidId = ytdl.getURLVideoID(vidUrl);
  
  next();
}

app.use(downloader);

// app.post("/getvideo", (req, res) => {
//   res.download(__dirname + '/video.mp4', 'video.mp4', (err) => {
//     if (err) {
//       // Handle error, but keep in mind the response may be partially-sent
//       // so check res.headersSent
//       console.log(err);
//     } else {
//       // decrement a download credit, etc.
//     }
//   })
// });

app.get("/getvideo", (req, res) => {
    res.download(__dirname + '/video.mp4', vidId, (err) => {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
        console.log(err);
      } else {
        // decrement a download credit, etc.
      }
    })
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
