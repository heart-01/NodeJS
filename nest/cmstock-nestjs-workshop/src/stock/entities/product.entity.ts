import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

// Entity เป็น Schema ของ table ใน database
@Entity({ name: 'product' }) // ชื่อ table product map กับ function ProductEntity ถ้าไม่ใส่ table จะชื่อ product_entity
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // auto generated id
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  stock: number;

  @Column({default: "noimg.png"})
  image: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
