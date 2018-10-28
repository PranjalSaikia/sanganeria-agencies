import React, { Component } from 'react';

class DateWiseChallan extends Component {
    render() {
        return (
            <div className="print-container">
                <table className="table table-bordered" width="90%" id="table-to-xls">

                    <thead>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Challan No</th>
                            <th>Date</th>
                            <th>Truck No</th>
                            <th>Source</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default DateWiseChallan;



