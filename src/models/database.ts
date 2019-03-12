import {Sequelize} from 'sequelize-typescript';
import Event from "./event";
import Participant from "./participant";
import Vote from "./vote";
import When from "./when";

export const Database = new Sequelize({
    dialect: "sqlite",
    username: "root",
    password: "",
    database: "eventshuffle",
    storage: "eventshuffle.sqlite"
});

Database.addModels([Event, Participant, Vote, When]);
Database.sync();

export default Database;