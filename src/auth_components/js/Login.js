import React, { Component } from 'react';
import '../css/Login.css';
import Notifications, {notify} from 'react-notify-toast';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                this.setState({
                    username: "",
                    password: "",
                    isLoading: false
                });
                this.props.history.replace('/');
            })
            .catch(err => {
                notify.show('Wrong Username or password', "error", 3000);
            });
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    render() {
        return ( 
            <section className="container_signin">
                <Notifications />
                <section className="login">
                    <div className="card-login">
                        <img src={require('./../../assets/logo.png')} alt="" className="logo-login"/>

                        
                        <hr/>
                        <form className="form">
                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Username"
                                    value={this.state.username}
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    name="username"
                                    required
                                     />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    name="password"
                                    required
                                />
                            </div>

                            <div className="form-group" align="right">
                                <button 
                                    className="btn btn-primary btn-sm"
                                    type="submit"
                                    onClick={this.handleSubmit}
                                    >{this.state.isLoading ? <i className="fa fa-spinner fa-spin"></i> : null} Login</button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        );
    }
}

export default Login;