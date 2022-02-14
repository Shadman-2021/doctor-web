import React, { Component } from "react";
import { withCookies } from 'react-cookie';

class Login extends Component {

    state = {
        credentials: {
            username: "",
            password: ""
        },
        isLoginView: true
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    login = event => {
        if (this.state.isLoginView) {

            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    this.props.cookies.set('dr-token', res.token);
                    window.location.href = "/doctors"
                })
                .catch( error => console.log(error))

        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    this.setState({isLoginView: true});
                })
                .catch( error => console.log(error))
        }
        
    }
    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView});
    }

    render(){
        return  <div className="login">
                    
                        <h1>
                            { this.state.isLoginView ? 'Login to Doctor-Rank' : 'Register an Account'}
                        </h1>

                        <span>Username</span><br/>
                        <input type="text" name="username" placeholder="Enter Your USER ID here!" 
                            value={this.state.credentials.username} onChange={this.inputChanged}/><br/>

                        <span>Password</span><br/>
                        <input type="password" name="password" placeholder="Enter Your Password here!"
                            value={this.state.credentials.password} onChange={this.inputChanged}/><br/> 

                         &nbsp;   
                        <button className="button" onClick={this.login}>
                            { this.state.isLoginView ? 'Login ' : 'Register'}
                        </button> 
                        <p onClick={this.toggleView}>
                            { this.state.isLoginView ? 'Create an Account' : 'Login'}  
                        </p>
                </div>        
        
        
    }
}

export default withCookies(Login);