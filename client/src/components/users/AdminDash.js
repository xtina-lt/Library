import React from "react";
import Likes from "../likes/LikesAdmin";


const AdminDash = props => {
    return (
        <>
        <a href='/projects-admin'>
            <h2>
                Projects
            </h2>
        </a>
        <Likes/>
        </>
    )
}

export default AdminDash