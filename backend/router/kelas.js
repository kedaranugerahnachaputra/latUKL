const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
const tes = require('../models/index')
const kelas = tes.kelas
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const auth = require("./auth")
app.use(auth)

app.get("/", (req, res) => {
    // ambil data
    kelas.findAll()
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

app.post('/', async (req, res) => {
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.create(data)
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
    let param = { id_kelas: req.body.id_kelas }
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.update(data, { where: param })
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

app.delete('/:id_kelas',async (req, res) => {
    let param = { id_kelas: req.params.id_kelas }
    kelas.destroy({ where: param })
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

module.exports = app