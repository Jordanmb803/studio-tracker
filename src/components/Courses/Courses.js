import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../ducks/user';
import { connect } from 'react-redux';
import './Courses.css';
import editIcon from './edit-icon.png';
import deleteIcon from './delete-icon.png';
import axios from 'axios';
import addIcon from './add-icon.png';
import minusIcon from './minus-icon.png';
import BigPlusIcon from './big-plus-icon.png';

class Courses extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.props.getCourses()
    }

    deleteCourse(class_id) {
        axios.delete(`/deletecourse/${class_id}`).then(res => {
            console.log('table delete')
            this.componentDidMount()
        })
        axios.delete(`/register/deleteclassregistrations/${class_id}`).then(res => {
            console.log('registrations deleted')
        })

    }

    render() {
        return (
            <div className='TrackHours'>
                <h1 className='thHeader'>Class List</h1>
                <Link id='createCourseBut' to='/createcourse'><img src={BigPlusIcon} alt='addCourse' id='ccButton' /></Link>
                {this.props.danceCourses.map((course, i) => {
                    return (
                        <div className='classTaughtDiv' id='coursesViewDiv' key={course + i}>
                            <div id='courseTitle' className='editClassDiv date'>
                                <h3 className='classHeader'>{course.title}</h3>
                                <div className='iconsDiv'>
                                    <Link id='iconATag' to={`/editcourse/${course.title}/${course.class_id}`}><img src={editIcon} className='deleteEditIcons' alt='edit icon' /></Link>
                                    <img onClick={() => this.deleteCourse(course.class_id)} src={deleteIcon} className='deleteEditIcons' alt='delete Icon' />
                                    <Link id='iconATag' to={`/update/courseroll/${course.title}/${course.class_id}`}><img alt='add roll' src={addIcon} className='deleteEditIcons' /></Link>
                                    <Link id='iconATag' to={`/update/removeuser/courseroll/${course.title}/${course.class_id}`}><img alt='minus roll' src={minusIcon} className='deleteEditIcons' /></Link>
                                </div>
                            </div>
                            <div id='classInfo' className='classInfoDiv'>
                                <div id='info'>
                                    <p id='labels' className='descriptionText'>ID </p>
                                    <p className='descriptionText'>{course.class_id}</p>
                                </div>
                                <div id='info'>
                                    <p id='labels' className='descriptionText'>Class #:</p>
                                    <p className='descriptionText'>{course.class_num}</p>
                                </div>
                                <div id='info' >
                                    <p className='descriptionText' id='labels'>Length</p>
                                    <p className='descriptionText'>{course.length}</p>
                                </div>
                                <div id='info'>
                                    <p className='descriptionText' id='labels'>Day: </p>
                                    <p className='descriptionText' >{course.day}</p>
                                </div>
                                <div id='info' >
                                    <p className='descriptionText' id='labels'>Time: </p>
                                    <p className='descriptionText'>{course.time}</p>
                                </div>
                                <div id='info'>
                                    <p className='descriptionText' id='labels'>Teacher: </p>
                                    <p className='descriptionText' >{course.teacher}</p>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        danceCourses: state.danceCourses
    }
}

export default connect(mapStateToProps, { getCourses })(Courses);