import React, {useEffect, useState} from "react"
import axios from "axios"
import Form from "./Form"

const LikesAdmin = props => {
    const [likes, setLikes] = useState([])

        // get all likes
        useEffect( ()=>{
            axios.get('http://localhost:8000/api/likes')
            .then( res => setLikes(res.data) )
            .catch( res => console.log('error in likes find request') )
        },[likes] )

        const handleDelete = (e, id) => {
            e.preventDefault();
            axios.delete(`http://localhost:8000/api/like/${id}`)
                .then( res=> setLikes(likes.filter(e=>e._id!==id)) )
                .catch( res => console.log('delete gifhsop', res) )
        }

    return(
        <>
            <div>
                <h2>
                    Create New Like
                </h2>
                <Form likes={likes} setLikes={setLikes}/>
            </div>
            { likes.map( (obj, i) =>
            <div key={i}>
                <Form likes={likes} setLikes={setLikes} old={obj} submit={'Update'}/>
                <button className='fancy-btn' onClick={e=>handleDelete(e,obj._id)}>
                    Delete
                </button>
            </div>
            )}
        </>
    )
}

export default LikesAdmin