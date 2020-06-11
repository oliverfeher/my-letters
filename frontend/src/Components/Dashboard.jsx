import React from "react";
import { connect } from "react-redux";
import { logout } from "../Redux/actions/user";
import { Link } from "react-router-dom";

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    // USER LOGOUT, USE LOGOUT ACTION
    logOut = () => {
        this.props.logout();
    }

    render()
    {
        if(this.props.user.id)
        {
            return (
                <div id="dashboard">
                    <h1>DASHBOARD</h1>
                    <div id="dashboard-main-container">
                        <div className="dashboard-sub-container">
                            <h2>SCORES</h2>
                            <div id="scores-mistakes">
                                <p>scores</p>
                                <p>mistakes</p>
                            </div>
                            <div id="scores">
                                <p>MATH</p>
                                <p>WORDS</p>
                                <p>LETTERS</p>
                            </div>
                        </div>
                        <div style={{width: "10%"}}></div>

                        <div className="dashboard-sub-container">
                            <h2>REQUESTS</h2>
                            <div></div>
                        </div>
                    </div>
                    <Link to="/categories" id="play" style={{width: "5%"}}>PLAY</Link>
                    <Link to={""} className="back-button" onClick={this.logOut} style={{width: "15%", marginTop: "1%"}}>LOG OUT</Link>
                </div>
            )
        }
        else
        {
            this.props.history.push("/login");
            return null;
        }

    }
}

export default connect(({user}) => {return {user}}, { logout })(Dashboard);

