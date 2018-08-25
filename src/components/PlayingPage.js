import React from 'react'
import { connect } from 'react-redux'

import { } from '../redux/actions'
import { minuteS } from '../functions'

import Clock from './Clock.js'
import Icon from './Icon.js'
import { throws } from 'assert';



class PlayingPage extends React.Component {

    render() {

        let timerBarStyle = {
            width: (this.state.minute) * 100 / this.props.CR[0].totalDuration + '%'
        }

        let breakWidthClass = this.state.breakBool && this.props.CR[this.state.interval].duration ? 
            'breakShow':'breakHide'

        

        return (
            <div className='playing-page' >


                <div className='buffer'></div>





                <div className='playing-main'>
                    {this.state.countdown ? (
                        <h1>{this.state.countdown}</h1> 
                    ):(
                    
                    <div>

                        <h2>{this.props.CR[this.state.interval].name}<span className={breakWidthClass}> (break)</span>
                        {/* {this.state.breakBool && this.props.CR[this.state.interval].duration && <span> (break)</span>} */}
                        </h2>

                        <Clock count={this.state.count} duration={this.props.CR[this.state.interval].duration}/>

                        <h3>{minuteS(this.props.CR[this.state.interval].duration)}</h3>


                    </div>
                    )}
                </div>



                {!this.state.countdown && 
                <div className='playing-info'>
                    {/* <h4 className='total-duration'>{timerBarStyle.width}</h4> */}
                    <h4 className="total-duration" >{this.props.CR[0].title && this.props.CR[0].title + ' , '} {minuteS(this.props.CR[0].totalDuration)}</h4>


                    <div className='pause-play'>
                        {!this.state.paused ?
                            <button onClick={() => {
                                clearInterval(this.timer)
                                this.setState({ paused: true })
                            }}>
                            <Icon name='pause'/>
                            </button>
                            :
                            <button onClick={() => {
                                this.timer = setInterval(this.tick, 1000)
                                this.setState({ paused: false })
                            }}>
                            <Icon name='play'/>
                            </button>
                        }
                    </div>


                    <div className="timer-holder" >
                        <div className='timer-bar' style={timerBarStyle}></div>
                    </div>

                </div>}
                




        </div>
        )
    }

    state = {
        interval: 0,
        count: 0,
        countdown: 3,
        minute: 0,
        paused: false,

        setsCount:1,
        setsBoundary:69,
        breakBool: false,
        vocal: 0,
        vArray: [10,17,25,26,28,38,39,49],
        vArrayBest: [17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25,17,25],
        //17 or 25
        wordsToSay: [
            'meditate upside down', 'meditate upside down', 'meditate upside down',
            'go wild', 'go wild', 'go wild',
            'mad chanting', 'mad chanting', 'mad chanting',
            'flip burgers', 'flip burgers', 'flip burgers',
            'kiss Sarah', 'kiss Sarah', 'kiss Sarah',
            'lie down', 'lie down', 'lie down',
            'downwards facing dog', 'downwards facing dog', 'downwards facing dog',
        ]
    }
    

    startRoutine = () => {     
        this.setState({interval:1})
        this.playSound(this.props.CR[this.state.interval].sound.split(' x'))
        setTimeout(()=>{this.setState({minute:1})},50)
        this.timer = setInterval(this.tick,1000)
    }

    tick = () => {
        //tick function
        if (this.props.CR[this.state.interval].splitInterval) { this.splitIntervalFunc() }
        
        this.setState((prevState) => ({ count: prevState.count + 1 }))
        console.log(this.state.count);
        

        if (this.state.count == this.props.CR[this.state.interval].duration * 60 
            || this.props.CR[this.state.interval].duration == 0) {
            
            //end of interval
            if (this.state.interval == this.props.CR.length - 1) {
                this.endOfRoutine()
            }
            else {
                this.nextInterval()
            }
        }

        if (this.state.count % 60 == 0) {
            this.setState((prevState) => ({ minute: prevState.minute + 1 }))
        }
    }

