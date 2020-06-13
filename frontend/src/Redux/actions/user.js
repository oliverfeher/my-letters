import axios from "axios";
import jwt from "jsonwebtoken";

const setUser = (user) =>
{
  return {type: "SET_USER", payload: user}
}

export const login = (state) =>
{
    return (dispatch) =>
    {
        return axios.post("http://localhost:3001/api/login", state)
        .then(resp => 
        {
            if(!resp.data.token)
            {
                dispatch(setUser("error"))
            }
            else
            {
                localStorage.setItem("token", resp.data.token);
                dispatch(setUser(resp.data.user))
            }
        })
        
    }
}

export const updateUser = (type) =>
{
    let { user_id } = jwt.decode(localStorage.token);
    return (dispatch) =>
    {
        return axios.patch(`http://localhost:3001/api/users/${user_id}`, {type: type})
        .then(resp =>
            {
                dispatch({type: "UPDATE_USER", payload: resp.data})
            })
    }
}

export const checkToken = () =>
{
    return (dispatch) =>
    {
        axios.post("http://localhost:3001/api/users/authorize", {token: localStorage.token})
        .then(resp =>
            {
                dispatch(setUser(resp.data))
            })
    }
}
export const logout = () =>
{
    return (dispatch) =>
    {
        console.log("loggin out")
        localStorage.removeItem("token");
        dispatch({type: "LOGOUT"});
    } 
}