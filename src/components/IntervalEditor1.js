import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { removeIntervalAt, editInterval } from '../redux/actions';

export const options = [
    { value: 'ting x1', label: 'ting x1' },
    { value: 'ting x2', label: 'ting x2' },
    { value: 'ting x3', label: 'ting x3' },
    { value: 'gong x1', label: 'gong x1' },
    { value: 'gong x2', label: 'gong x2' },
    { value: 'gong x3', label: 'gong x3' },
    { value: 'bell x1', label: 'bell x1' },
    { value: 'bell x2', label: 'bell x2' },
    { value: 'bell x3', label: 'bell x3' },
]

class IntervalEditor extends React.Component {

    
    render() {
        
        const selectValue = {
            label: this.props.interval.sound,
            value: this.props.interval.sound
        }

        return (
            <div className='interval-editor-container'>
                <div className='interval-editor' >
                    <input className='input-name' type='text'  autoComplete='off'
                        placeholder='activity name'    value={this.props.interval.name}
                        onChange={(e) => {
                            this.props.dispatch(editInterval(this.props.number, 'name', e.target.value))
                        }}
                    />
                    <input className='input-duration' type='number' name='duration' onClick={(e)=>{e.target.select()}}
                    disabled={this.state.splitInterval}
                    min={1} value={this.props.interval.duration}
                        onChange={(e) => { 
                            this.handleChange(e)
                            let sa = Math.ceil(e.target.value * ((parseInt(this.props.interval.onDuration) + parseInt(this.props.interval.offDuration)) / 60))
                            this.props.dispatch(editInterval(this.props.number, 'setsAmount', sa))
                        }}
                    />
                    {this.props.interval.duration == 1 ? 
                    <p className='one-minute'>minute</p>
                    : <p>minutes</p>
                    }
                    <Select className='select-container' classNamePrefix='select' isSearchable={false}
                            options={options}    value={selectValue}    
                            name='sound'
                            onChange={(e)=>{
                                console.log(e)
                                this.props.dispatch(editInterval(this.props.number, 'sound', e.value))
                            }}/>

                    <div className='button-holder'>
                        {this.state.volume == 1 ?
                        <button className='button-volume-high'
                        onClick={()=>{
                            this.setState({ volume: 0.6 })
                            this.props.dispatch(editInterval(this.props.number, 'volume', 0.6))
                        }}
                        ></button>
                        :
                        <button className='button-volume-low'
                        onClick={()=>{
                            this.setState({ volume: 1 })
                            this.props.dispatch(editInterval(this.props.number, 'volume', 1))
                        }}></button>
                        }
                    </div>

                    <div className='button-holder'>
                        {this.state.splitInterval ?
                        <button className='button-split-on'
                        onClick={()=>{
                            this.setState({ splitInterval: false })
                            this.props.dispatch(editInterval(this.props.number, 'splitInterval', false))
                        }}
                        ></button>
                        :
                        <button className='button-split-off'
                        onClick={()=>{
                            this.setState({ splitInterval: true })
                            this.props.dispatch(editInterval(this.props.number, 'splitInterval', true))
                        }}></button>
                        }
                    </div>

                    <div className='button-holder'>
                        {this.state.spokenWords ?
                        <button className='button-speech-on'
                        onClick={()=>{
                            this.setState({ spokenWords: false })
                            this.props.dispatch(editInterval(this.props.number, 'spokenWords', false))
                        }}
                        ></button>
                        :
                        <button className='button-speech-off'
                        onClick={()=>{
                            this.setState({ spokenWords: true })
                            this.props.dispatch(editInterval(this.props.number, 'spokenWords', true))
                        }}></button>
                        }
                    </div>


                    <div className='button-holder'>
                        <button className='button-delete'
                            onClick={(e) => { 
                                e.preventDefault()
                                this.props.dispatch(removeIntervalAt(this.props.number))
                        }}></button>
                    </div>

                    {this.state.splitInterval && 
                    <form className='split-interval'   name='ffff'
                        // onSubmit={(e)=>{
                        //     e.preventDefault()
                        //     console.log('submtied :)')}}
                        // onChange={(e) => {e.target.form.submit(e.target.form)}}
                        >
                        <input type='number' name='setsAmount' min={0}
                            value={this.props.interval.setsAmount}
                            onClick={(e) => { e.target.select() }}
                            onChange={(e) => { 
                                this.handleChange(e);
                                this.changeDuration(e.target.name, e.target.value)
                            }}
                            /><p className='lots-of-p' >lots of</p>
                        <input type='number' name='onDuration' min={0}
                            value={this.props.interval.onDuration}
                            onClick={(e) => { e.target.select() }}
                            onChange={(e) => {
                                this.handleChange(e);
                                this.changeDuration(e.target.name, e.target.value)
                            }}
                            /><p>seconds On,</p>
                        <input type='number' name='offDuration' min={0}
                            value={this.props.interval.offDuration}
                            onClick={(e) => { e.target.select() }}
                            onChange={(e) => {
                                this.handleChange(e);
                                this.changeDuration(e.target.name, e.target.value)
                            }}
                            /><p>seconds Off</p>

                    </form>}

                </div>
                    

                <h6>{this.props.number + '.'}</h6>

            </div>

        )
    }

    state= {
        splitInterval: this.props.interval.splitInterval,
        spokenWords: this.props.interval.spokenWords,
        volume: this.props.interval.volume
    }

    handleChange = (e) => {
        this.props.dispatch(editInterval(this.props.number, e.target.name, parseInt(e.target.value) ))
    }

    changeDuration = (namee, valuee) => {
        let sa =   namee == 'setsAmount' ? valuee : this.props.interval.setsAmount
        let onD =  namee == 'onDuration' ? valuee : this.props.interval.onDuration
        let offD = namee == 'offDuration'? valuee : this.props.interval.offDuration
        sa = parseInt(sa);  onD = parseInt(onD);  offD = parseInt(offD)
        let duration = (sa * (onD + offD))/60
        if (!duration){duration = 0}
        console.log(duration)
        this.props.dispatch(editInterval(this.props.number, 'duration', Math.ceil(duration) ))
    }



}



const mapStateToProps = (state, ownProps) => ({
    currentRoutine: state.currentRoutine,
    interval: state.currentRoutine[ownProps.number]
})


export default connect(mapStateToProps)(IntervalEditor)