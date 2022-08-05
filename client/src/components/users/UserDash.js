import React from "react";
import Header from "../site/Header";
import Nav from "../site/Nav";

const UserDash = props => {
    const {id} = props
    return(
        <>
            <Header/>
            <Nav/>
            <main>
                <div>
                    {/* things liked */}
                    SHOW LIKES {id}
                </div>
            </main>
        </>
    )
}

export default UserDash