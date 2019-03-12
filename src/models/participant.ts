import {Table, Column, Model, HasMany, PrimaryKey, DataType, NotNull, AutoIncrement} from 'sequelize-typescript';
import Vote from "./vote";

@Table({
    timestamps: false,
    tableName: "participant"
})
class Participant extends Model<Participant> {
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

    @HasMany(() => Vote)
    votes: Vote[]
}

export default Participant;