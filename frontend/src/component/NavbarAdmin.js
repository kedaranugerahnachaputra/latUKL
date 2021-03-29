import React from "react"
import {Link} from "react-router-dom"
class NavbarAdmin extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand">
                    Moklet Pembayaran SPP
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/admin/siswa" className="nav-link">
                                Siswa
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/admin/petugas" className="nav-link">
                                Petugas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/admin/kelas" className="nav-link">
                                Kelas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/admin/spp" className="nav-link">
                                Spp
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/admin/pembayaran" className="nav-link">
                                Pembayaran
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/admin/histori" className="nav-link">
                                Histori
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default NavbarAdmin;