import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import AuthService from './../auth_components/js/AuthService';
import './navbar.css';

class Navbar extends Component {
    constructor(Props) {
        super(Props);
        this.Auth = new AuthService();
        this.state = {
            username: ''
        }
    }
    
    onLogout(){
        this.Auth.logout();
        this.props.history.replace('/login');
    }

    componentDidMount(){
        let user = localStorage.getItem('user');
        let user1 = JSON.parse(user);
        this.setState({username : user1.user});
    }

  render() {

    const style = {
        "Top":{
            color: 'black'
        },
        "Side":{
            color: '#C0D52E'
        }
    }
    return (
      <div>
        <div className="top-one-nav">
        <header>
            <NavLink to="/"><i className="fa fa-home"></i></NavLink>
        </header>
        <header>
         {this.props.title}
        </header>

        <div className="nav-list-top">
            <ul className="nav-list-top-ul">
                <li><NavLink to="/backup" activeStyle={style.Top}>Backup</NavLink></li>
                <li><NavLink to="/changepassword" activeStyle={style.Top}>Change Password</NavLink></li>
                <li><a onClick={this.onLogout.bind(this)}>Logout</a></li>
            </ul>
        </div>
        </div>
        <div className="side-nav-one">
        <div className="sidenav-body">
            <ul className="sidenav-list">
                
                <li>
                    <NavLink exact to="/master/brand" activeStyle={style.Side}>
                        <figure><i className="fa fa-plus"></i></figure>
                        Masters
                </NavLink>
                </li>

                <li>
                    <NavLink to="/barcode" activeStyle={style.Side}>
                        <figure><i className="fa fa-barcode"></i></figure>
                        Barcode
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/stock/entry" activeStyle={style.Side}>
                        <figure><i className="fa fa-list"></i></figure>
                        Stock
                </NavLink>
                </li>

                        <li>
                            <NavLink to="/challan/sales" activeStyle={style.Side}>
                                <figure><i className="fa fa-cube"></i></figure>
                                Challan
                    </NavLink>
                        </li>
                
                
                <li>
                    <NavLink to="/invoice/sales" activeStyle={style.Side}>
                    <figure><i className="fa fa-file"></i></figure>
                            Invoice
                    </NavLink>
                </li>

 
                

                <li>
                    <NavLink to="/reports/billd" activeStyle={style.Side}>
                        <figure><i className="fa fa-bar-chart-o"></i></figure>
                        Reports
                </NavLink>
                </li>
                
                
                
                
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;