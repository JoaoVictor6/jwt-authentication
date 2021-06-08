import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import bcrypt from 'bcryptjs'

@Entity('users')
class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword(){
    this.password = bcrypt.hashSync(this.password, 8)
  }
}

export default User