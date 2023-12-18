import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericTable } from "./GenericTable";
import { Rol } from "./RolEntity";

@Entity()
export class UserEntity extends GenericTable {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 255 })
    public uuid: string;

    @Column({ nullable: true, length: 255 })
    public email: string;

    @Column({ nullable: false, name: 'email_to_verificate', length: 255 })
    public emailToVerificate: string;

    @Column({ type: 'datetime', nullable: true, name: 'verification_at' })
    public verificationAt: Date;

    @Column({ nullable: false, length: 255 })
    public password: string;

    @Column({ nullable: false, name: 'verification_code', length: 10 })
    public verificationCode: string;

    @Column({ nullable: true, name: 'verification_code_password', length: 4 })
    public verificationCodePassword: string;

    @Column({ default: false })
    public active: boolean;

    @Column({ nullable: true, type: 'text', name: 'refresh_token' })
    public refreshToken: string;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, name: 'last_name', length: 255 })
    public lastName: string;

    @ManyToOne(() => Rol, (rol) => rol.id)
    @JoinColumn({ name: 'rol_id' })
    public rol: Rol;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getEmailToVerificate(): string {
        return this.emailToVerificate;
    }

    public setEmailToVerificate(emailToVerificate: string): void {
        this.emailToVerificate = emailToVerificate;
    }

    public getVerificationAt(): Date {
        return this.verificationAt;
    }

    public setVerificationAt(verificationAt: Date): void {
        this.verificationAt = verificationAt;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getVerificationCode(): string {
        return this.verificationCode;
    }

    public setVerificationCode(verificationCode: string): void {
        this.verificationCode = verificationCode;
    }

    public getVerificationCodePassword(): string {
        return this.verificationCodePassword;
    }

    public setVerificationCodePassword(verificationCodePassword: string): void {
        this.verificationCodePassword = verificationCodePassword;
    }

    public isActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getRol(): Rol {
        return this.rol;
    }

    public setRol(rol: Rol): void {
        this.rol = rol;
    }

}