import React from "react"
import Navbar from "../../component/NavbarAdmin"
import SiswaList from "../../component/ListSiswa"
import axios from "axios"
import $ from "jquery"
import { base_url } from "../../config"

export default class CRUDSiswa extends React.Component {
    constructor() {
        super()
        this.state = {
            siswa: [],
            token: "",
            action: "",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            username: "",
            password: "",
            fillPassword: true
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
        .then(response=> {
            this.setState({siswa: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount() {
        this.getSiswa()
    }
    Add = () => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "insert",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            username: "",
            password: "",
            fillPassword: true
        })
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            id_kelas: selectedItem.id_kelas,
            alamat: selectedItem.alamat,
            no_telp: selectedItem.no_telp,
            id_spp: selectedItem.id_spp,
            username: selectedItem.username,
            password: "",
            fillPassword: false
        })
    }
    saveSiswa = event => {
        event.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = {
            nisn: this.state.nisn,
            nis: this.state.nis,
            nama: this.state.nama,
            id_kelas: this.state.id_kelas,
            alamat: this.state.alamat,
            no_telp: this.state.no_telp,
            id_spp: this.state.id_spp,
            username: this.state.username
        }
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }
        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }
    dropSiswa = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Data Siswa</h3>
                    <div className="row">
                        {this.state.siswa.map(item => (
                            <SiswaList
                                nisn={item.nisn}
                                nis={item.nis}
                                nama={item.nama}
                                id_kelas={item.id_kelas}
                                alamat={item.alamat}
                                no_telp={item.no_telp}
                                id_spp={item.id_spp}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropSiswa(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Siswa
                   </button>
                </div>

                <div className="modal fade" id="modal_siswa">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Siswa</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSiswa(ev)}>
                                    NISN
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange={ev => this.setState({ nisn: ev.target.value })}
                                        required
                                    />
                                    NIS
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.nis}
                                        onChange={ev => this.setState({ nis: ev.target.value })}
                                        required
                                    />
                                    Nama
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })}
                                        required
                                    />
                                    ID Kelas
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.id_kelas}
                                        onChange={ev => this.setState({ id_kelas: ev.target.value })}
                                        required
                                    />
                                    Alamat
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange={ev => this.setState({ alamat: ev.target.value })}
                                        required
                                    />
                                    No Telepon
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.no_telp}
                                        onChange={ev => this.setState({ no_telp: ev.target.value })}
                                        required
                                    />
                                    ID SPP
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.id_spp}
                                        onChange={ev => this.setState({ id_spp: ev.target.value })}
                                        required
                                    />
                                    Username
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        required
                                    />
                                    {this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({ fillPassword: true })}>
                                            Change Password
                                        </button>
                                    ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                    value={this.state.password}
                                                    onChange={ev => this.setState({ password: ev.target.value })}
                                                    required
                                                />
                                            </div>
                                        )}
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}