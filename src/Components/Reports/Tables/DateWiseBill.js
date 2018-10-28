import React, { Component } from 'react';

class DateWiseBill extends Component {
  render() {
    let results = this.props.results;
    let i = [];
    if (results.length > 0) {
      i = results.map((el, index) => {
        let payment = JSON.parse(el.payment);
        let str = "";
        if (payment.mop === '1') {
          str = "By Cash";
        } else if (payment.mop === '2') {
          str = "By Cheque, Cheque No. " + payment.cheque_no + " dated: " + payment.cheque_date;
        } else if (payment.mop === '3') {
          str = "By Debit/Credit Card";
        } else if (payment.mop === '4') {
          str = "Not paid";
        }
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{el.inv_no}</td>
            <td>{el.date_of_invoice}</td>
            <td>{el.customer_name}</td>
            <td>{el.customer_gstin}</td>
            <td>{el.customer_state}</td>
            <td>{el.customer_contact}</td>
            <td align="right">{parseFloat(el.bill_tot).toFixed(2)}</td>
            <td align="right">{parseFloat(el.tax).toFixed(2)}</td>
            <td align="right">{parseFloat(el.roff).toFixed(2)}</td>
            <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
            <td>{str}</td>
          </tr>
        )
      }
      )
    } else {
      i = <tr key="0"><td colSpan="11" align="center">No data available</td></tr>
    }
    return (
      <div className="print-container">
        <table className="table table-bordered" width="90%" id="table-to-xls">

          <thead>
            <tr className="alert-success">
              <th>#</th>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Customer Gstin</th>
              <th>Customer State</th>
              <th>Customer contact</th>
              <th style={{textAlign: 'right'}}>Bill Total</th>
              <th style={{ textAlign: 'right' }}>Tax</th>
              <th style={{textAlign: 'right'}}>Round Off</th>
              <th style={{textAlign: 'right'}}>Grand total</th>
              <th>Payment</th>
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

export default DateWiseBill;



