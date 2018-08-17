import React from 'react'

//needs two props, count and duration
//count is current (here in seconds*10, so there's six counts per duration)
export default class Clock extends React.Component {

    render() {

        let degrees = (this.props.count + 1) * 60 / this.props.duration
        let rotation = {
            transform: `rotate(${degrees}deg)`
        }
        let clockFace3 = (
            this.props.count >= (this.props.duration * 3) && ('clock-face-3')
        )

        return (
            <div className='clock' >
                <div className={'clock-face-1 ' + instantRotation}
                    style={rotation}
                ></div>
                <div className={'clock-face-2 ' + clockFace3}></div>
                <button onClick={() => {
                    document.getElementsByClassName('clock-face-1')[0].classList.add('rotate');
                }}></button>
            </div>
        )
    }
}
