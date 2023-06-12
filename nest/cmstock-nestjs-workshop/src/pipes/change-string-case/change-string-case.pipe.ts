import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as changeCase from 'change-case';
import { get } from 'lodash';

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {  // สร้าง class custom pipe นำไปใช้ใน UsePipes ก่อนเข้า controller service
  transform(value: any, metadata: ArgumentMetadata) { // value ที่ไหลเข้ามาใน pipe

    console.log('Data passed in Pipe', JSON.stringify(value));

    const name = get(value, 'name');

    if (name) {
      value.name = changeCase.capitalCase(name);
    }

    return value;
  }
}
