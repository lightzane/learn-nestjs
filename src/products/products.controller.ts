import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

/**
 * Body
 * -- to get the body from POST/PATCH requests
 * 
 * Param
 * -- to get the value of parameters in the URL
 * 
 * Patch
 * -- to update some fields in an existing data
 * 
 * Put
 * -- to replace an existing data
 * 
 * Delete
 * -- to remove an existing data
 */

@Controller('products') // localhost:3000/products
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post() // POST localhost:3000/products
    addProduct(
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('price') price: number
    ) {
        const generatedId = this.productsService.addProduct(title, desc, price)
        return generatedId
    }

    @Get() // GET localhost:3000/products
    getAllProducts() {
        return this.productsService.getAllProducts()
    }

    @Get(':id') // GET localhost:3000/products/:id
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id)
    }

    @Patch(':id') // PATCH localhost:3000/products/:id
    updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('price') price: number
    ) {
        return this.productsService.updateProduct(id, title, desc, price)
    }

    @Delete(':id') // DELETE localhost:3000/products/:id
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }
}