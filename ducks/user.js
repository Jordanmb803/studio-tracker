import axios from 'axios'

const initialState = {
    user: {}
}


//Action Types
const GET_USER = 'GET_USER'

//MiddleWare
const _FULLFILLED = '_FULLFILLED'

export function getUser() {
    let userData = app.get('/auth/me').then(res => {
        return res.data
    })
    return {
        type: GET_USER,
        payload: userData
    }
}



export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_USER + _FULLFILLED:
            return Object.assign({}, state, {user: action.payload})
   
        default:
            return state
    }
}