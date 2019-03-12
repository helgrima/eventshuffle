import {Table, Column, Model, ForeignKey, PrimaryKey, DataType, BelongsTo} from 'sequelize-typescript';
import When from "./when";
import Participant from "./participant";

@Table({
    timestamps: false,
    tableName: "vote"
})
class Vote extends Model<Vote> {
    @PrimaryKey
    @Column({
        type: DataType.BIGINT
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

export default Vote;