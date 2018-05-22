import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../ducks/user';

class DailyView extends Component {
    constructor(){
        super()
        this.state={
            user: {}
        }
    }

    componentDidMount(){
        this.props.getUser()
    }

    render(){
        console.log(this.props.user)
        return(
            <div>
                <h1>Today's Schedule</h1>
            </div>

        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}


export default connect(mapStateToProps, { getUser })(DailyView);