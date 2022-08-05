import React from "react";
import { useParams } from "react-router-dom";
import UserDash from "../users/UserDash";
import AdminDash from '../users/AdminDash'

const Dashboard = props => {
    const {id} = useParams()
    return(
        <>
            { (id !== '62ec28b04969c11611761c06') ? <UserDash id={id}/> : <AdminDash/> }
        </>
    )
}

export default Dashboard