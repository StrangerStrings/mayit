import React from 'react'
import { connect } from 'react-redux'
import { loadRoutine, deleteRoutine } from '../redux/actions';
import { saveToLocal } from '../functions'


const RoutineLoader = (props) => (
    
    <div className='routine-loader'>
            <h3>{props.routine[0].title}</h3>
            <h5>{props.routine[0].totalDuration}</h5>
            <p> minutes with </p>
            <h5>{props.routine[0].intervals}</h5>
            <p> activities</p>
            <div className='buffer' ></div>
            <button className='button-delete'
            onClick={() => { 
                props.dispatch(deleteRoutine(props.number))
                let SR = props.savedRoutines
                console.log(SR)
                setTimeout(() => {
                props.saveToLocal()
                }, 200)
             }}>delete</button>

            <button className='button-load'
                onClick={() => {
                    props.dispatch(loadRoutine(props.routine))
                    props.history.push('/settings')
                }}>load</button>

            <div className='description-container-2'>
                <h4 className='description-delete'>delete</h4>
                <h4 className='description-load'>load</h4>
            </div>

    </div>

)




const mapStateToProps = (state, ownProps) => ({
    savedRoutines: state.savedRoutines,
    routine: state.savedRoutines[ownProps.number]
})


export default connect(mapStateToProps)(RoutineLoader)