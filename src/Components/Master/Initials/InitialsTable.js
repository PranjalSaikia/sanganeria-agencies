import React, { Component } from 'react';


class InitialsTable extends Component {
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
                    <td>{el.bar}</td>
                    <td>{el.code}</td>
                    <td><a onClick={this.editData.bind(this, el.id)}><i className="fa fa-pencil"></i></a></td>
                    <td><a onClick={this.deleteData.bind(this, el.id)}><i className="fa fa-trash"></i></a></td>
                </tr>)
            )
        } else {
            i = <tr key="0" ><td colSpan="4" align="center">No data found</td></tr>;
        }
        return (
            <div style={{ padding: '10px' }}>
                <h3>Initials Table</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Initial</th>
                            <th>Current No</th>
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
export default InitialsTable;