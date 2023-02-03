
# Terncera entrega

### Registro y login

La parte de registro y de login, se encuentra en el archivo “router/router.user.js” y “Passport/strategy.js”, todo lo que se encuentra ahí es lo pedio para la entrega sin ser la parte del avatar que me dio problema con el fromulario, luego en el archivo “models/user.model.js” esta la parte de encriptar la contraseña, ***a la hora de crear un usuario, el primer usuario va a ser el admin.***

En el archivo “middleware/authenticated.js” están los middlewares que utilizo para ver si es admin o si esta logeado, la parte para saber si es admin es para la ruta “/producto” ya que el que permite agregar los productos a la página.

### Nodemailer y twilio
La parte de enviar un mail y los mensajes mediante twilio, se encuentra en el archivo “utility/services.js”.

### Cart
Las funcionalidades del carrito están en los archivos “controllers/cart.controllers.js” y “router/router.cart.js”.

### Extra

Por ultimo en el “index.js” de las líneas 93-151 están las configuraciones de las rutas, y en el archivo ".env" estan los valores para poder configurar el server.

