import React, {useState, useEffect}from "react";
import LikesUser from "../likes/LikesUser";
import GifshopUser from "../gifshop/GifshopUser";

const UserDash = ({id}) => {
    return(
        <>
            <LikesUser id={id}/>
            <GifshopUser id={id}/>
        </>
    )
}

export default UserDash