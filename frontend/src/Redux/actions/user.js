import axios from "axios";

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
            localStorage.setItem("token", resp.data.token);
            dispatch(setUser(resp.data.user))
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
        localStorage.removeItem("token");
        dispatch({type: "LOGOUT"});
    } 
}