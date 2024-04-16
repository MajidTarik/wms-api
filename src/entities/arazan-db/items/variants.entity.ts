import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {ParametresHeaderEntity} from '../parametres/parametres-header.entity';
import {ItemsEntity} from "./items.entity";
import {PurchaserequisitionLinesEntity} from "../procurement/purchaserequisition-lines.entity";
import {TaxeEntity} from "../masterdata/taxe.entity";

@Entity('variants')
@Unique(['refcompany', 'refitem', 'idheadervariant'])
export class VariantsEntity {
    @PrimaryColumn()
    refvariant: string;

    @Column()
    refitem: string;

    @PrimaryColumn()
    refcompany: string;

    @Column({nullable: true})
    variantdescription: string;

    @Column({default: false})
    stopedpurch: boolean;

    @Column({default: false})
    stopedsales: boolean;

    @Column({default: false})
    stopedinvent: boolean;

    @Column({nullable: true})
    barcode: string;

    @Column({default: 0, nullable: true})
    safetystock: number;

    @Column({nullable: true})
    searchname: string;

    @Column({nullable: false})
    idheadervariant: number;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
    @JoinColumn({name: 'refcompany'})
    company: CompanyEntity;

    @ManyToOne(() => ItemsEntity, (itemsentity) => itemsentity.refitem, {nullable: false})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
    ])
    item: ItemsEntity;

    @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, {nullable: false})
    @JoinColumn([{name: 'idheadervariant', referencedColumnName: 'idheaderparametre'}])
    headervariant: ParametresHeaderEntity;

    @OneToMany(() => PurchaserequisitionLinesEntity, (purchaserequisitionlinesEntity) => purchaserequisitionlinesEntity.variant, {nullable: true})
    @JoinColumn([
        {name: 'refvariant', referencedColumnName: 'refvariant'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
    ])
    purchaserequisitionlines: PurchaserequisitionLinesEntity[];
}
