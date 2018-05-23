import axios from 'axios'

const initialState = {
    user: {},
    danceCourses: []
}


//Action Types
const GET_USER = 'GET_USER'
const GET_COURSES = 'GET_COURSES'

//MiddleWare
const _FULFILLED = '_FULFILLED'

export function getUser() {
    let userData = axios.get('/auth/me').then(res => {
        return res.data
    })
    return {
        type: GET_USER,
        payload: userData
    }
}

export function getCourses() {
    let danceCourses = axios.get('/danceclasses').then(res => {
        return res.data
    })
    return {
        type: GET_COURSES,
        payload: danceCourses
    }
}



export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_USER + _FULFILLED:
            return Object.assign({}, state, {user: action.payload})
        case GET_COURSES + _FULFILLED:
            return Object.assign({}, state, {danceCourses: action.payload})
        default:
            return state
    }
}