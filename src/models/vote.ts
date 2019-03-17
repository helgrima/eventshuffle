import {Table, Column, Model, ForeignKey, PrimaryKey, DataType, BelongsTo, AutoIncrement} from 'sequelize-typescript';
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

    @ForeignKey(() => When)
    whenId: number

    @BelongsTo(() => When)
    when: When

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