import React from "react"
import Navbar from "../../component/NavbarAdmin"
import PetugasList from "../../component/ListPetugas"
import axios from "axios"
import $ from "jquery"
import { base_url } from "../../config"

export default class CRUDPetugas extends React.Component {
    constructor() {
        super()
        this.state = {
            petugas: [],
            token: "",
            action: "",
            id_petugas: "",
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
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
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ petugas: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount() {
        this.getPetugas()
    }
    Add = () => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillPassword: true
        })
    }

    Edit = selectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            username: selectedItem.username,
            password: "",
            nama_petugas: selectedItem.nama_petugas,
            level: selectedItem.level,
            fillPassword: false
        })
    }
    savePetugas = event => {
        event.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = {
            id_petugas: this.state.id_petugas,
            username: this.state.username,
            nama_petugas: this.state.nama_petugas,
            level: this.state.level,
        }
        if (this.state.fillPassword) {
            form.password = this.state.password
        }
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))
        }
    }
    dropPetugas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Data Petugas</h3>
                    <div className="row">
                        {this.state.petugas.map(item => (
                            <PetugasList
                                id_petugas={item.id_petugas}
                                nama_petugas={item.nama_petugas}
                                level={item.level}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropPetugas(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Petugas
                   </button>
                </div>

                <div className="modal fade" id="modal_petugas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Petugas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.savePetugas(ev)}>
                                    Nama Petugas
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.nama_petugas}
                                        onChange={ev => this.setState({ nama_petugas: ev.target.value })}
                                        required
                                    />
                                    Level
                                    <select name="level" className="form-control mb-1">
                                        <option value={this.state.level = "admin"} onChange={ev => this.setState({ level: ev.target.value })}>Admin</option>
                                        <option value={this.state.level = "petugas"} onChange={ev => this.setState({ level: ev.target.value })}>Petugas</option>
                                    </select>
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
