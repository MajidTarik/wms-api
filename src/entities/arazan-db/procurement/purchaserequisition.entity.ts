import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {UserEntity} from '../users/user.entity';
import {CompanyEntity} from '../cartography/company.entity';
import {PurchaserequisitionStatutsEntity} from "./purchaserequisition-statuts.entity";
import {PurchaserequisitionLinesEntity} from "./purchaserequisition-lines.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {UserCompaniesEntity} from "../users/user-companies.entity";

@Entity('purchaserequisition')
export class PurchaserequisitionEntity {
    @PrimaryColumn()
    refpurchaserequisition: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    refpurchaserequisitionstatuts: string;

    @Column()
    preparator: string;

    @Column({nullable: true})
    requisitionobjectif: string;

    @CreateDateColumn({type: 'timestamptz'})
    requisitiondate: Date;

    @Column({nullable: true})
    details: string;

    @Column({nullable: true})
    submittedby: string;

    @Column({nullable: true})
    datesubmittion: Date;

    @Column({nullable: true})
    approvedby: string;

    @Column({nullable: true})
    dateapprovement: Date;

    @Column({nullable: true})
    closedby: string;

    @Column({nullable: true})
    dateclosing: Date;

    @Column({nullable: true})
    rejectedby: string;

    @Column({nullable: true})
    daterejection: Date;

    @Column({length: 256, nullable: true})
    description: string;

    @Column({default: true})
    actif: boolean;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    company: CompanyEntity;

    @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
    @JoinColumn([
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    organisation: OrganisationEntity;

    @ManyToOne(() => PurchaserequisitionStatutsEntity, (purchaserequisitionStatutsentity) => purchaserequisitionStatutsentity.purchasesrequisitions, {nullable: false})
    @JoinColumn([
        {name: 'refpurchaserequisitionstatuts', referencedColumnName: 'refpurchaserequisitionstatuts'},
    ])
    purchaserequisitionstatuts: PurchaserequisitionStatutsEntity;

    @ManyToOne(() => UserCompaniesEntity, (userentity) => userentity.matricule, {nullable: false})
    @JoinColumn([
        {name: 'preparator', referencedColumnName: 'matricule'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    preparatorpurchreq: UserCompaniesEntity;

    @ManyToOne(() => UserCompaniesEntity, (userentity) => userentity.matricule, {nullable: false})
    @JoinColumn([
        {name: 'submittedby', referencedColumnName: 'matricule'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    submitterpurchreq: UserCompaniesEntity;

    @ManyToOne(() => UserCompaniesEntity, (userentity) => userentity.matricule, {nullable: false})
    @JoinColumn([
        {name: 'approvedby', referencedColumnName: 'matricule'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    approvalpurchreq: UserCompaniesEntity;

    @ManyToOne(() => UserCompaniesEntity, (userentity) => userentity.matricule, {nullable: false})
    @JoinColumn([
        {name: 'closedby', referencedColumnName: 'matricule'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    closedpurchreq: UserCompaniesEntity;

    @ManyToOne(() => UserCompaniesEntity, (userentity) => userentity.matricule, {nullable: false})
    @JoinColumn([
        {name: 'rejectedby', referencedColumnName: 'matricule'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    rejecterpurchreq: UserCompaniesEntity;

    @OneToMany(() => PurchaserequisitionLinesEntity, (purchaserequisitionlinesEntity) => purchaserequisitionlinesEntity.purchaserequisition)
    @JoinColumn([
        {name: 'refpurchaserequisition', referencedColumnName: 'refpurchaserequisition'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    purchaserequisitionlines: PurchaserequisitionLinesEntity[];
}
