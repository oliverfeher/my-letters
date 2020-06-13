import React from "react";
import { Link } from "react-router-dom";
import { login } from "../Redux/actions/user";
import { connect } from "react-redux";

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    // CONTROLLED FORM EMAIL
    handleOnChangeEmail = event =>
    {
        event.persist();
        this.setState({
            email: event.target.value
        })
    }
    
    // CONTROLLED FORM PASSWORD
    handleOnChangePassword = event =>
    {
        event.persist();
        this.setState({
            password: event.target.value
        })
    }
    
    // CONTROLLED FORM SUBMIT + SET JWT INTO LOCAL STORAGE
    // TODO: ERROR MSG + VALIDATION
    handleOnSubmit = event =>
    {
        event.preventDefault();
        this.props.login({user: this.state})
        .then(this.props.history.push("/dashboard"));
    }

    // CONDITIONAL RENDERING: IF TOKEN PUSH TO DASHBOARD ELSE RENDER LOGIN FORM
    render()
    {
        if(this.props.user.id !== undefined)
        {
            this.props.history.push("/dashboard");
            return null;
        }
        else if(this.props.user === "error")
        {
            return (
                <div id="login-signup-container">
                    <h1>LOGIN</h1>
                    <form id="login-signup" onSubmit={this.handleOnSubmit}>
                        <label className="label-text">E-MAIL:</label>
                        <input type="email" onChange={this.handleOnChangeEmail} value={this.state.email} className="input-field"/>
                        <label className="label-text">PASSWORD:</label>
                        <input type="password" onChange={this.handleOnChangePassword} value={this.state.password} className="input-field"/>
                        <h2 style={{color: "red"}}>INVALID CREDITENTIALS</h2>
                        <input type="submit" value="LOGIN"/>
                        <Link to={"/signup"} className="sign-up-button">SIGNUP</Link>
                    </form>
                </div>
            )
        }
        else 
        {
            return (
                <div id="login-signup-container">
                    <h1>LOGIN</h1>
                    <form id="login-signup" onSubmit={this.handleOnSubmit}>
                        <label className="label-text">E-MAIL:</label>
                        <input type="email" onChange={this.handleOnChangeEmail} value={this.state.email} className="input-field"/>
                        <label className="label-text">PASSWORD:</label>
                        <input type="password" onChange={this.handleOnChangePassword} value={this.state.password} className="input-field"/>
                        <input type="submit" value="LOGIN"/>
                        <Link to={"/signup"} className="sign-up-button">SIGNUP</Link>
                    </form>
                </div>
            )
        }
    }

}

export default connect(({user}) => {return {user}}, {login})(Login);