    nextInterval = () => {
        this.setState((prevState) => ({
            count: 0,
            interval: prevState.interval + 1,
            breakBool: false
        }))
        this.playSound(this.props.CR[this.state.interval].sound.split(' x'))
    }

    endOfRoutine = () => {
        clearInterval(this.timer)
        this.setState({ countdown: 'end' })
        this.playSound(this.props.CR[0].endSound.split(' x'))
        setTimeout(() => {
            this.props.history.push('/settings')
        }, 3000)
    }
    
    playSound = ([soundLocation, soundMultiplier]) => {

        let audio1 = new Audio('./sounds/' + soundLocation + '1.mp3')
        // let audio1 = new Audio('https://instaud.io/2z8a')
        audio1.play();

        if(soundMultiplier >= 2){
            setTimeout(()=>{
                let audio2 = new Audio('./sounds/' + soundLocation + '2.mp3')
                audio2.play()
            },800)
        }

        if(soundMultiplier >= 3){
            setTimeout(() => {
                let audio3 = new Audio('./sounds/' + soundLocation + '3.mp3')
                audio3.play()
            },1600)
        } 

        if (!this.state.countdown && this.props.CR[this.state.interval].spokenWords){
            this.speechSynthesis(soundMultiplier*900)
        }
    }

    speechSynthesis = (delay) => {
        setTimeout(() => {
            var spokenWords = new SpeechSynthesisUtterance(this.props.CR[this.state.interval].name);
            spokenWords.voice = this.voices[25];
            spokenWords.rate = 0.85
            // spokenWords.voume = volume
            // console.log(volume)
            // --- volume not working ---
            speechSynthesis.speak(spokenWords);
        }, delay)
    }

    splitIntervalFunc = () => {
        if (this.state.count == 0){
            this.setState({setsCount: 1, breakBool: false})
            this.setsBoundaryCalc()
        }
        if (this.state.count == this.state.setsBoundary){
            if (this.state.breakBool){
                this.setState((prev) => ({
                    setsCount: prev.setsCount + 1
                }))
            }
            if (this.state.setsCount > this.props.CR[this.state.interval].setsAmount){
                this.setState({breakBool:false})
                return
            }

            const soundUrl = !this.state.breakBool ? './sounds/ting1.mp3' : './sounds/ding.mp3'
            const audio4 = new Audio(soundUrl)
            this.setState((prev) => ({
                breakBool: !prev.breakBool 
            }))
            this.setsBoundaryCalc()
            console.log(soundUrl)
            audio4.play()
        }
    }

    setsBoundaryCalc = () => {
        let minus = !this.state.breakBool ? this.props.CR[this.state.interval].offDuration : 0
        let sb = 
            (this.props.CR[this.state.interval].onDuration + this.props.CR[this.state.interval].offDuration) 
            * this.state.setsCount - minus
        this.setState({setsBoundary: sb})
    }

    
    voices = speechSynthesis.getVoices();
    
    countdown = setInterval(() => {
        this.setState((prevState) => ({ countdown: prevState.countdown - 1 }))
        if (this.state.countdown == 0) {

            this.setState({ countdown: '' })
            clearInterval(this.countdown)
            this.startRoutine()
            this.voices = speechSynthesis.getVoices();
        }
    }, 100)

    
    
    componentWillUnmount(){
        clearInterval(this.timer)
        clearInterval(this.countdown)
    }    
}

const mapStateToProps = (state) => ({
    CR: state.currentRoutine,
})


export default connect(mapStateToProps)(PlayingPage)





{/* <div>
    next:
    {this.props.CR[this.state.interval+1] ? 
    <div>   {this.props.CR[this.state.interval+1].name}&nbsp;
            {this.props.CR[this.state.interval+1].duration} minute
            <button onClick={this.nextInterval}>next</button>
    </div> : <div>end</div>}
</div> */}
