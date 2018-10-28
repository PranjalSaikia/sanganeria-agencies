import React, { Component } from 'react';


class UnitTable extends Component {
    constructor(props) {
        super(props);

    }

    editData(unit_id) {
        this.props.onEditPress(unit_id);
    }

    deleteData(unit_id) {
        this.props.onDeleteConfirm(unit_id);
    }


    render() {
        let units = this.props.units;
        let i = [];
        if (units.length > 0) {
            units.map((el, index) =>
                i.push(<tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.unit_name}</td>
                    <td><a onClick={this.editData.bind(this, el.unit_id)}><i className="fa fa-pencil"></i></a></td>
                    <td><a onClick={this.deleteData.bind(this, el.unit_id)}><i className="fa fa-trash"></i></a></td>
                </tr>)
            )
        } else {
            i = <tr key="0" ><td colSpan="4" align="center">No data found</td></tr>;
        }
        return (
            <div style={{ padding: '10px' }}>
                <h3>Unit Table</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Unit Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {i}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default UnitTable;