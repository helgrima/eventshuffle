/*
End points are implemented here. They mostly take request and
relay it to data access layer. Validation is missing. 
*/
import { Request, Response } from "express";
import Database from "./../models/database";
import { EventCreate } from "./../models/event";
import { VoteCreate } from "./../models/vote";

const express = require("express");
export let router = express.Router();
let db = new Database();

//For listing all events, no parameters needed
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

//Creating new event, name of event and possible dates of event are provided in body 
router.post("/", (req: Request, res: Response) => {
	db.createEvent(new EventCreate(req.body.name, req.body.dates)).then((event) => {
		return res.json(event);
	});
});

//Get information about event, id of event is provided as parameter
router.get("/:id", (req: Request, res: Response) => {
	db.oneEvent(req.params.id).then((event) => {
		if(event != null) {
			return res.json(event);
		}
		else {
			return res.status(404).send("Unknown event");
		}	
	});
});

//For voting dates of event, id of event is provided as parameter and participant and votes are provided in body
//Response is same as in GET "/api/v1/event/:id"
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

//Results of voting, id of event is provided as parameter
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