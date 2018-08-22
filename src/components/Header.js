import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editInterval } from '../redux/actions'
import Logo from './Logo.js'
import Icon from './Icon'

class Header extends React.Component {

    render() {
        return (
            <div>
            
            {this.props.location.pathname == '/' ? (
                
                // --- WelcomePage ---
                <header className='header-container'>
                    <div className='header'>
                        
                        <div className='back-button welcome'></div>
                        <div className="title-div welcome">
                            <input type='text' className='title-input welcome' /> 
                        </div>
                        <Logo page='welcome'/>

                    </div>
                </header>
                ) : this.props.location.pathname == '/settings' ? (

                    // --- SettingsPage ---
                <header className='header-container'>
                    <div className='header'>
                        {/* <div className='play-expander'></div> */}
                        <div className='back-button settings' onClick={()=>{
                            this.props.history.push('/')
                        }}><Icon name="arrow-left" /></div>
                        <div className="title-div settings">
                            <input type='text' className='title-input' placeholder='title' value={this.props.currentRoutine[0].title}
                                onChange={(e) => {
                                    this.props.dispatch(editInterval(0, 'title', e.target.value))
                                }}
                            /> 
                        </div>
                        <Logo page='settings' />
                    </div>

                        </header>
                ) : (
            
                                // --- PlayingPage ---
                <header className='header-container playing'>
                    <div className='header'>
                        <div className='stop-button' onClick={()=>{
                            this.props.history.push('/settings')
                        }}></div>
                        <div className="title-div settings">
                            {/* <h3 className='title-display' >{this.props.currentRoutine[0].title}</h3> */}
                        </div>
                        <Logo page='playing' />
                        
                    </div>

                            </header>
                )}

            </div>
        )
    }

    componentWillReceiveProps() {
        if (this.props.location.pathname == '/') {
            console.log('ff')
            setTimeout(()=>{
                if (this.props.location.pathname == '/settings'){
                    document.getElementsByClassName('title-input')[0].classList.add('settings');
                }
            },1000)
        }
        else {
            setTimeout(() => {
                if (this.props.location.pathname == '/settings') {
                    document.getElementsByClassName('title-input')[0].classList.add('settings');
                }
            }, 10)
         }
    }

    componentDidMount() {
        if (this.props.location.pathname == '/settings') {
            document.getElementsByClassName('title-input')[0].classList.add('settings');
        }
    }

}

const mapStateToProps = (state) => ({
    currentRoutine: state.currentRoutine,
})


export default connect(mapStateToProps)(Header)



//header  could have a big top-border on play mode to balance the timer







// ---quit button---
// {props.location.pathname == '/playing' && (
//     <button onClick={()=>{
//         props.history.push('/')
//     }}>quit</button>
// )}


// ---title input---
