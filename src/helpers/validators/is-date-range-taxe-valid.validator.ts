import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint,
} from 'class-validator';

import { TaxeLineEntity } from '../../entities/arazan-db/masterdata/taxe-line.entity';
import {Injectable} from "@nestjs/common";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDateRangeTaxeValide implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        console.log('================>>>>>>> I am the validator !!')
        return false;
    }
}

export function DateRangeTaxeValidation(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if(args.object['datedebut'] > args.object['datefin']) {
                        return false;
                    } else {
                        return true;
                    }
                },
            },
        });
    };
}
