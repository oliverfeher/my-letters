import React from "react";
import axios from "axios"
import jwt from "jsonwebtoken";

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    componentDidMount = () =>
    {
        // axios.post("http://localhost:3001/api/users/authorize",
        // {
        //     token: localStorage.token
        // })
        // .then(resp => console.log(resp))
    }

    render()
    {
        return (
            <div>Dashboard</div>
        )
    }
}

export default Dashboard;