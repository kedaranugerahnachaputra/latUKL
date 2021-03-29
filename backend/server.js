const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())

let spp = require("./router/spp")
let kelas = require("./router/kelas")
let petugas = require("./router/petugas")
let siswa = require("./router/siswa")
let pembayaran = require("./router/pembayaran")
let auth = require('./router/auth')
app.use("/spp",spp)
app.use("/kelas",kelas)
app.use("/petugas",petugas)
app.use("/siswa",siswa)
app.use("/pembayaran",pembayaran)
app.use('/auth', auth)

app.listen(8000,()=>{
    console.log("Dijalankan di port 8000");
})