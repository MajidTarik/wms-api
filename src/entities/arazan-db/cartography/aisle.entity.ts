import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {CompanyEntity} from "./company.entity";
import {FurnituretypeEntity} from "./furnituretype.entity";
import {AreaEntity} from "./area.entity";
import {Typelocationposition} from "../../../helpers/typelocationposition";
import {Typeseprator} from "../../../helpers/typeseprator";
import {OrganisationEntity} from "./organisation.entity";

@Entity('aisle')
export class AisleEntity {
    @PrimaryColumn({length: 12})
    refaisle: string;

    @Column()
    refarea: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    aisle: string;

    @Column()
    reffurnituretype: string;

    @Column()
    xshelf: number;

    @Column({
        type: 'enum',
        enum: Typelocationposition,
        default: Typelocationposition.CHAR,
    })
    xtype: Typelocationposition;

    @Column()
    yfloor: number;

    @Column({
        type: 'enum',
        enum: Typelocationposition,
        default: Typelocationposition.CHAR,
    })
    ytype: Typelocationposition;

    @Column()
    zsection: number;

    @Column({
        type: 'enum',
        enum: Typelocationposition,
        default: Typelocationposition.CHAR,
    })
    ztype: Typelocationposition;

    @Column()
    prefix: string;

    @Column({
        type: 'enum',
        enum: Typeseprator,
        default: Typeseprator.DASH,
    })
    separator: Typeseprator;

    @Column()
    actif: boolean;

    @Column()
    heightseparator: number;

    @Column()
    widthseparator: number;

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

    @ManyToOne(() => FurnituretypeEntity, (furnituretypeentity) => furnituretypeentity.reffurnituretype, {nullable: false})
    @JoinColumn([{name: 'reffurnituretype', referencedColumnName: 'reffurnituretype'}])
    furnituretype: FurnituretypeEntity;

    @ManyToOne(() => AreaEntity, (areaentity) => areaentity.refarea, {nullable: false})
    @JoinColumn([
        {name: 'refarea', referencedColumnName: 'refarea'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    area: AreaEntity;
}
