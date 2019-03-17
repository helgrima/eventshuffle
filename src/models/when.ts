import {Table, Column, Model, PrimaryKey, DataType, AutoIncrement, ForeignKey, HasMany, BelongsTo, AllowNull} from 'sequelize-typescript';
import { Event } from "./event";
import { Vote } from "./vote";

@Table({
    timestamps: false,
    tableName: "when"
})
class When extends Model<When> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: "id"
    })
    id: number

    @AllowNull(false)
    @Column({
        type: DataType.DATEONLY,
        field: "date"
    })
    date: Date

    @AllowNull(false)
    @Column({
        type: DataType.BIGINT,
        field: "eventId"
    })
    @ForeignKey(() => Event)
    eventId: number

    @BelongsTo(() => Event)
    event: Event
    
    @HasMany(() => Vote)
    votes: Vote[]
}

export { When };