import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Name is too shortใ',
  })
  @MaxLength(300)
  name: string;

  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Price must have a maximum of two decimal placesใ',
    },
  )
  @IsPositive()
  @Min(1)
  @Max(9999)
  price: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  stock: number;
}
