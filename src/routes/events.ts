import { Request, Response } from "express";
import Database from "./../models/database";
import { EventCreate } from "./../models/event";
import { VoteCreate } from "./../models/vote";

const express = require("express");
export let router = express.Router();

router.get("/list", (req: Request, res: Response) => {
	let db = new Database();
	db.listEvents().then((events) => {
		return res.json(events);
	});
});

router.post("/", (req: Request, res: Response) => {
	let db = new Database();
	db.createEvent(new EventCreate(req.body.name, req.body.dates)).then((event) => {
		return res.json(event);
	});
});

router.get("/:id", (req: Request, res: Response) => {
	let db = new Database();
	db.oneEvent(req.params.id).then((event) => {
		if(event != null) {
			return res.json(event);
		}
		else {

			return res.status(404).send("Unknown event");
		}
		
	})
});

router.post("/:id/vote", (req: Request, res: Response) => {
	let db = new Database();
	db.createVote(req.params.id, new VoteCreate(req.body.name, req.body.votes)).then((vote) => {
		res.json(vote);
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