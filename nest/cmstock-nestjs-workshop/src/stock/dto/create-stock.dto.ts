import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  stock: number;
}
