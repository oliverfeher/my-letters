import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleOnChangeEmail = event =>
    {
        event.persist();
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePassword = event =>
    {
        event.persist();
        this.setState({
            password: event.target.value
        })
    }

    handleOnSubmit = event =>
    {
        event.preventDefault();
        axios.post("http://localhost:3001/api/login",
        {
            user: this.state
        })
        .then(resp => console.log(resp))
    }

    render()
    {
        return (
            <div id="login-signup">
                <h1>LOGIN</h1>
                <form id="login-signup" onSubmit={this.handleOnSubmit}>
                    <label>E-MAIL:</label>
                    <input type="email" onChange={this.handleOnChangeEmail}/>
                    <label>PASSWORD:</label>
                    <input type="password" onChange={this.handleOnChangePassword}/>
                    <input type="submit" value="LOGIN"/>
                    <Link to={"/signup"}>SIGNUP</Link>
                </form>
            </div>
        )
    }

}

export default Login;