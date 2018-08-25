import React from 'react'
import { connect } from 'react-redux'
import { loadRoutine, deleteRoutine } from '../redux/actions';
import { saveToLocal } from '../functions'
import Icon from './Icon.js'

const RoutineLoader = (props) => (
    
    <div className='routine-loader'>
            <h3>{props.routine[0].title}</h3>
            <h5>{props.routine[0].totalDuration}</h5>
            <p> minutes with </p>
            <h5>{props.routine[0].intervals}</h5>
            <p> activities</p>
            <div className='buffer' ></div>
            
            {!props.export &&
                <button className='button-delete'
                    onClick={() => { 
                        props.dispatch(deleteRoutine(props.number))
                        setTimeout(() => {
                            props.saveToLocal()
                        }, 200)
                }}><Icon name='delete'/></button>
            }

            {!props.export &&
                <button className='button-load'
                    onClick={() => {
                        props.dispatch(loadRoutine(props.routine))
                        props.history.push('/settings')
                }}><Icon name='arrow'/></button>
            }
            
            <div className='description-container-2'>
                <h4 className='description-delete'>delete</h4>
                <h4 className='description-load'>load</h4>
            </div>
            
            {props.export &&
            <form className="" onSubmit={(e)=>{
                e.preventDefault()
                var copyText = document.getElementsByClassName("toCopy")[props.number-1]
                console.log(copyText.value)
                copyText.select()
                document.execCommand("copy")
                props.exportDone()
            }}>
                <button><Icon name='export'/></button>
                <textarea name="toCopy" className="toCopy" defaultValue={JSON.stringify(props.routine)}></textarea>
            </form>}

    </div>

)




const mapStateToProps = (state, ownProps) => ({
    routine: state.savedRoutines[ownProps.number]
})


export default connect(mapStateToProps)(RoutineLoader)