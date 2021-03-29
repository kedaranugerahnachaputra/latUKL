import React from "react"
import Navbar from "../../component/NavbarPetugas"
import axios from "axios"
import { base_url } from "../../config"

export default class HomePetugas extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            PetugasName: null,
            pembayaranCount: 0
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
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
        .then(response=> {
            this.setState({pembayaranCount: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getPetugas = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({ petugasName: petugas.nama_petugas })
    }
    componentDidMount(){
        this.getPembayaran()
        this.getPetugas()
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.petugasName}</strong>
                    </h3>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Banyak Pembayaran</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.pembayaranCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
