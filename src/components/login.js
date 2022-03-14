import React, { Component } from "react";

class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    login = event => {
        console.log(this.state.credentials);
    }

    render(){
        return <div className="login">
            <h1>LOGIN</h1>
            <div>
            <span>Username</span><br/>
            <input type="text" name="username" value={this.state.credentials.username} 
                onChange={this.inputChanged}/><br/>
            <span>Password</span><br/>
            <input type="password" name="password" value={this.state.credentials.password}  
                onChange={this.inputChanged}/><br/>   
            <button onClick={this.login}>Login</button> 
            </div>    
        </div>
    }
}

export default Login;