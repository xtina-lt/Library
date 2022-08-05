import React from "react";
import Header from "../site/Header";
import Nav from "../site/Nav";
import FindLikes from "../likes/FindLikes";


const AdminDash = props => {
    const logged = '62ec28b04969c11611761c06'

    return (
        <>
        <Header header="XTINA.CODES"/>
        <Nav/>
        <main>
            <FindLikes logged={logged}/>
        </main>
        </>
    )
}

export default AdminDash