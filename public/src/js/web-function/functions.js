import { generateRandomCode } from "../utility/generators.js";

const btnGenerateCode = document.getElementById("btnGenerateCode");
const productCode = document.getElementById("productCode");

btnGenerateCode.onclick = (e) => {
    e.preventDefault();
    productCode.value = generateRandomCode();
    // productCode.disabled = true;
}