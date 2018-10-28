import React, { Component } from 'react'
import InsertBrand from './InsertUnit';
import EditBrand from './EditUnit';
import BrandTable from './UnitTable';
import { GetData, PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class UnitInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      edit: [],
      edit_pannel: false,
      isLoading: true
    }

    this.insertData = this.insertData.bind(this);
  }

  _initialFetch() {
    GetData('/api/fetch_unit.php')
      .then((data) => {
        if(data.status === '200'){
          this.setState({
            units: data.data,
            isLoading: false
          })
        }
        
      });
  }

  componentDidMount() {
    this._initialFetch();
  }

  insertData(data) {
    PostData('/api/insert_unit.php', data)
      .then((resp) => {
        if (resp.status === '200') {
          notify.show(resp.data, 'success', 3000);
          this._initialFetch();
        } else {
          notify.show('Something Went Wrong!', 'error', 3000);
        }

      });
  }

  onDeleteConfirm(unit_id) {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: this.deleteData.bind(this, unit_id)
        },
        {
          label: 'No',
        }
      ]
    })
  }


  deleteData(unit_id) {
    const data = {
      unit_id: unit_id,
      type: 'delete'
    }

    PostData('/api/update_unit.php', data)
      .then((resp) => {
        if (resp.status === '200') {
          notify.show(resp.data, 'success', 3000);
          this._initialFetch();
        } else {
          notify.show('Something Went Wrong!', 'error', 3000);
        }
      })
  }

  onEditPress(unit_id) {
    let units = this.state.units;
    let results = units.filter((el) => el.unit_id === unit_id);
    this.setState({
      edit: results,
      edit_pannel: true
    })
  }

  updateData(data) {
    PostData('/api/update_unit.php', data)
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
        <h2>Units</h2>
        <hr />
        <div className="col-md-6">
          {!this.state.edit_pannel ? <InsertBrand setData={this.insertData} /> : <EditBrand setEditData={this.state.edit} updateData={this.updateData.bind(this)} />}

        </div>

        <div className="col-md-6" style={{ backgroundColor: '#f9f9f9' }}>
          <BrandTable units={this.state.units} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />
        </div>
      </div>
    )
  }
}

export default UnitInsert;