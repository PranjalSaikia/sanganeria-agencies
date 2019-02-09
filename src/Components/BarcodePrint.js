import React, { Component } from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';


class BarcodePrintOne extends Component {
    render() {
        let i = [];
        /* for (let j = 0; j < this.props.nos; j++) {
            i.push(<div>
                <div className="barcode-style col-md-6">
                    <Barcode value={this.props.bar} />
                </div>
                
            </div>);
            if(j%2 === 0){
                if(j !== 0){
                    i.push(<p className="page-breaks"></p>);
                }
            }
        } */

        for (let j = 0; j < this.props.nos; j++) {
            i.push(
                <td width="50%">
                    <Barcode value={this.props.bar} />
                </td>

            );
            if (j % 2 === 0) {
                if (j !== 0) {
                    i.push(<p className="page-breaks"></p>);
                }
            }
        }

        return (
            <tbody>
                {i}
            </tbody>
        )
    }
}


class Test extends Component  {
    
    render(){
        let i = [];
        let j = [];
        
        //count rows
        let row = 0;
        if(this.props.nos%2 === 0){
            row = this.props.nos/2;
        }else{
            row = (parseFloat(this.props.nos) + 1)/2;
        }

        //construct columns



        //get the rows
        for(var m=0;m<row-1;m++){
            j.push(<tr>
                <td width="50%" align="center"><Barcode value={this.props.bar} /></td>
                <td width="50%" align="center"><Barcode value={this.props.bar} /></td>
            </tr>)
        }

        if(this.props.nos%2 === 0){
            j.push(<tr>
                <td width="50%" align="center"><Barcode value={this.props.bar} /></td>
                <td width="50%" align="center"><Barcode value={this.props.bar} /></td>
            </tr>)
        }else{
            j.push(<tr>
                <td width="50%" align="center"><Barcode value={this.props.bar} /></td>
                <td width="50%" align="center">&nbsp;</td>
            </tr>)
        }


        return (
            <table width="100%" className="print-table-barcode">
                <tbody> 
                    {j}
                </tbody>
            </table>
        )
    }
    
}



class BarcodePrint extends Component {
    
    render() {
        return (
            <div className="container">
                <h1>Printing {this.props.no_barcode} barcodes.... <span className="pull-right"><a onClick={this.props.onCloseClick}><i className="fa fa-times"></i></a></span></h1>

                <hr />

                <div align="center">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                        content={() => this.componentRef}
                    />
                    <hr />
                    <div className="barcode-viewer">
                  
                        
                        {/* <BarcodePrintOne bar={this.props.bar} nos={this.props.no_barcode} ref={el => (this.componentRef = el)} /> */}
                        <Test bar={this.props.bar} nos={this.props.no_barcode} ref={el => (this.componentRef = el)} />
                        
                   
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default BarcodePrint;

