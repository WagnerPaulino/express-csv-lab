import { Request, Response, Router } from "express";
import { Parser } from "json2csv";
import csv from "fast-csv";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: 'tmp/csv/' });

export const csvRouter = Router();

const downloadResource = (
  res: Response,
  fileName: string,
  fields: any[],
  data: any
) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  return res.send(csv);
};

csvRouter.post("/to-csv", (req: Request, res: Response) => {
  return downloadResource(res, "output.csv", Object.keys(req.body), req.body);
});

csvRouter.post("/from-csv", upload.single('file'), (req: Request, res: Response) => {
  const fileRows: any = [];

  csv.parseFile(req.file.path)
    .on("data", function (data: any) {
      fileRows.push(data);
    })
    .on("end", function () {
      res.send(fileRows);
      fs.unlinkSync(req.file.path);
    })
});