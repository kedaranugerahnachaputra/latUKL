import React from "react"

export default class ListSiswa extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-7">
                        <h5 className="text-bold">NISN: {this.props.nisn}</h5>
                        <h6>NIS: {this.props.nis}</h6>
                        <h6>Nama: {this.props.nama}</h6>
                        <h6>ID Kelas: {this.props.id_kelas}</h6>
                        <h6>Alamat: {this.props.alamat}</h6>
                        <h6>No Telepon: {this.props.no_telp}</h6>
                        <h6>ID SPP: {this.props.id_spp}</h6>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-sm btn-primary btn-block"
                        onClick={this.props.onEdit}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger btn-block"
                        onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}