import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as changeCase from 'change-case';

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("Data passed in Pipe : " + JSON.stringify(value))
    value.name = changeCase.capitalCase(value.name)
    return value;
  }
}
