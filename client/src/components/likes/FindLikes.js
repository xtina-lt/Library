import React, {useEffect, useState} from "react"
import axios from "axios"
import Form from "./LikeForm"

const FindLikes = props => {
    const {logged} = props;
    const [likes, setLikes] = useState([])

    useEffect( ()=> {
        axios.get('http://localhost:8000/api/likes')
            .then( e => {console.log(e.data); setLikes(e.data)} )
            .catch( e => console.log(e) )
    }, [] )

    return(
        <div className="no-background">
            <h2>
                Likes
            </h2>
            { likes.map( (obj, i) =>
            <div key={i}>
                <Form old={obj} logged={logged} submit={'update'}/>
            </div>
            )}
            <h2>
                Create New Like
            </h2>
            <div>
                <Form/>
            </div>
        </div>
    )
}

export default FindLikes