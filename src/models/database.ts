import { Sequelize } from 'sequelize-typescript';
import { Event, EventCreate } from "./event";
import { Participant } from "./participant";
import { Vote } from "./vote";
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
}

export default Database;