import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Name is too short.',
  })
  @MaxLength(300)
  @ValidateIf((value) => {
    console.log('validateIf', value);
    return true;
  })
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Price must have a maximum of two decimal places.',
    },
  )
  @IsPositive()
  @Min(1)
  @Max(9999)
  price: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Transform(({ value }) => +value)
  @IsPositive()
  stock: number;
}
