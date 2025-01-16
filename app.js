require('dotenv').config()
//importamos express
const express = require('express');
const app= express();
//le decimos el puerto por el que tiene que trabajar
const port= process.env.PORT || 80;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


//procesa todas las peticiones por el metodo get y las pasa a la raiz
app.get('/',(req,res)=>{
    res.send('Bienvenide a mi aplicación');
})

//si nombre no valiera nada me pondria por defecto invitado
//http://localhost:8099/saludo/?nombre=pepe
app.get('/saludo',(req,res)=>{
    const nombre = req.query.nombre || 'invitado';
    //para que funcione http://localhost:8099/saludo/?nombre=pepe&apellidos=lopez
    const contrasena = req.query.contrasena || '1234';
    res.send('Hola, '+nombre+" "+contrasena);

})
app.post('/saludo',(req,res)=>{
    const nombre = req.body.nombre || 'invitado';
    //para que funcione http://localhost:8099/saludo/?nombre=pepe&apellidos=lopez
    const contrasena = req.body.contrasena || '1234';
    res.send('Hola, '+nombre+" "+contrasena);

})
app.get('/precios',(req,res)=>{
    res.send('precios, esta todo muy caro');
})
//esto funciona para cualquier ruta que busques que de errror
app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/404.html');
})
//esta funcion calculará el factorial del numero que le introduzcas
app.post('factorial',(req, res)=>{
    const numero = req.body.numero;
    if(numero=== undefined || isNaN(numero)){
        return res.status(400).send('Número no válido');
    }
    const factorial = (n)=> {
        if(n===0) return 1;
        return n* factorial(n-1);
    };
    const resultado= factorial(Number(numero));
    res.send(`El factorial de ${numero} es ${resultado}`);
})
//tiene el puerto que usa y una funcion call back
app.listen(port,
    ()=>console.log(`Servidor escuchando por el puerto ${port}`));
