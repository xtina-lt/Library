import React, {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LikeForm = props => {
    const { old, logged } = props
    const [like, setLike] = useState( old || {desc: '', url: ''} )
    const[success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleUpdate = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/like/${like._id}`, {_id: like._id, desc: like.desc, url: like.url, users: like.users})
            .then( e => setSuccess(true) )
            .catch( e => console.log('wrong'))
    }

    const handleCreate = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/likes/create', {desc: like.desc, url: like.url, users: []})
            .then( e => navigate(`/dash/${logged}`) )
            .catch( e => console.log('wrong'))
    }

    return(
        <form onSubmit={(old) ? handleUpdate : handleCreate}>
            {success && <span className='accent'>Success!<br/></span>}
        <label>
            Description:
            <input type="text" value={like.desc} onChange={ e => setLike({...like, desc: e.target.value}) } />
        </label>
        <label>
            url:
            <input type="text" value={like.url} onChange={ e => setLike({...like, url: e.target.value}) } />
        </label>
        <input type="submit" value='submit'/>
        </form>
    )
}

export default LikeForm