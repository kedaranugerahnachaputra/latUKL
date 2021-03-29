import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import HomeAdmin from "./pages/admin/HomeAdmin"
import CRUDSiswa from "./pages/admin/CRUDSiswa"
import CRUDPetugas from "./pages/admin/CRUDPetugas"
import CRUDKelas from "./pages/admin/CRUDKelas"
import CRUDSpp from "./pages/admin/CRUDSpp"
import Pembayaran from "./pages/admin/Pembayaran"
import Histori from "./pages/admin/Histori"
import HomePetugas from "./pages/petugas/HomePetugas"
import PembayaranPet from "./pages/petugas/Pembayaran"
import HistoriPet from "./pages/petugas/Histori"
import HomeSiswa from "./pages/siswa/HomeSiswa"
import HistoriSis from "./pages/siswa/Histori"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={HomeAdmin} />
        <Route exact path="/home/admin/siswa" component={CRUDSiswa} />
        <Route exact path="/home/admin/petugas" component={CRUDPetugas} />
        <Route exact path="/home/admin/kelas" component={CRUDKelas} />
        <Route exact path="/home/admin/spp" component={CRUDSpp} />
        <Route exact path="/home/admin/pembayaran" component={Pembayaran} />
        <Route exact path="/home/admin/histori" component={Histori} />
        <Route exact path="/home/petugas" component={HomePetugas} />
        <Route exact path="/home/petugas/pembayaran" component={PembayaranPet} />
        <Route exact path="/home/petugas/histori" component={HistoriPet} />
        <Route exact path="/home/siswa" component={HomeSiswa} />
        <Route exact path="/home/siswa/histori" component={HistoriSis} />
      </Switch>
    )
  }
}
