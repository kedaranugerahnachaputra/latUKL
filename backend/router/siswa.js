const { urlencoded } = require('express')
const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
app.use(express.json())
const SECRET_KEY = "dahla"
const md5 = require('md5')
const tes = require('../models/index')
const siswa = tes.siswa

// const verifyPetugas = require('./verifyPetugas')
app.use(express.urlencoded({ extended: true }))

app.get("/",async (req,res) => {
    let result = await siswa.findAll({
        include: [
            "spp"
        ]
    })
    res.json(result)
})
app.get("/:nama", async(req, res) =>{
    let param = {nama: req.params.nama}
    let result = await siswa.findAll({
        where: param,
        include: [
            "spp"
        ]
    })
    res.json(result)
})

app.post('/',async (req, res) => {
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
        username: req.body.username,
    } 
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    siswa.create(data)
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
    let param = { nisn: req.body.nisn }
    let data = {
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
        username: req.body.username,
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    siswa.update(data, { where: param })
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

app.delete('/:nisn',async (req, res) => {
    let param = { nisn: req.params.nisn }
    siswa.destroy({ where: param })
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

    let result = await siswa.findOne({ where: params })
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