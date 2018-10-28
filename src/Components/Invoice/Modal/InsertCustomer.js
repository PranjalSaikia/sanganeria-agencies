import React, { Component } from 'react'
import InsertCustomer from '../../Master/Customers/InsertCustomer';
import { PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { Button, Modal } from 'react-bootstrap';

class InsertCutsomer extends Component {


    insertData(data) {
        PostData('/api/insert_customer.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this.props.showModal();
                    this.props.fetchCustomer();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }

            });
    }


    render() {
        return (
            <div>
                <Notifications />
                <Modal show={this.props.show} onHide={this.props.showModal}>
                    <div style={{padding: '10px', textAlign: 'right'}}><Button className="btn-sm" onClick={this.props.showModal}>x</Button></div>
                    <Modal.Body>
                        <InsertCustomer setData={this.insertData.bind(this)} />
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default InsertCutsomer;