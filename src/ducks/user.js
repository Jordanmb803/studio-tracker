import axios from 'axios';

const initialState = {
    user: {},
    danceCourses: [],
    users: [],
    today: new Date(),
    activeTab: 0
}


//Action Types
const GET_USER = 'GET_USER'
const GET_COURSES = 'GET_COURSES'
const CHANGE_DATE = 'CHANGE_DATE'
const GET_USERS = 'GET_USERS'
const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB'

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

export function changeDate(usersSelectDate) {
    return {
        type: CHANGE_DATE,
        payload: usersSelectDate
    }
}

export function getUsers() {
    let users = axios.get('/getallusers').then(res => {
        return res.data
    })
    return {
        type: GET_USERS,
        payload: users
    }
}

export function changeActiveTab(tabNum){
    return {
        type: CHANGE_ACTIVE_TAB,
        payload: tabNum
    }
}

export default function reducer(state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case GET_USER + _FULFILLED:
            return Object.assign({}, state, { user: action.payload })
        case GET_COURSES + _FULFILLED:
            return Object.assign({}, state, { danceCourses: action.payload })
        case CHANGE_DATE:
            return Object.assign({}, state, { today: action.payload })
        case GET_USERS + _FULFILLED:
            return Object.assign({}, state, { users: action.payload })
        case CHANGE_ACTIVE_TAB:
            return Object.assign({}, state, {activeTab: action.payload})
        default:
            return state
    }
}