import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";

@Entity("test_users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  FullName: string;

  @Column({ unique: true })
  Email: string;

  @Column({ nullable: true })
  DOB: string;

  @Column({ nullable: true })
  Country: string;

  @Column()
  Profile_Picture: string;

  @Column({ type: "date", default: new Date() })
  Date_Created: Date;

  @Column({ type: "date", default: new Date() })
  Date_Last_LoggedIn: string;
}
