import { TaxeLineEntity } from '../../entities/arazan-db/masterdata/taxe-line.entity';
import {Injectable} from "@nestjs/common";
@Injectable()
export class HelpersProvider {
    constructor() {
        console.log('constructor');
    }

    isEmptyObject(obj: object): boolean {
        if ([null].includes(obj)) {
            return true
        } else {
            return Object.keys(obj).length === 0;
        }
    }



}
