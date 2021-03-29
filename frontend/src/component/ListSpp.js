import React from "react"

export default class ListSpp extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-7">
                        <h5 className="text-bold">ID SPP: {this.props.id_spp}</h5>
                        <h6>Tahun: {this.props.tahun}</h6>
                        <h6>Nominal: {this.props.nominal}</h6>
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