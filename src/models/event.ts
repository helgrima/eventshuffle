import {Table, Column, Model, HasMany, PrimaryKey, DataType, AutoIncrement, AllowNull} from 'sequelize-typescript';
import { When } from "./when";

@Table({
    timestamps: false,
    tableName: "event"
})
class Event extends Model<Event> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: "id"
    })
    id: number

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: "name"
    })
    name: string

    @HasMany(() => When)
    dates: When[]
}

class EventCreate {
    name: string
    dates: Date[]

    constructor(name: string, dates: Date[]) {
        this.name = name;
        this.dates = dates;
    }
}

export { Event, EventCreate };