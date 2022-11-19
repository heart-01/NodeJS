import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as changeCase from 'change-case';

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  // สร้าง class custom pipe นำไปใช้ใน UsePipes ก่อนเข้า controller service
  transform(value: any, metadata: ArgumentMetadata) {
    // value ที่ไหลเข้ามาใน pipe
    console.log('Data passed in Pipe', JSON.stringify(value));

    value.name = changeCase.sentenceCase(value.name);

    return value;
  }
}
