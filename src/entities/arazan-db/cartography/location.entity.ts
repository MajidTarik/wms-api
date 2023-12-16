import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { CompanyEntity } from "./company.entity";
import { Abcclass } from "../../../helpers/abcclass";
import {AisleEntity} from "./aisle.entity";

@Entity('location')
export class LocationEntity {
  @PrimaryColumn({ length: 20 })
  reflocation: string;
  @PrimaryColumn()
  refcompany: string;

  @Column({default: true})
  actif: boolean;

  @Column()
  refaisle: string;

  @Column({default: 0})
  pickingpriority: number;

  @Column({default: false})
  locked: boolean;

  @Column({default: false})
  lockedforsale: boolean;

  @Column({default: false})
  oneitem: boolean;

  @Column({default: false})
  oneserial: boolean;

  @Column({default: false})
  onebatch: boolean;

  @Column({default: false})
  defaultforoneitem: boolean;

  @Column({default: false})
  pickinglocation: boolean;

  @Column({default: false})
  outofuse: boolean;

  @Column({
    type: 'enum',
    enum: Abcclass,
    default: Abcclass.NONE,
  })
  abcclass: Abcclass;

  @Column()
  shelf: number;

  @Column()
  floor: number;

  @Column()
  section: number;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => UserEntity)
  idoperateurcreation: UserEntity;

  @ManyToOne(() => UserEntity)
  idoperateurlastupdate: UserEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => AisleEntity, (Aisleentity) => Aisleentity.refaisle, { nullable: false })
  @JoinColumn([
    { name: 'refaisle', referencedColumnName: 'refaisle' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  aisle: AisleEntity;
}
