import { Request, Response } from "express";
import Database from "./../models/database";
import { EventCreate } from "./../models/event";
import { VoteCreate } from "./../models/vote";

const express = require("express");
export let router = express.Router();
let db = new Database();

router.get("/list", (req: Request, res: Response) => {
	db.listEvents().then((events) => {
		if(events.length > 0) {
			return res.json(events);
		}
		else {
			return res.status(404).send("No events");
		}
	});
});

router.post("/", (req: Request, res: Response) => {
	db.createEvent(new EventCreate(req.body.name, req.body.dates)).then((event) => {
		return res.json(event);
	});
});

router.get("/:id", (req: Request, res: Response) => {
	db.oneEvent(parseInt(req.params.id)).then((event) => {
		if(event != null) {
			return res.json(event);
		}
		else {
			return res.status(404).send("Unknown event");
		}	
	});
});

router.post("/:id/vote", (req: Request, res: Response) => {
	db.createVote(req.params.id, new VoteCreate(req.body.name, req.body.votes)).then((vote) => {
		db.oneEvent(req.params.id).then((event) => {
			if(event != null) {
				return res.json(event);
			}
			else {
				return res.status(404).send("Unknown event");
			}
		});
	});
});

router.get("/:id/results", (req: Request, res: Response) => {
	db.voteResults(req.params.id).then((results) => {
		if(results != null) {
			return res.json(results);
		}
		else {

			return res.status(404).send("Unknown event");
		}	
	});
});