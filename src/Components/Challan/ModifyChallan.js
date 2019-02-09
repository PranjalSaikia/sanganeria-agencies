import React, { Component } from 'react'
import { GetData, PostData } from './../../api/service';
import Notifications, { notify } from 'react-notify-toast';


class ModifyChallan extends Component {
    state = {
        challan_no: this.props.match.params.challan_no,
        challan_det: [],
        challan_status: 0
    }

    componentDidMount() {
        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        //challan status for 0 - cancel challan
        //challan status for 1 - Generate Invoice

        let {challan_no, challan_status} = this.state;

        if(challan_status === 0){
            const data = {
                challan_no,
                challan_status
            }
            PostData(`/api/update_challan_modify.php`, data)
            .then((resp) => {
                if(resp.status === '200'){
                    notify.show(resp.data,'success',2000);
                }
            }).then(() => {
                this.props.history.replace('/challan/1/table')
            })
        }else{
            
            const data_post = {
                challan_no: challan_no,
                type: 0
            }
            PostData(`/api/fetch_challan_single_new.php`, data_post)
            .then((resp) => {
                console.log(resp)
            })
        }
        

    }

    render() {
        return (
            <div>
                <h3>Challan Modification</h3>
                <br />

                <Notifications />

                <div className="jumbotron">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-md-3">
                                <label>Challan No</label>
                                <input
                                    className="form-control input-sm"
                                    type="text"
                                    placeholder="Challan No"
                                    readOnly
                                    value={this.state.challan_no}
                                />
                            </div>


                            <div className="col-md-3">
                                <label>Change Challan Status to</label>
                                <select
                                    className="form-control input-sm"
                                    type="text"
                                    name="challan_status"
                                    placeholder="Challan Status"
                                    value={this.state.challan_status}
                                    onChange={this.onChange}
                                >
                                    <option value={0}>Cancel Challan</option>
                                    <option value={1}>Generate Sales</option>
                                </select>
                            </div>


                            <div className="col-md-3" style={{ paddingTop: 25 }}>
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary"
                                >
                                    Submit &amp; Continue
                        </button>
                            </div>
                        </div>
                    </form>
                </div>






            </div>
        )
    }
}

export default ModifyChallan;