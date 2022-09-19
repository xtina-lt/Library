import React, {useState, useEffect} from "react";
import axios from 'axios'
import Cookies from "js-cookie";

const LikeIcon = ({id}) => {
    const [like, setLike] = useState({})
    const [likeUsers, setLikeUsers] = useState([])

    // get like by id
    useEffect( ()=>{
        axios.get(`http://localhost:8000/api/like/${id}`)
            .then( res => {setLike(res.data); setLikeUsers(res.data.users)} )
            .catch( res => console.log('something wrong in like button') )
    },[] )

    // useEffect( ()=>{
    //     axios.get('http://localhost:8000/api/user-current', { withCredentials: true })
    //     .then(res => {setUser(res.data)})
    //     .catch(res => console.log('not logged in'))
    // },[] )

    const handleClick = e => {
        e.preventDefault()
            // get user token
        if (Cookies.get('stars')){
            if(!likeUsers.includes(Cookies.get('userId'))){
                // update like
                axios.put(`http://localhost:8000/api/like/${like._id}`, {...like, users: [...like.users, Cookies.get('userId')]})
                    .then( res => setLike(res.data))
                    .catch(res=>console.log('wrong update with like update'))
                // update cookie
                // Set-Cookie: flavor=choco; SameSite=None; Secure
                document.cookie = `stars=${Number(Cookies.get('stars'))+1}`
                // update navbar
                document.getElementById('stars').innerHTML=`${Number(Cookies.get('stars'))}`
                // update user
                axios.put(`http://localhost:8000/api/user/${Cookies.get('userId')}`, {stars : Number(Cookies.get('stars'))+1}, { withCredentials: true })
                    .then( res => {
                                    setLike({...like, users: [...like.users, Cookies.get('userId')]});
                                    setLikeUsers([...like.users, Cookies.get('userId')]);
                                })
                    .catch(res=>console.log('wrong update with user'))
            }
        } else {
            console.log('else')
            axios.put(`http://localhost:8000/api/like/${like._id}`, {...like, users: [...like.users, 'guest']})
                .then( res => setLike(res.data))
                .catch(res=>console.log('wrong with like update'))
        }
    }

    return(
        <button onClick={e => handleClick(e)} className={'block'}>
            { ( !likeUsers.includes(Cookies.get('userId')) || !Cookies.get('userId') ) ? '🤍':'💜'}
            {(like.users) ? like.users.length : 0}
        </button>
    )
}

export default LikeIcon