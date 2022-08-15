import React, {useEffect, useState} from "react"
import axios from "axios"
import Form from "./Form"

const LikesUser = ({id}) => {
    const [likes, setLikes] = useState([])

    useEffect( ()=> {
        axios.get(`http://localhost:8000/api/like/user/${id}`)
            .then( res => setLikes(res.data) )
            .catch( res => console.log('faled user likes') )
    }, [likes] )

    const handleDelete = (e, like) => {
        e.preventDefault();
        var filtered = like.users.filter(e=>e!==id)
        // // update like
        axios.put(`http://localhost:8000/api/like/${like}`, {...like, users: filtered})
            .then( res => console.log('changed like'))
            .catch( res => console.log('failed changed like') )
        // // changee like
        var filteredLikes = likes.filter(e=>e._id!==like._id)
        setLikes(filteredLikes)
    }

    return(
        <div>
            <h2>
                Likes
            </h2>
            <table>
                <thead>
                    <tr>
                        <td>
                            Description
                        </td>
                        <td>
                            X
                        </td>
                    </tr>
                </thead>
                <tbody>
                { likes.map( (obj, i) =>
                    <tr key={i}>
                        <td>
                            <a href={obj.url}>
                                {obj.desc}
                            </a>
                        </td>
                        <td>
                            <a onClick={e => handleDelete(e, obj)}>
                                X
                            </a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default LikesUser