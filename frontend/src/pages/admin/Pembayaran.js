import React from "react"
import Navbar from "../../component/NavbarAdmin"
import axios from "axios"
import $ from "jquery"
import { base_url } from "../../config"

export default class Pembayaran extends React.Component {
    constructor() {
        super()
        this.state = {
            siswa: [],
            adminName: null,
            token: "",
            action: "",
            id_pembayaran: 0,
            id_petugas: "",
            nama_petugas: "",
            nisn: "",
            nama: "",
            tgl_bayar: new Date().toISOString().split('T')[0],
            bulan_dibayar: "",
            tahun_dibayar: "",
            id_spp: "",
            jumlah_bayar: ""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ siswa: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({ adminName: admin.nama_petugas })
        this.setState({ id_petugas: admin.id_petugas })
    }
    componentDidMount() {
        this.getSiswa()
        this.getAdmin()
    }
    ada = event => {
        let url = base_url + "/siswa/" + event
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({
                    nisn: response.data[0].nisn,
                    id_spp: response.data[0].id_spp,
                    jumlah_bayar: response.data[0].spp.nominal,
                    tahun_dibayar: response.data[0].spp.tahun,
                });
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                    }
                } else {
                    console.log(error);
                }
            })
    }
    savePembayaran = event => {
        event.preventDefault()
        let form = {
            id_pembayaran: this.state.id_pembayaran,
            id_petugas: this.state.id_petugas,
            nisn: this.state.nisn,
            tgl_bayar: this.state.tgl_bayar,
            bulan_dibayar: this.state.bulan_dibayar,
            tahun_dibayar: this.state.tahun_dibayar,
            id_spp: this.state.id_spp,
            jumlah_bayar: this.state.jumlah_bayar
        }
        let url = base_url + "/pembayaran"
        axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Form Pembayaran</h3>
                    <div >
                        <form onSubmit={ev => this.savePembayaran(ev)}>
                            Nama Petugas
                                     <input type="text" className="form-control mb-1"
                                value={this.state.adminName}
                                onChange={ev => this.setState({ nama_petugas: ev.target.value })}
                                disabled
                            />
                            Nama Siswa
                            <select name="nama" className="form-control mb-1" onChange={ev => this.ada(ev.target.value)}>
                                {this.state.siswa.map(item => (
                                    <option value={item.nama}
                                    >
                                        {item.nama}
                                    </option>

                                ))}
                            </select>
                            Tanggal Dibayar
                                     <input type="text" className="form-control mb-1"
                                value={this.state.tgl_bayar}
                                onChange={ev => this.setState({ tgl_bayar: ev.target.value })}
                                disabled
                            />
                            Bulan Bayar
                            <select name="bulan" className="form-control mb-1">
                                <option value={this.state.bulan_dibayar = "Januari"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Januari</option>
                                <option value={this.state.bulan_dibayar = "Febriari"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Febriari</option>
                                <option value={this.state.bulan_dibayar = "Maret"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Maret</option>
                                <option value={this.state.bulan_dibayar = "April"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>April</option>
                                <option value={this.state.bulan_dibayar = "Mei"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Mei</option>
                                <option value={this.state.bulan_dibayar = "Juni"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Juni</option>
                                <option value={this.state.bulan_dibayar = "Juli"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Juli</option>
                                <option value={this.state.bulan_dibayar = "Agustus"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Agustus</option>
                                <option value={this.state.bulan_dibayar = "September"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>September</option>
                                <option value={this.state.bulan_dibayar = "Oktober"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Oktober</option>
                                <option value={this.state.bulan_dibayar = "November"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>November</option>
                                <option value={this.state.bulan_dibayar = "Desember"} onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}>Desember</option>
                            </select>
                            Tahun Bayar
                                    <input type="text" className="form-control mb-1"
                                value={this.state.tahun_dibayar}
                                disabled
                            />
                            ID SPP
                                     <input type="text" className="form-control mb-1"
                                value={this.state.id_spp}
                                disabled
                            />
                            Jumlah Bayar
                                     <input type="text" className="form-control mb-3"
                                value={this.state.jumlah_bayar}
                                disabled
                            />
                            <button type="submit" className="btn btn-block btn-success">
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
