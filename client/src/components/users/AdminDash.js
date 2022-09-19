import React, {useState, useEffect} from "react";
import axios from "axios";
import LikesForm from "../likes/Form";


const AdminDash = props => {
    const [likes, setLikes] = useState([])

    // get all likes
    useEffect( ()=>{
        axios.get('http://localhost:8000/api/likes')
        .then( res => setLikes(res.data) )
        .catch( res => console.log('error in likes find request') )
    },[likes] )

    // delete a like
    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/like/${id}`)
            .then( res=> setLikes(likes.filter(e=>e._id!==id)) )
            .catch( res => console.log('delete gifhsop', res) )
    }

    return (
        <>
        <div>
            <a href='/projects-admin'>
                <h2>
                    Projects
                </h2>
            </a>
            - Get projects from github.
            <br/>
            - Check the projects you have.
            <br/>
            - Add a new project.
            <h2>
                Likes Form
            </h2>
            <LikesForm/>
        </div>

        {/* ALL LIKES TO EDIT */}
        <div className="container">
            { likes.map( (obj, i) =>
            <div key={i}>
                <LikesForm likes={likes} setLikes={setLikes} old={obj} submit={'Update'}/>
                <button className='fancy-btn' onClick={e=>handleDelete(e,obj._id)}>
                    Delete
                </button>
            </div>
            )}
        </div>
        </>
    )
}

export default AdminDash