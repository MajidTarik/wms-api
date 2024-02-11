import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { TaxeEntity } from "./taxe.entity";
import {
  DateRangeTaxeValidation,
  IsDateRangeTaxeValide
} from "../../../helpers/validators/is-date-range-taxe-valid.validator";
import {Validate} from "class-validator";

@Entity('taxeline')
export class TaxeLineEntity {
  @PrimaryColumn()
  reftaxe: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn({ type: 'date' })
  datedebut: string;

  @Column({ type: 'date', nullable: false })
  datefin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  percentage: number;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxevalues, {nullable: false})
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxe: TaxeEntity;
}
