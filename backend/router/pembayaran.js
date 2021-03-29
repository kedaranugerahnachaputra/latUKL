const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
const tes = require('../models/index')
const pembayaran = tes.pembayaran
const siswa = tes.siswa
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
const auth = require("./auth")
app.use(auth)

app.get("/",async (req,res) => {
    let result = await pembayaran.findAll({
        include: [ 
            "petugas",
            "siswa",
            {
                model: siswa,
                as: "siswa",
                include: ["spp"]
            }
        ]
    })
    res.json(result)
})
app.post('/', async (req, res) => {
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.create(data)
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

app.put('/', async (req, res) => {
    let param = { id_pembayaran: req.body.id_pembayaran }
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.update(data, { where: param })
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

app.delete('/:id_pembayaran',async (req, res) => {
    let param = { id_pembayaran: req.params.id_pembayaran }
    pembayaran.destroy({ where: param })
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