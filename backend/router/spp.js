const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
const tes = require('../models/index')
const spp = tes.spp
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const auth = require("./auth")
app.use(auth)

app.get("/", (req, res) => {
    // ambil data
    spp.findAll()
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
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.create(data)
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
    let param = { id_spp: req.body.id_spp }
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.update(data, { where: param })
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

app.delete('/:id_spp',async (req, res) => {
    let param = { id_spp: req.params.id_spp }
    spp.destroy({ where: param })
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