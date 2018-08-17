import React from 'react'


export default class Clock extends React.Component {

    render() {
        let degrees = (this.props.count + 1) * 6 / this.props.duration
        let rotation = {
            transform: `rotate(${degrees}deg)` 
        }
        let clockFace3 = (
            this.props.count >= (this.props.duration * 30) && ('clock-face-3')
        )

        let instantRotation = ( 
            this.props.count == 0 && ('instant-rotation')
            // this.props.count == (this.props.duration * 60) - 1 && ('instant-rotation')
        ) 


        return (
            <div className='clock' >
                <div className={'clock-face-1 ' + instantRotation}
                style={rotation}
                ></div>
                <div className={'clock-face-2 ' + clockFace3}></div>
            </div>
        )
    }



}
