import React from 'react';
import './CourseList.css';
import { connect } from 'react-redux';

function CourseList(props){
    return(
        <div className='dailyView'>
            <h3>{props.match.params.course}</h3>

        </div>
    )
}

function mapStateToProps(state){
    return{
        danceCourses: state.danceCourses
    }
}

export default connect(mapStateToProps)(CourseList);