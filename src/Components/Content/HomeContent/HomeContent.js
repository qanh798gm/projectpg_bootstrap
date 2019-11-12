import React from 'react'
import Slide from './Slide/Slide'
import Featured from './Featured/Featured'
import Auxilinary from '../../Auxilinary'

const HomeContent = () => {
    return (
        <Auxilinary>
            <Slide />
            <Featured />
        </Auxilinary>
    )
}

export default HomeContent