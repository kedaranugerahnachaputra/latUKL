import React from "react"

export default class PembayaranList extends React.Component {
    render() {
        return (
            <div className="container">
                {/* list */}
                <div className="card col-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-info">Nama Siswa</small>
                            <h6>{this.props.nama}</h6>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-info">Tanggal Bayar</small>
                            <h6>{this.props.tgl_bayar}</h6>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-info">Total Bayar</small>
                            <h6>Rp. {this.props.total_bayar}</h6>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-info">Petugas</small>
                            <h6>{this.props.nama_petugas}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}