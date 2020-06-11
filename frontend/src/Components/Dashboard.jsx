import React from "react";
import { connect } from "react-redux";

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    componentDidMount = () =>
    {
    }
    
    componentDidUpdate = () =>
    {
        console.log("update");
        console.log(this.props.user.id)
    }

    
    render()
    {
        return (
            <div>
                <h1>DASHBOARD</h1>
                <div id="dashboard-main-container">
                    <div className="dashboard-sub-container">
                        <h2>SCORES</h2>
                        <div>
                            <h3>MATH</h3>
                            <h3>WORDS</h3>
                            <h3>LETTERS</h3>
                        </div>
                    </div>

                    <div className="dashboard-sub-container">
                        <h2>REQUESTS</h2>
                        <div></div>
                    </div>
                </div>
            </div>
        )

    }
}

export default connect(({user}) => {return {user}})(Dashboard);