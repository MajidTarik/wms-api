import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {CompanyEntity} from "./company.entity";

@Entity('organisation')
export class OrganisationEntity {
    @PrimaryColumn()
    reforganisation: string;

    @Column({nullable: false})
    organisation: string;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @OneToMany(() => CompanyEntity, (companyentity) => companyentity.organisation)
    @JoinColumn({name: 'reforganisation'})
    companies: CompanyEntity[];
}
