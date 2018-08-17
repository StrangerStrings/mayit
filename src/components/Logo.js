import React from 'react'


const Logo = (props) => (

    <div className={"logo " + props.page}>
        <div className={'logo-partial ' + props.page}>
            <h1>M</h1><h5>editation</h5>
        </div>
        <div className={'logo-partial ' + props.page}>
            <h1>A</h1><h5>nd</h5>
        </div>
        <div className={'logo-partial ' + props.page}>
            <h1>Y</h1><h5>oga</h5>
        </div>
        <div className={'logo-partial ' + props.page}>
            <h1>I</h1><h5>nterval</h5>
        </div>
        <div className={'logo-partial ' + props.page}>
            <h1>T</h1><h5>imer</h5>
        </div>
    </div>
)

export default Logo