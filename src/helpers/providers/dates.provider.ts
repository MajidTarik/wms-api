import { TaxeLineEntity } from '../../entities/arazan-db/masterdata/taxe-line.entity';
import {Injectable} from "@nestjs/common";
@Injectable()
export class DatesProvider {
    constructor() {

    }

    calculateDateDifferenceInDays(date1: Date, date2: Date): number {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
        const differenceInMilliseconds = date2.getTime() - date1.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / oneDayInMilliseconds);
        return differenceInDays;
    }



}
