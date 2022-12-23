const cuenta = (cant) => {
    let result = 0;
    for (let i = 0; i < cant; i++) {
        result += Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    }
    return result
}

process.on('message', msg => {
    process.send(`El resultado es: ${cuenta(msg)}`);
    process.exit();
})
process.send('listo')