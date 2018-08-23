import React from 'react'
import { connect } from 'react-redux'
import {editInterval, addNewInterval,addNewIntervalAt, saveRoutine, deleteRoutine, loadLocalRoutines} from '../redux/actions'
import {isTitleInUse, stndrdth} from '../functions.js'
import Select from 'react-select'
import IntervalEditor from './IntervalEditor1.js'
import {options} from './IntervalEditor1.js'
import FontAwesome from 'react-fontawesome';
// import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
var saveErrorTimer


class SettingsPage extends React.Component {

    render() {
        const endSound = { label: this.props.currentRoutine[0].endSound, value: this.props.currentRoutine[0].endSound}

        const addCount = this.state.addCount <= 0 ? '+' : this.state.addCount;

        let IntervalEditorArray = []
        for (let i = 1; i < (this.props.currentRoutine.length); i++){
            IntervalEditorArray.push(i)
        }


        return (
            <div className='settings-page' >

                <div className='buffer'></div>

                <div className='settings-page-main'>

                    <div className='interval-editors container'>

                    {/* all the IntervalEditor's here */}
                    {IntervalEditorArray.map((IEnumber) => (
                        <IntervalEditor number={IEnumber} key={IEnumber}/>
                    ))}

                        <form className='interval-editor end-sound' >
                            <h5>end sound:</h5>
                            <div className='buffer'></div>
                            <Select className='select-container' classNamePrefix='select' isSearchable={false}
                                options={options} value={endSound}
                                onChange={(e) => {
                                    this.props.dispatch(editInterval(0, 'endSound', e.value))
                                }} />
                            <input className='input-volume'
                                type='number' name='endVolume' 
                                min={1} max={3}
                                value={this.props.currentRoutine[0].endVolume}
                                onChange={(e) => { 
                                    this.props.dispatch(editInterval(0, e.target.name, e.target.value))
                                }}
                            /><p>db</p>

                        </form>
                    </div>




                    <div className='container add-buttons'>

                        <button className='add-button' 
                        onMouseDown={() => {
                            this.addCounter = setInterval(()=>{
                                this.setState((prev)=>({addCount: prev.addCount+1}))
                            },500)
                        }}   onMouseUp={()=>{
                            let addAmount = this.state.addCount < 2 ? 1 : this.state.addCount
                            clearInterval(this.addCounter)
                            for (let i=0 ; i < addAmount ;i++){
                                !this.state.showAddOptions ? 
                                    this.props.dispatch(addNewInterval(this.props.currentRoutine[0])) 
                                    :
                                    this.state.whereToAdd != 0 &&   
                                    this.props.dispatch(addNewIntervalAt(this.props.currentRoutine[0],this.state.whereToAdd))
                            }
                            this.setState({addCount:-1})
                        }} onMouseLeave={() => {
                            clearInterval(this.addCounter)
                            this.setState({addCount:-1})

                        }}
                        >{addCount}</button>

                        {!this.state.showAddOptions ? 
                            <button className='show-add-options' onClick={() => {
                                this.setState({showAddOptions: true})   
                            }}/> 
                            : 
                            <button className='hide-add-options' onClick={() => {
                                this.setState({ showAddOptions: false })
                            }} /> 
                        }

                        
                        {this.state.showAddOptions && 
                            <div className='add-button-options' >

                                <p>before the</p>
                                <input type='number' name='where' min={1} value={this.state.whereToAdd} onChange={(e)=>{
                                    if(e.target.value >= 0){
                                        this.setState({whereToAdd:e.target.value})
                                    }
                                }}
                                /><h6>{stndrdth(this.state.whereToAdd)}</h6>
                            </div>
                        }

                    </div>

                </div>





                <div className='play-save-fixed'>
                    <div className='container'>
                        <div className='play-save'>
                            
                            <div className='play-button-holder'>
                                <button className='button-play'  
                                onClick={()=>{
                                    let target = document.getElementsByClassName('header')[0];
                                    let div = document.createElement('div');
                                    div.classList.add('play-expander')
                                    target.parentNode.insertBefore(div, target.nextSibling);
                                    setTimeout(() => {
                                        document.getElementsByClassName('play-expander')[0].classList.add('play-expanding');
                                    }, 10)

                                    this.updateCurrentVitals()
                                    setTimeout(() => {
                                        let elem = document.getElementsByClassName('play-expander')[0]
                                        elem.parentNode.removeChild(elem)
                                        this.props.history.push('/playing')
                                    }, 350)
                                    
                                }}/>
                            </div>

                            <div className='save-button-holder'>
                                <button  className='button-save' onClick={()=>{
                                    this.saveButtonFunction()
                                }} />
                                {/* <div className='save-faller'></div> */}
                            </div>

                            <div className='description-container-3' >
                                <h4 className='description-play'>play</h4>
                                <h4 className='description-save'>save</h4>
                            </div>

                            {(this.state.saveError && !this.props.currentRoutine[0].title) && 
                            <div className='save-error'>
                                <p>give it a title</p>
                                <p>before saving</p>
                            </div>}
                        </div>
                    </div>
                </div>  




                <div className='controls'>

                   <button onClick={() => {
                        console.log(this.props.currentRoutine)
                    }} /> <p>log CR info</p>

                     <button onClick={() => {
                        console.log(this.props.savedRoutines)
                    }} /> <p>log saved routines</p>

                    <button onClick={() => {
                        console.log(JSON.parse(localStorage.getItem('savedRoutines')))
                    }} /> <p>log local storage</p>

                </div>
                





            </div>
        )
    }

