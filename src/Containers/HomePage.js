import React, { Component } from 'react';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import './css/homepage.css';
import TopFeatured from '../Components/Homepage/TopFeatured';
import UnitBills from '../Components/Homepage/UnitBills';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title="Home"/>
        <div className="main-body">

          <br/>
            <TopFeatured />
 
       
          

         
        
        </div>
      </div>
    )
  }
}

export default withAuth(HomePage);