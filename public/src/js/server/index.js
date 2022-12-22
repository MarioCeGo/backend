const socket = io();

const prueba = document.getElementById("prueba")

// socket.on('prods', data => {
//     console.log(data)
//     data.forEach(elem => {
//         const div = document.createElement("div");
//         div.className= "box-product";
//         div.innerHTML = `
//         <img src="${elem.thumbnail}" alt="imagen del producto">
//         <div class="info">
//             <h3 class="title">${elem.name}</h3>
//             <p>$${elem.price}</p>
//             <div class="buttons">
//                 <button class="btn-secundary">Ver más</button>
//                 <button class="btn-buy">Comprar</button>
//             </div>
//         </div>`
//         prueba.appendChild(div)
//     });

// })