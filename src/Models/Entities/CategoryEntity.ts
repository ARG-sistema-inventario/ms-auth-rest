import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericTable } from "./GenericTable";
import { UserEntity } from "./UserEntity";

@Entity()
export class CategoryEntity extends GenericTable {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => UserEntity)
    @JoinColumn({ name: 'user_id' })
    public userId: number;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 100 })
    public description: string;

    @Column({ default: true })
    public enable: boolean;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public setEnable(enable: boolean): void {
        this.enable = enable;
    }

}