import {Table, Column, Model, PrimaryKey, DataType, AutoIncrement, ForeignKey, HasMany, BelongsTo, AllowNull} from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: "when"
})
class When extends Model<When> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: "id"
    })
    id: number

    @AllowNull(false)
    @Column({
        type: DataType.DATEONLY,
        field: "date"
    })
    date: Date

    @ForeignKey(() => Event)
    eventId: number

    @BelongsTo(() => Event)
    event: Event
    
    @HasMany(() => Vote)
    votes: Vote[]
}

export default When;