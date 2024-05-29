import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn, Unique, PrimaryColumn
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {WarehouseEntity} from '../cartography/warehouse.entity';
import {Abcclass} from '../../../helpers/abcclass';
import {OrganisationEntity} from "../cartography/organisation.entity";
import {ItemsreleasedEntity} from "./itemsreleased.entity";

@Entity('itemclass')
export class ItemclassEntity {
    @PrimaryColumn()
    refitem: string;

    @PrimaryColumn()
    reforganisation: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    refwarehouse: string;

    @Column({
        type: 'enum',
        enum: Abcclass,
        default: Abcclass.NONE,
    })
    class: Abcclass;

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

    @ManyToOne(() => ItemsreleasedEntity, (itemsreleased) => itemsreleased.refitem, {nullable: false})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    itemrealsed: ItemsreleasedEntity;

    @ManyToOne(() => WarehouseEntity, (warehouseentity) => warehouseentity.refwarehouse, {nullable: false})
    @JoinColumn([
        {name: 'refwarehouse', referencedColumnName: 'refwarehouse'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    warehouse: WarehouseEntity;
}
