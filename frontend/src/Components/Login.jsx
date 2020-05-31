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
        .then(resp => {
            localStorage.setItem("token", resp.data.token);
            this.props.history.push("/dashboard")
        })
    }

    render()
    {
        return (
            <div id="login-signup-container">
                <h1>LOGIN</h1>
                <form id="login-signup" onSubmit={this.handleOnSubmit}>
                    <label className="label-text">E-MAIL:</label>
                    <input type="email" onChange={this.handleOnChangeEmail} className="input-field"/>
                    <label className="label-text">PASSWORD:</label>
                    <input type="password" onChange={this.handleOnChangePassword} className="input-field"/>
                    <input type="submit" value="LOGIN"/>
                    <Link to={"/signup"} className="sign-up-button">SIGNUP</Link>
                </form>
            </div>
        )
    }

}

export default Login;