import { faker } from "@faker-js/faker";
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const characters = [letters, numbers];

const generateRandomCode = () => {
    let code = "";
    for (let i = 0; i < 50; i++) {

        if (characters[randomNumber(characters.length-1)] == letters) {
            code += letters[randomNumber(letters.length -1)];
        }else{
            code += numbers[randomNumber(numbers.length -1)];
        }
    }
    return code
}

const randomNumber = (max) => {
    return Math.floor(Math.random() * (max - 0 + 1) + 0)
}

const generateRandomProduct = () => {
    const product = []
    for (let i = 0; i < 10; i++) {
        product.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.random.alphaNumeric(8),
            thumbnail: faker.image.imageUrl(),
            price: faker.commerce.price(),
            stock: faker.random.numeric(),
            date: faker.date.recent(),
        })
    }
    
    return product
}

export {generateRandomCode, generateRandomProduct}