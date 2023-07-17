import { PartialType } from '@nestjs/mapped-types';
import { UserCredentailDto } from './user-credentai.dto';

export class UpdateUserCredentailDto extends PartialType(UserCredentailDto) {}
