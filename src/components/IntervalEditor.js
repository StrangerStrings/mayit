import React from 'react'
import { connect } from 'react-redux'
import { removeIntervalAt, editInterval} from '../redux/actions';
import {} from '../functions'


class IntervalEditor extends React.Component {

    render() {
        return (
            <div className='interval-editor-container'>
                <form className='interval-editor' >
                    <input className='input-name'  
                        type='text' name='name' value={this.props.interval.name}
                        onChange={(e) => { this.handleChange(e) }}
                    />
                    <input className='input-duration'
                    type='number' name='duration' value={this.props.interval.duration}
                        onChange={(e) => { this.handleChange(e) }}
                    /><p>minutes</p>
                    <input className='input-sound' 
                        type='text' name='sound' value={this.props.interval.sound}
                        onChange={(e) => { this.handleChange(e) }}
                    />
                    <input className='input-volume' 
                        type='number' name='volume' value={this.props.interval.volume}
                        onChange={(e) => { this.handleChange(e) }}
                    /><p>db</p>
                    <button onClick={(e) => { this.handleDelete(e) }}>delete</button>

                </form>

                <h6>{this.props.number+'.'}</h6>
            </div>

        )
    }

    handleChange = (e) => {
        this.props.dispatch(editInterval(this.props.number, e.target.name, e.target.value))
    }

    handleDelete = (e) => {
        e.preventDefault()
        this.props.dispatch(removeIntervalAt(this.props.number))
    }


}



const mapStateToProps = (state, ownProps) => ({
    currentRoutine: state.currentRoutine,
    interval: state.currentRoutine[ownProps.number]
})


export default connect(mapStateToProps)(IntervalEditor)