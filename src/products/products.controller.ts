import { Body, Controller, Delete, Get, Header, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productSvc: ProductsService) {}

    @Post()
    addProduct(
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
      const generatedId = this.productSvc.insertProduct(
        prodTitle,
        prodDesc,
        prodPrice,
      );
      return { id: generatedId };
    }
  
    @Get()
    getAllProducts() {
      return this.productSvc.getProducts();
    }
  
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
      return this.productSvc.getSingleProduct(prodId);
    }
  
    @Patch(':id')
    updateProduct(
      @Param('id') prodId: string,
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
      this.productSvc.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
      return null;
    }
  
    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productSvc.deleteProduct(prodId);
        return null;
    }
}