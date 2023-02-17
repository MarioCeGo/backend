import request from "supertest";
import { expect } from "chai";
import { apiProduct } from "../api/index.js";

describe("Test con supertest", () => {

    it("Obtener", async (done) => {
        const res = await request(apiProduct).get("/getAll");
        expect(res.status).to.equal(200);
    })

    it("Guardar", async () => {
        const prod = {
            productName: 'Prueba',
            productDescription: 'test',
            productCode: 'prueba',
            productThumbnail: 'url',
            productPrice: 10,
            productStock: 12
        }
        const res = await request(apiProduct).post("/").send(prod);
        expect(res.status).to.equal(200);
    })

    it("Eliminar", async () => {
        const res = await request(apiProduct).get("delete").query({prodCode: "prueba"});
        expect(res.status).to.equal(200);
    }) 
})