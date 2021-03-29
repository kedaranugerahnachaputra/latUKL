import React from "react"
import Navbar from "../../component/NavbarAdmin"
import PembayaranList from "../../component/ListPembayaran"
import axios from "axios"
import $ from "jquery"
import { base_url } from "../../config"

export default class History extends React.Component {
    constructor() {
        super()
        this.state = {
            pembayaran: [],
            token: "",
            action: "",
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
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pembayaran: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        // this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount() {
        this.getPembayaran()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Data Pembayaran</h3>
                    <div className="row">
                        {this.state.pembayaran.map(item => (
                            <PembayaranList
                                nama={item.siswa.nama}
                                tgl_bayar={item.tgl_bayar}
                                total_bayar={item.jumlah_bayar}
                                nama_petugas={item.petugas.nama_petugas}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}