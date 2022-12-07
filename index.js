const e = require('express')
const {response} = require('express')
const express = require('express')
const app = express()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en el servidor ${error}`))

const routeProducto = express.Router()
routeProducto.use(express.json())
routeProducto.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/producto', routeProducto)

let productos = []
let id = 1

routeProducto.get('/', (req, res) => {
    res.json(productos)
})

routeProducto.get('/:id', (req, res) => {
    let idProducto = parseInt(req.params.id)
    let productoID = productos.filter(function(producto) {
        return producto.id === idProducto
    })
    if(productoID.id == null ) {
        res.json({error: "Producto no encontrado"})
    } else {
        res.json(productoID)
    }
})

routeProducto.post('/guardar', (req, res) => {
    productos.push(req.body);
    productos.forEach((producto, i) => {
        if (producto.id == null) {
            producto.id = id++
        }
    })
    
    res.json(productos)
})

routeProducto.put('/actualizar/:id', (req, res) =>{
    let idProducto = parseInt(req.params.id)
    let nuevoProducto = req.body
    let indiceProducto = productos.findIndex(producto => producto.id == idProducto)
    productos.splice(indiceProducto, 1)
    productos.push(nuevoProducto)
    nuevoProducto.id = idProducto
    
    res.send(`El producto ${idProducto} ha sido actualizado a ${nuevoProducto.title}`)
})

routeProducto.delete('/eliminar/:id', (req, res) => {
    let idProducto = parseInt(req.params.id)
    let indiceProducto = productos.findIndex(producto => producto.id == idProducto)
    productos.splice(indiceProducto, 1)
        
    res.json(productos)
})



