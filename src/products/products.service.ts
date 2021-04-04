import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductOnly } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title: title,
      desc: desc,
      price: price,
    });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const result = await this.productModel.find();
    return result.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.desc,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<Product> {
    const updateProduct = await this.productModel.findByIdAndUpdate(productId, {
      title: title,
      desc: desc,
      price: price,
    });
    return updateProduct;
  }

  async deleteProduct(prodId: string) {
    // const index = await this.productModel.findByIdAndDelete(prodId);
    const index = await this.productModel.deleteOne({ _id: prodId }).exec();
    console.log(index);
    if (index.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
