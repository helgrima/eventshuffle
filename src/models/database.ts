import { Sequelize } from 'sequelize-typescript';
import { Event, EventCreate } from "./event";
import { Participant } from "./participant";
import { Vote, VoteCreate } from "./vote";
import { When } from "./when";
import Config from "config";

class Database {
    context: Sequelize;
    constructor() { 
        this.context = new Sequelize({
            dialect: "sqlite",
            username: "root",
            password: "",
            database: Config.get("Database.Name"),
            storage: Config.get("Database.File"),
        });
        this.context.addModels([Event, Participant, Vote, When]);
        if(Config.get("Database.Sync")) {
            this.context.sync();
        }
        
    }

    async listEvents() : Promise<Event[]>  {
        const events = await Event.findAll();
        return events;
    }

    async createEvent(eventCreate : EventCreate) : Promise<Event> {
        const e : Promise<Event> = await Event.findOrCreate({
            defaults: {
                name: eventCreate.name
            },
            where: {
                name: eventCreate.name
            }
        }).then(async (event: [Event, boolean]) => {
            await Sequelize.Promise.each(eventCreate.dates, (date) => {
                return When.findOrCreate({
                    defaults: {
                        date: date,
                        eventId: event[0].id
                    },
                    where: {
                        date: date,
                        eventId: event[0].id
                    }
                }).then((when: [When, boolean]) => {
                     return when;
                });
            });
            return event[0];
        }).catch((error) => {
            return error;
        });
        return e;
    }

    async createVote(eventId: number, voteCreate : VoteCreate) : Promise<Event> {
        const e = await Event.findById(eventId).then((event) => {
            if(event != null) {
                return Participant.findOrCreate({
                    defaults: {
                        name: voteCreate.participant
                    },
                    where: {
                        name: voteCreate.participant
                    }
                }).then(async (participant) => {
                    await Sequelize.Promise.each(voteCreate.votes, (vote) => {
                        //when using typescript here, values are left null
                        return When.findOrCreate({
                            defaults: {
                                date: new Date(vote),
                                eventId: event.id,                     
                            },
                            where: {
                                date: vote,
                                eventId: event.id, 
                            }
                        }).then((when: [When, boolean]) => {    
                            //when using typescript here, values are left null                 
                            return Vote.findOrCreate({
                                defaults: {
                                    participantId: participant[0].id,
                                    whenId: when[0].id
                                },
                                where: {
                                    participantId: participant[0].id,
                                    whenId: when[0].id
                                }
                            }).then((vote) => {
                                return vote;
                            }).catch((error) => {
                                //guru meditation
                                return error;
                            });
                        }).catch((error) => {
                            //guru meditation
                            return error;
                        });
                    });
                }).catch((error) => {
                    return error;
                });        
            }
        }).catch((error) => {
            return error;
        });
        return e;
    }

    async oneEvent(id: number) : Promise<any> {
        const e = await Event.findById(id, {
            attributes: ["id", "name"],
            include: [
                {
                    model: When,  
                    attributes: ["date"],
                    duplicating: false,
                    required: true,
                    include : [
                        {
                            model: Vote,
                            duplicating: false,
                            include: [
                                {
                                    model: Participant,
                                    required: true,
                                    duplicating: false,
                                    attributes: ["name"],
                                }
                            ],

                        }
                    ]                        
                }              
            ]
        }).then((e) => {
            if(e != null) {
                let event =  {
                    id: e.id,
                    name: e.name,
                    dates: e.dates.map((d) => {
                        return d.date;
                    }),
                    votes: e.dates.filter(d => d.votes.length > 0).map((d) => {
                        return {
                            date: d.date,
                            people: d.votes.map((v) => {
                                return v.participant.name;
                            })
                        }
                    })
                }
                return event;
            }
            else {
                return null;
            }
            
        });
        return e;      
    }

    async voteResults(id: number) : Promise<any> {
        const e = await Event.findById(id, {
            attributes: ["id", "name"],
            include: [
                {
                    model: When,  
                    attributes: ["date"],                                  
                    required: true,
                    include : [
                        {
                            model: Vote,
                            required: true,                     
                            include: [
                                {
                                    model: Participant,
                                    attributes: ["name"],
                                    required: true,
                                }
                            ]
                        }
                    ]                                    
                }              
            ],
        }).then((e) => {
            if(e != null) {
                return Participant.count({
                    col: "id",
                    distinct: true,
                    include: [
                        {
                            model: Vote,                                   
                            required: true,                     
                            include : [
                                {
                                    model: When,
                                    required: true,  
                                    where: {
                                        eventId: id
                                    }                   
                                }
                            ]                                    
                        }              
                    ] 
                }).then((count) => {
                    let results =  {
                        id: e.id,
                        name: e.name,
                        suitableDates: e.dates.filter(d => d.votes.length == count).map((d) => {
                            return {
                                date: d.date,
                                people: d.votes.map((v) => {
                                    return v.participant.name;
                                })
                            }
                        })
                    }
                    return results;
                });
            }
            else {
                return null;
            }
            
        });
        return e;
        
    }
}

export default Database;