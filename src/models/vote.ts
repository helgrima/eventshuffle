/*
Sequelize definition of Vote table, which couples together participant and desired date of event
*/
import {Table, Column, Model, ForeignKey, PrimaryKey, DataType, BelongsTo, AutoIncrement, AllowNull} from 'sequelize-typescript';
import { When } from "./when";
import { Participant } from "./participant";

@Table({
    timestamps: false,
    tableName: "vote"
})
class Vote extends Model<Vote> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id: number

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    @ForeignKey(() => When)
    whenId: number

    @BelongsTo(() => When)
    when: When

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    @ForeignKey(() => Participant)
    participantId: number

    @BelongsTo(() => Participant)
    participant: Participant

}

class VoteCreate {
    participant: string
    votes: Date[]

    constructor(participant: string, votes: Date[]) {
        this.participant = participant;
        this.votes = votes;
    }
}
export { Vote, VoteCreate };