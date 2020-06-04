
export const user = (state = {}, action) =>
{
    if(action.type === "SET_USER")
    {
        return action.payload
    }
    else if(action.type === "LOGOUT")
    {
        return {};
    }
    else
    {
        return state;
    }
}