import {Table, Column, Model, HasMany, PrimaryKey, DataType, NotNull, AutoIncrement} from 'sequelize-typescript';
import When from "./when";

@Table({
    timestamps: false,
    tableName: "event"
})
class Event extends Model<Event> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: "id"
    })
    id: number

    @NotNull
    @Column({
        type: DataType.STRING,
        field: "name"
    })
    name: string

    @HasMany(() => When)
    dates: When[]
}

export default Event;