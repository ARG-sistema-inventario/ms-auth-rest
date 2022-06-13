import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./CategoryEntity";
import { GenericTable } from "./GenericTable";
import { UserEntity } from "./UserEntity";

@Entity()
export class AssetEntity extends GenericTable {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => UserEntity)
    @JoinColumn({ name: 'user_id' })
    public userId: number;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 255 })
    public description: string;

    @Column({ nullable: true, default: true })
    public stock: boolean;

    @Column({ default: 0, name: 'stock_amount' })
    public stockAmount: number;

    @Column({ nullable: false, default: 0 })
    public price: number;

    @ManyToOne((type) => CategoryEntity)
    @JoinColumn({ name: 'category_id' })
    public categoryId: number;

    @Column({ nullable: false, default: true })
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

    public isStock(): boolean {
        return this.stock;
    }

    public setStock(stock: boolean): void {
        this.stock = stock;
    }

    public getStockAmount(): number {
        return this.stockAmount;
    }

    public setStockAmount(stockAmount: number): void {
        this.stockAmount = stockAmount;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getCategoryId(): number {
        return this.categoryId;
    }

    public setCategoryId(categoryId: number): void {
        this.categoryId = categoryId;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public setEnable(enable: boolean): void {
        this.enable = enable;
    }

}