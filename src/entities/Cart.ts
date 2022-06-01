import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
