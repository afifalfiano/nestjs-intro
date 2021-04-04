import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productSvc: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productSvc.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const result = await this.productSvc.getProducts();
    return result;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productSvc.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const updateProdut = await this.productSvc.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: updateProdut.id };
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productSvc.deleteProduct(prodId);
  }
}
