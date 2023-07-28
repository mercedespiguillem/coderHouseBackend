


class ProductManager {

    constructor() {
        this.products = [];
    }

    //metodo addProduct - agrega un producto al array

    addProduct(product) {
        if (!this.products.filter(product.code)) {
            this.products.push(product)
        }
    }
    
    // metodo getProducts 
    getProducts () {
        return this.products;
    }

    // metodo getProductbyId
    getProductById (id) {
        const product = this.products.filter(product => product.code == id)
        if (product != '') {
            return product;
        } else {
            throw new Error("Not found")
        }     
            
        }
    }

const prod1 =  new Product("buzo", "Buzo de algodon", "2000", "thumbnail.jpg", "50");

console.log(prod1)



