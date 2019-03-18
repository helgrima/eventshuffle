import { Sequelize } from 'sequelize-typescript';
import { Event, EventCreate } from "./event";
import { Participant } from "./participant";
import { Vote, VoteCreate } from "./vote";
import { When } from "./when";

class Database {
    context: Sequelize;
    constructor() {
        this.context = new Sequelize({
            dialect: "sqlite",
            username: "root",
            password: "",
            database: "eventshuffle",
            storage: "eventshuffle.sqlite"
        });
        this.context.addModels([Event, Participant, Vote, When]);
        //this.context.sync();
    }

    async listEvents() : Promise<Event[]>  {
        const events = await Event.findAll();
        return events;
    }

    async createEvent(eventCreate : EventCreate) : Promise<Event> {
        let newEvent = new Event({
            name: eventCreate.name
        });
        const e = await newEvent.save().then((event) => {
            for(let d in eventCreate.dates) {
                let newWhen = new When({
                    date: new Date(eventCreate.dates[d]),
                    eventId: event.id
                });
                newWhen.save();
            }
            return event;
        }).catch((error) => {
            return error;
        });
        
        return e;
    }

    async createVote(eventId: number, voteCreate : VoteCreate) : Promise<Event> {
        const e = await Event.findById(eventId).then((event) => {
            if(event != null) {
                Participant.findOrCreate({
                    defaults: {
                        name: voteCreate.participant
                    },
                    where: {
                        name: voteCreate.participant
                    }
                }).then((participant) => {
                    Sequelize.Promise.each(voteCreate.votes, (vote) => {
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
                            }
                            ).then((vote) => {
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
            //unknown event    
        }).catch((error) => {
            return error;
        });
        return await e;
    }

    async oneEvent(id: number) : Promise<any> {
        const e = Event.findById(id, {
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
                    votes: e.dates.map((d) => {
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
        return await e;
        
    }
}

export default Database;