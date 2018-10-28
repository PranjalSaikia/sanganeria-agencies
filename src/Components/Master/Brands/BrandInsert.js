import React, { Component } from 'react'
import InsertBrand from './InsertBrand';
import EditBrand from './EditBrand';
import BrandTable from './BrandTable';
import { GetData, PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class BrandInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      edit: [],
      edit_pannel: false,
      isLoading: true
    }

    this.insertData = this.insertData.bind(this);
  }

  _initialFetch() {
    GetData('/api/fetch_brand.php')
      .then((data) => {
        if(data.status === '200'){
          this.setState({
            brands: data.data,
            isLoading: false
          })
        }
        
      });
  }

  componentDidMount() {
    this._initialFetch();
  }

  insertData(data) {
    PostData('/api/insert_brand.php', data)
      .then((resp) => {
        if (resp.status === '200') {
          notify.show(resp.data, 'success', 3000);
          this._initialFetch();
        } else {
          notify.show('Something Went Wrong!', 'error', 3000);
        }

      });
  }

  onDeleteConfirm(brand_id) {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: this.deleteData.bind(this, brand_id)
        },
        {
          label: 'No',
        }
      ]
    })
  }


  deleteData(brand_id) {
    const data = {
      brand_id: brand_id,
      type: 'delete'
    }

    PostData('/api/update_brand.php', data)
      .then((resp) => {
        if (resp.status === '200') {
          notify.show(resp.data, 'success', 3000);
          this._initialFetch();
        } else {
          notify.show('Something Went Wrong!', 'error', 3000);
        }
      })
  }

  onEditPress(brand_id) {
    let brands = this.state.brands;
    let results = brands.filter((el) => el.brand_id === brand_id);
    this.setState({
      edit: results,
      edit_pannel: true
    })
  }

  updateData(data) {
    PostData('/api/update_brand.php', data)
      .then((resp) => {
        if (resp.status === '200') {
          notify.show(resp.data, 'success', 3000);
          this._initialFetch();
        } else {
          notify.show('Something Went Wrong!', 'error', 3000);
        }
        this.setState({
          edit_pannel: false
        })
      })
  }



  render() {
    return (
      <div>
        <Notifications />
        <h2>Brands</h2>
        <hr />
        <div className="col-md-6">
          {!this.state.edit_pannel ? <InsertBrand setData={this.insertData} /> : <EditBrand setEditData={this.state.edit} updateData={this.updateData.bind(this)} />}

        </div>

        <div className="col-md-6" style={{ backgroundColor: '#f9f9f9' }}>
          <BrandTable brands={this.state.brands} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />
        </div>
      </div>
    )
  }
}

export default BrandInsert;