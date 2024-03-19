import React from 'react'
import { OrientationGetStarted } from './orientation.get.started'
import Debouche from './debouche'
import AdvancedComputerScience from './advanced.computer.science'
import Roadmap from "../orientation/roadmap"

const Orientation = () => {
    return (
        <div className='col-span-4 h-screen overflow-y-auto px-12 mt4'>
            <OrientationGetStarted />
            <AdvancedComputerScience/>
            <Debouche />
            <Roadmap/>

        </div>
    )
}

export default Orientation
