import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type SafeUser = Omit<User, 'password'>;

@Entity('user')
export class User {
  // Universally Unique Identifier
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  // --- login info ---
  // User's username (used for login)
  @Column({ type: 'varchar', nullable: false, unique: true })
  public username!: string;

  // User's email (used for login)
  @Column({ type: 'varchar', nullable: false, unique: true })
  public email!: string;

  // User's password (hashed)
  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  public password!: string;
  // ---

  // --- generics information ---
  // User's faculty/school/university (UTBM...)
  @Column({ type: 'varchar', unique: false, default: null })
  public faculty: string | null;

  // User's department (INFO, GMC...)
  @Column({ type: 'varchar', unique: false, default: null })
  public department: string | null;

  // User's promotion (21, 22...)
  @Column({ type: 'int', unique: false, default: 0 })
  public promotion: number | null;

  // User's name
  @Column({ type: 'varchar', unique: false, default: null })
  public name: string | null;

  // User's forename
  @Column({ type: 'varchar', unique: false, default: null })
  public forename: string | null;

  // User's nickname
  @Column({ type: 'varchar', unique: false, default: null })
  public nickname: string | null;

  // User's birth date
  @Column({ type: 'timestamp', unique: false, default: null })
  public birthDate: Date | null;

  // User's address
  @Column({ type: 'varchar', unique: false, default: null })
  public address: string | null;

  // User's parents address
  @Column({ type: 'varchar', unique: false, default: null })
  public parentsAddress: string | null;

  // User's phone number
  @Column({ type: 'varchar', unique: false, default: null })
  public phone: string | null;

  // User's emergency phone number
  @Column({ type: 'varchar', unique: false, default: null })
  public emergencyPhone: string | null;

  // User's gender
  @Column({ type: 'varchar', unique: false, default: null })
  public gender: string | null;

  // User's pronouns
  @Column({ type: 'varchar', unique: false, default: null })
  public pronouns: string | null;
  // ---

  // --- moderation information ---
  // User's permissions : 4 = access, 2 = modify, 1 = delete (4 + 2 + 1 = 7 === admin)
  @Column({ default: 4 })
  public permissions: number;

  // User's last login date
  @Column({ type: 'timestamp', default: null })
  public lastLoginAt: Date | null;

  // User's account creation date
  @Column({ type: 'timestamp', default: null })
  public createdAt!: Date | null;

  // User's account verification : true = verified, false = not verified
  @Column({ default: false })
  public isVerified!: boolean;
  // ---
}
