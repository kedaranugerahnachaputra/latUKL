const { urlencoded } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const md5 = require('md5')
const jwt = require("jsonwebtoken")
const SECRET_KEY = "dahla"
const tes = require('../models/index')
const petugas = tes.petugas

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    // ambil data
    petugas.findAll()
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post('/',async (req, res) => {
    let data = {
        username: req.body.username,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    petugas.create(data)
        .then(result => {
            res.json({
                message: 'Data telah dimasukkan',
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message 
            })
        })
})

app.put('/',async (req, res) => {
    let param = { id_petugas: req.body.id_petugas }
    let data = {
        username: req.body.username,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    petugas.update(data, { where: param })
        .then(result => {
            res.json({
                message: 'Data telah diperbarui',
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete('/:id_petugas',async (req, res) => {
    let param = { id_petugas: req.params.id_petugas }
    petugas.destroy({ where: param })
        .then(result => {
            res.json({
                message: 'Data dihapus',
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/auth", async (req, res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({ where: params })
    if (result) {
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app