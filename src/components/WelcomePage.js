import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import Icon from './Icon'

import { loadRoutine, sort, sortBy, loadLocalRoutines } from '../redux/actions'
import { createTemplate } from '../functions.js'
import RoutineLoader from './RoutineLoader.js'

const options = [
    { value: 'gong x1', label: 'gong' },
    { value: 'bell x1', label: 'bell' },
    { value: 'ding x1', label: 'ding'}
]

let currentSound = 'gong x1'

class WelcomePage extends React.Component {

    
    render() {

        let savedRoutinesArray = []
        for (let i = 1; i < (this.props.savedRoutines.length); i++) {
            savedRoutinesArray.push(i)
        }


        return (
        
        <div className='welcome-page' >
            <div className='container saves-header'>
                <h4>template</h4>
            </div>
            <form className='container create-template'
                onSubmit={(e)=>{
                    e.preventDefault()
                    let template = createTemplate(e.target.intervals.value, e.target.durations.value, currentSound)
                    this.props.dispatch(loadRoutine(template))
                    this.props.history.push('/settings')
                }}
            >
                <input className='input-intervals' type='number' min={1} defaultValue={4} name='intervals' /><p className='times'>x</p>
                <input className='input-durations' type='number' min={1} defaultValue={3} name='durations' /><p>minutes  </p>
                <Select className='select-container' classNamePrefix='select' isSearchable={false}
                    options={options} defaultValue={options[0]} onChange={(e)=>{
                        currentSound = e.value
                    }}
                    
                    />
                <button className='button-create'><Icon name="file-empty" /></button>
                <div className='description-container'>
                    <h4 className='description-intervals'>how many?</h4>    
                    <h4 className='description-durations'>how long?</h4>
                    <h4 className='description-sounds'>what sound?</h4>    
                    <h4 className='description-create'>create</h4>
                </div>
            </form>
    
    
    
            <div className='container saves-header'>
                <h4>saved games</h4>
                <div className='ordering-div'>
                    <h5>order by: </h5>
    
                    <button onClick={() => {
                        let ascending = !this.props.savedRoutines[0].ascending
                        this.props.dispatch(sortBy(true, ascending))
                        this.props.dispatch(sort())
                    }}>
                    date
                    {this.props.savedRoutines[0].sortByDate && (
                        this.props.savedRoutines[0].ascending ? <p>u</p> : <p>d</p>
                    )}
                    </button>
                    
                    <button onClick={() => {
                        let ascending = !this.props.savedRoutines[0].ascending
                        this.props.dispatch(sortBy(false, ascending))
                        this.props.dispatch(sort())
                    }}>
                    length
                    {!this.props.savedRoutines[0].sortByDate && (
                        this.props.savedRoutines[0].ascending ? <p>u</p> : <p>d</p>
                    )}
                    </button>
    
                </div>
            </div>
    
            <div className='container saves-list' >
                {!this.props.savedRoutines[1] && <h5>no saves yet</h5>}
                {savedRoutinesArray.map((SRnumber)=>(
                    <RoutineLoader number={SRnumber} key={SRnumber} history={this.props.history}
                    saveToLocal={()=>{localStorage.setItem('savedRoutines', JSON.stringify(this.props.savedRoutines)); console.log('saved')}}    />
                ))}
            </div>
    
                {/* <div className='controls'>

                    <button onClick={() => {
                        console.log(this.props.currentRoutine)
                    }} /> <p>log current routine</p>

                    <button onClick={() => {
                        console.log(this.props.savedRoutines)
                    }} /> <p>log saved routines</p>

                    <button onClick={() => {
                        console.log(JSON.parse(localStorage.getItem('savedRoutines')))
                    }} /> <p>log local storage</p>

                </div> */}
                
            <div className='bottom-buffer'></div>
    
        </div>

        )
    }

    componentWillMount(){
        if (!this.props.savedRoutines[1]){
            let SR = JSON.parse(localStorage.getItem('savedRoutines'))
            if (SR){
                this.props.dispatch(loadLocalRoutines(SR))
            }
        }
    }

    componentDidMount(){
        this.props.dispatch(sort())
    }


}



const mapStateToProps = (state) => ({
    currentRoutine: state.currentRoutine,
    savedRoutines: state.savedRoutines,
    title: state.routineTitle
})


export default connect(mapStateToProps)(WelcomePage)