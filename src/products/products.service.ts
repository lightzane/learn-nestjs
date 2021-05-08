import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    
    private products: Product[] = [];

    addProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        
        this.products.push(newProduct);

        return { id: prodId }
    }

    getAllProducts() {
        return [ ...this.products ]
    }

    getProduct(id: string) {
        const product = this.findProduct(id)[0]
        return { ...product }
    }
    
    updateProduct(id: string, title: string, desc: string, price: number) {
        // const product = this.findProduct(id)[0]
        // const index = this.findProduct(id)[1]
        const [product, index] = this.findProduct(id) // supported by typescript and modern javascript
        const updatedProduct = {...product}

        if (title) updatedProduct.title = title
        if (desc) updatedProduct.description = desc
        if (price) updatedProduct.price = price

        this.products[index] = updatedProduct

        return updatedProduct
    }

    deleteProduct(id: string) {
        const index = this.findProduct(id)[1]
        this.products.splice(index, 1);
        return `Product ${id} has been deleted`
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id == id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('(This string can be modified) Could not find product.'); // returns 404
        }
        return [product, productIndex]
    }
}