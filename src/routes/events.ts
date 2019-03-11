import { Request, Response } from "express";

const express = require("express");
export let router = express.Router();

router.get("/list", (req: Request, res: Response) => {
    res.json({
        "event": "Jake's secret party",
        "id": 1
    });
});

router.post("/", (req: Request, res: Response) => {
    console.log(req.body);
    res.json({
        "id": 1
    });
});

router.get("/:id", (req: Request, res: Response) => {
    console.log(req.params);
    res.json({
        "id": 0,
        "name": "Jake's secret party",
        "dates": [
          "2014-01-01",
          "2014-01-05",
          "2014-01-12"
        ],
        "votes": [
          {
            "date": "2014-01-01",
            "people": [
              "John",
              "Julia",
              "Paul",
              "Daisy"
            ]
          }
        ]
      });
});

router.post("/:id/vote", (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.body);
    res.json({
        "id": 0,
        "name": "Jake's secret party",
        "dates": [
          "2014-01-01",
          "2014-01-05",
          "2014-01-12"
        ],
        "votes": [
          {
            "date": "2014-01-01",
            "people": [
              "John",
              "Julia",
              "Paul",
              "Daisy",
              "Dick"
            ]
          },
          {
            "date": "2014-01-05",
            "people": [
              "Dick"
            ]
          }
        ]
      });
});

router.get("/:id/results", (req: Request, res: Response) => {
    console.log(req.params);
    res.json({
        "id": 0,
        "name": "Jake's secret party",
        "suitableDates": [
          {
            "date": "2014-01-01",
            "people": [
              "John",
              "Julia",
              "Paul",
              "Daisy",
              "Dick"
            ]
          }
        ]
      });
});