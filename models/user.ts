import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
  } from 'typeorm';
  
  @Entity('users')
  @Unique(['email'])
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ unique: true, length: 255 })
    email: string;
  
    @Column({nullable: true })
    password: string | null;
  
    @Column({ default: false })
    isActive: boolean;
  
    @Column({ default: false })
    isPremiumUser: boolean;
  
    @Column({ type: 'timestamp', nullable: true })
    premiumValidity: Date | null;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  