import React, {useState} from 'react'
import '../css/Template.css';
import Header from './Header'
import Nav from './Nav'

const Template = props => {
    // const {header} = props
    const [header, setHeader] = useState("Head")
    return(
        <>
            <Header header={header}/>
            <Nav/>
        </>
    )
}

export default Template