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

        let j = "";
        if (this.props.type === 1) {
          j = "B2C/";
        } else if (this.props.type === 2) {
          j = "B2B/";
        }

        let k = "";
        let parti = el.particulars;
        if(parti !== false && Array.isArray(parti) && parti.length > 0){
          k = parti.map((el,index) => {
            return <li key={index}>{el.product_name} - {el.model} - {el.barcode}</li>
          })
        }

        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{j}{el.inv_no}</td>
            <td>{el.date_of_invoice}</td>
            <td>{el.customer_name}</td>
            <td>
              <ol>
                {k}
              </ol>
            </td>
            <td align="right">{parseFloat(el.bill_tot).toFixed(2)}</td>
            <td align="right">{parseFloat(el.tax).toFixed(2)}</td>
            <td align="right">{parseFloat(el.roff).toFixed(2)}</td>
            <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
            <td>{str}</td>
            <td>{el.narration}</td>
          </tr>
        )
      }
      )
    } else {
      i = <tr key="0"><td colSpan="13" align="center">No data available</td></tr>
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
              <th>Particulars</th>
              <th style={{ textAlign: 'right' }}>Bill Total</th>
              <th style={{ textAlign: 'right' }}>Tax</th>
              <th style={{ textAlign: 'right' }}>Round Off</th>
              <th style={{ textAlign: 'right' }}>Grand total</th>
              <th>Payment</th>
              <th>Remarks</th>
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



