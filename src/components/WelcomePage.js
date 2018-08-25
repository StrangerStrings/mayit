import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { loadRoutine, sort, sortBy, loadLocalRoutines, saveRoutine } from '../redux/actions'
import { createTemplate } from '../functions.js'
import RoutineLoader from './RoutineLoader.js'
import { setTimeout } from 'timers';
import Icon from './Icon.js'
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
                    this.setState({export:false,import:false,importError:false})
                    let template = createTemplate(e.target.intervals.value, e.target.durations.value, currentSound)
                    this.props.dispatch(loadRoutine(template))
                    this.props.history.push('/settings')
                }}
            >
                <input className='input-intervals' type='number' min={1} defaultValue={4} name='intervals' onClick={(e)=>{e.target.select()}} /><p className='times'>x</p>
                <input className='input-durations' type='number' min={1} defaultValue={3} name='durations' onClick={(e)=>{e.target.select()}} /><p>minutes  </p>
                <Select className='select-container' classNamePrefix='select' isSearchable={false}
                    options={options} defaultValue={options[1]} onChange={(e)=>{
                        currentSound = e.value
                    }}
                    
                    />
                <button className='button-create'><Icon name='arrow'/></button>
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
                    <h6>date</h6>
                    <div>
                    {this.props.savedRoutines[0].sortByDate && (
                        this.props.savedRoutines[0].ascending ? <Icon name='up-bit'/> : <Icon name='down-bit'/>
                    )}</div>
                    </button>
                    
                    <button onClick={() => {
                        let ascending = !this.props.savedRoutines[0].ascending
                        this.props.dispatch(sortBy(false, ascending))
                        this.props.dispatch(sort())
                    }}>
                    <h6>length</h6>
                    <div>
                    {!this.props.savedRoutines[0].sortByDate && (
                        this.props.savedRoutines[0].ascending ? <Icon name='up-bit'/> : <Icon name='down-bit'/>
                    )}</div>
                    </button>
    
                </div>
            </div>
    
            <div className='container saves-list' >
                {!this.state.import ? <div>
                    {!this.props.savedRoutines[1] && <h5>no saves yet</h5>}
                    {savedRoutinesArray.map((SRnumber)=>(
                        <RoutineLoader number={SRnumber} key={SRnumber} history={this.props.history}
                        export={this.state.export}  exportDone={()=>{
                            this.setState({export:false, justExported:true})
                            setTimeout(()=>{this.setState({justExported:false})},6000)
                        }}
                        saveToLocal={()=>{localStorage.setItem('savedRoutines', JSON.stringify(this.props.savedRoutines)); console.log('saved')}}    />
                    ))}
                    {this.state.export && 
                            <div className="routine-loader export-message"><p>click button to copy data to clipboard<br/>then paste into 'import' on chosen device/browser</p></div>}
                </div> 
                : <div className='import-area'>
                    <p>paste the exported data into the textbox <br/> and press button to import a save</p>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        try{
                            let data = JSON.parse(e.target.importData.value)
                            let t = data[0]
                            if (!(t.dateCreated && t.defaultDuration && t.defaultSound && t.endSound && t.endVolume && t.totalDuration)){
                                throw "invalid data"
                            }
                            data[0].dateCreated = Date.now()
                            this.props.dispatch(saveRoutine(data))
                            this.setState({import: false, importError: false, justImported:true})
                            this.props.dispatch((sort()))
                            setTimeout(()=>{
                                localStorage.setItem('savedRoutines', JSON.stringify(this.props.savedRoutines))
                            },100)
                            setTimeout(()=>{this.setState({justImported:false})},4000)
                        }
                        catch(error){
                            console.log(error)
                            this.setState({importError:true})
                            e.target.importData.value = ''
                        }
                    }}>
                        <input name="importData" type="text" autoComplete="off"></input>
                        <button><Icon name='import'/></button>
                    </form>
                    {this.state.importError &&
                    <p className='error'>error: please copy and paste exact data using mayit's export button</p>}
                </div> }

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
                
            <div className='container saves-header import-export'>
                <div className='ordering-div '>
    
                    <button className={this.state.import && 'selected'}
                    onClick={() => {
                        this.setState({export:false})
                        this.setState((prev) => ({import: !prev.import}))
                    }}>
                    import

                    </button>
                    
                    <button className={this.state.export && 'selected'}
                    onClick={() => {
                        this.setState({import:false})
                        this.setState((prev) => ({export: !prev.export}))
                    }}>
                    export

                    </button>
                </div>
                {this.state.justExported && <h4>copied to clipboard</h4>}
                {this.state.justImported && <h4>succesfully imported</h4>}
            </div>
                
            <div className='bottom-buffer'></div>
    
        </div>

        )
    }

    state={
        export: false,
        import: false,
        importError:false,
        justExported:false
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