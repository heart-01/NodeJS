import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short',
  })
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;
}
