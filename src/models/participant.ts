import {Table, Column, Model, HasMany, PrimaryKey, DataType, AutoIncrement, AllowNull} from 'sequelize-typescript';

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

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: "name"
    })
    name: string

    @HasMany(() => Vote)
    votes: Vote[]
}

export default Participant;