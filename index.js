const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const http = require('http');
const url = require ('url');
const Jimp = require('jimp');

// disponibilidad de ruta de un archivo CSS con sendFile
app.get("/styles", (req,res)=>{
    res.sendFile(__dirname + "/styles.css")
})

// disponibilidad de ruda de un archivo html
//en la head del html el link ref será al localhost:3000/styles
//<link rel="stylesheet" href="http://localhost:3000/styles">
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get("/modificarImg", (req, res) => {
    
    res.setHeader('Content-Type', 'image/png');
    
    const params = url.parse(req.url, true).query;
    const {imagen} = params;
    var PATH_IMAGE = imagen;
    console.log(PATH_IMAGE)
    //console.log(imagen)
    const id = uuidv4().slice(0,5);    
    //console.log(id)


    Jimp.read(PATH_IMAGE, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data
                .resize(350, Jimp.AUTO) // resize
                .quality(60) // set JPEG quality
                .grayscale()
                .writeAsync(`${id}.png`)
                .then(() => {
                    fs.readFile(`${id}.png`, (err, imagen) => {
                        res.send(imagen);
                    })
                })
        }
    });
});


app.listen(3000, ()=>{
    console.log(process.pid)
    console.log("El servidor se está iniciando en http://localhost:3000/")
})