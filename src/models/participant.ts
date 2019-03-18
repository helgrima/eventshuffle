/*
Sequelize definiton of participant, who votes for desired dates. Participant has relation to
Vote table which holds all votes for different event's dates.
*/
import {Table, Column, Model, HasMany, PrimaryKey, DataType, AutoIncrement, AllowNull} from 'sequelize-typescript';
import { Vote } from "./vote";

@Table({
    timestamps: false,
    tableName: "participant"
})
class Participant extends Model<Participant> {
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

    @HasMany(() => Vote)
    votes: Vote[]
}

export { Participant };