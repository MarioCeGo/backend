import axios from "axios";
import { strictEqual, deepStrictEqual } from "assert"
axios.defaults.baseURL = "http://localhost:8080";

describe("Recibir todos los productos", () => {

    it("Deberia mostrar los productos", async () => {
        const res = await axios.get("/api/products/getAll");
        strictEqual(res.data, "OK");
    })

    it("Deberia guardar un producto", async () => {
        setTimeout(async () => {
            const res = await axios.post("/api/products", {
                productName: 'Prueba',
                productDescription: 'test',
                productCode: 'prueba',
                productThumbnail: 'url',
                productPrice: 10,
                productStock: 12
            })
            strictEqual(res.data, "OK")
        }, 5000);
    })
    it("Debeeria eleminar un producto", async () => {
        setTimeout(async () => {
            const res = await axios.get("/api/products/delete?prodCode=prueba");
            strictEqual(res.data, "OK");
        }, 5000);
    })
})