    state = {
        saveError: false,
        showAddOptions: false,
        addCount: 0,
        whereToAdd: 1,
    }


    saveButtonFunction = () => {
        console.log(this.props.currentRoutine[0].title)
        if ( !this.props.currentRoutine[0].title ){
            document.getElementsByClassName('button-save')[0].classList.add('save-error-animation');
            setTimeout(()=>{
                document.getElementsByClassName('button-save')[0].classList.remove('save-error-animation')
            },300)
            //setState, timer, unset state
            this.setState({saveError:true})
            clearTimeout(saveErrorTimer)
            saveErrorTimer = setTimeout(() => {
                this.setState({saveError:false})
            }, 4000)
        }
        else{
            let target = document.getElementsByClassName('button-save')[0];
            let div = document.createElement('div');
            div.classList.add('save-faller')
            target.parentNode.insertBefore(div, target.nextSibling);
            setTimeout(() => {
                document.getElementsByClassName('save-faller')[0].classList.add('save-falling');
            }, 10)

            this.saveGame()
        }
    }

    saveGame = () => {

        //delete same named
        let titleMatches = isTitleInUse(this.props.currentRoutine[0].title, this.props.savedRoutines)
        if (titleMatches) {
            this.props.dispatch(deleteRoutine(titleMatches))
        }

        this.updateCurrentVitals()

        setTimeout(()=>{
            this.props.dispatch(saveRoutine(this.props.currentRoutine))
        },50)

        setTimeout(()=>{
            localStorage.setItem('savedRoutines', JSON.stringify(this.props.savedRoutines))
        },100)
    }

    updateCurrentVitals = () => {
        this.props.dispatch(editInterval(0, 'dateCreated', Date.now()))
        this.props.dispatch(editInterval(0, 'intervals', (this.props.currentRoutine.length-1)))
        let totalDuration = 0 
        for (let i=1; i<this.props.currentRoutine.length ; i++){
            totalDuration +=  parseInt( this.props.currentRoutine[i].duration )
        }
        this.props.dispatch(editInterval(0, 'totalDuration', totalDuration))
    }

    componentWillMount() {
        if (!this.props.savedRoutines[1]) {
            let SR = JSON.parse(localStorage.getItem('savedRoutines'))
            if (SR) {
                this.props.dispatch(loadLocalRoutines(SR))
            }
        }
    }

}


const mapStateToProps = (state) => ({
    currentRoutine: state.currentRoutine,
    savedRoutines: state.savedRoutines,
})


export default connect(mapStateToProps)(SettingsPage)





        // <button onClick={() => {
        //     for (let i=0; i<this.props.savedRoutines.length ;i++){
        //         console.log(this.props.savedRoutines[i][0]);
        //     }
        // }}>log savedRoutines</button> 








        // --- important ---
// {/* save function */ }
// <button onClick={() => {
//     if (this.props.currentRoutine[0].title) {

//         // check for duplicate title 
//         let titleMatches = isTitleInUse(this.props.currentRoutine[0].title, this.props.savedRoutines)
//         if (titleMatches) {
//             this.props.dispatch(deleteRoutine(titleMatches))
//         }

//         //update all the info properties
//         this.props.dispatch(editInterval(0, 'length', (this.props.currentRoutine.length - 1)))
//         this.props.dispatch(editInterval(0, 'dateCreated', Date.now()))

//         let totalDuration = 0
//         let len = this.props.currentRoutine.length - 1
//         for (let i = 1; i < (len + 1); i++) { totalDuration += this.props.currentRoutine[i].duration }
//         this.props.dispatch(editInterval(0, 'totalDuration', totalDuration))

//         //add current routine to saved routines
//         this.props.dispatch(saveRoutine(this.props.currentRoutine))
//     }
//     else {
//         //error message, state change?
//     }
// }}>Save</button>
// {/* save function */ }
