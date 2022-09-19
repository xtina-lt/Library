import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Form from './Form'

const GifShop = props => {
    const [list, setList] = useState([])
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

        // get all list
        useEffect( ()=>{
            axios.get('http://localhost:8000/api/gifshops')
            .then( res => setList(res.data) )
            .catch( res => console.log('gifshop find request', res) )
        },[] )
    
    const handleDelete = (e, id) => {
        axios.delete(`http://localhost:8000/api/gifshop/${id}`)
            .then( res=> setList(list.filter(e=>e._id!==id)) )
            .catch( res => console.log('delete gifhsop', res) )
    }

    const handleBuy = (e, obj) => {
        e.preventDefault();
        console.log('trying to buy')
        if (!Cookies.get('stars')) {
            setSuccess(false)
            setError('Try logging in🌟')
        } else if (Cookies.get('stars') && Cookies.get('stars') < obj.price) {
            // update success and errors
            setSuccess(false)
            setError('Go like some more things🌟')
        } else {
            // change errors
            // update gifshop item
            axios.put(`http://localhost:8000/api/gifshop/${obj._id}`, {...obj, users:[...obj.users, Cookies.get('userId')]})
                .then( res => console.log('congrats on the new buy') )
                .catch( res => console.log('wrong'))
            // update user stars
            axios.put(`http://localhost:8000/api/user/${Cookies.get('userId')}`, {stars : ( Number(Cookies.get('stars')) - Number(obj.price) )}, { withCredentials: true })
                .then( res => {
                    // update cookie
                    document.cookie = `stars=${Number(Cookies.get('stars')) - Number(obj.price)}`
                    // update navbar
                    document.getElementById('stars').innerHTML=`${Number(Cookies.get('stars'))}`
                    // update success and error
                    setError(null)
                    setSuccess(true)
                })
                .catch(res=> console.log('user update error'))
        }
    }
        

    return(
        <>
        {/* ADMIN CREATE *****************
            - can create new document */}
            {
                (Cookies.get('userId') && Cookies.get('userId') === '62f693acc7864d95c7e69e82') ?
                <div>
                    <h2>
                        Create new
                    </h2>
                    <Form list={list} setList={setList}/>
                </div>
                :
                null
            }
        {/* ADMIN READ *****************
            - shows all documents in collection
            - can edit with forms */}
            {
                (Cookies.get('userId') && Cookies.get('userId') === '62f693acc7864d95c7e69e82') ?
                <div className='container'>
                    { list.map( (obj, i) =>
                    <div key={i}>
                        <img src={obj.url} alt={obj.name}/>
                        <Form list={list} setList={setList} old={obj} submit={'Update'}/>
                        <button className='fancy-btn' onClick={ e => handleDelete(e, obj._id) }>
                            Delete
                        </button>
                    </div>
                )}
                </div>
                :
                <>
        {/* NORMAL STATUS SECTION *****************
            - gives instructions
            - shows success or errors */}
                <div>
                    <h2>
                        Try to Buy!
                    </h2>
                    🦄 Login
                    <br/>
                    🦄Like things to buy images.
                    <br/>
                    🦄They will show up in your dashboard
                    <br/>
                    {
                        (success) 
                        ?
                        <>
                        <h2>
                            Success
                        </h2>
                        <span className='accent'>
                            Go check your dashboard!
                        </span>
                        </>
                        :
                        (error)
                        ?
                        <span className='accent'>
                            {error}
                        </span>
                        :
                        null
                    }
                </div>
        {/* NORMAL USER READ *****************
            - shows all documents in collection
            - option to buy */}
            <div className='container'>
                { list.map( (obj, i) =>
                        <div key={i}>
                            <h2>
                                {obj.name}
                            </h2>
                            <img src={obj.url} alt={obj.name}/>
                            {obj.desc}
                            <button className='fancy-btn' onClick={e=>handleBuy(e,obj)}>
                                Buy 💜{obj.price}
                            </button>
                        </div>
                )}
            </div>
            </>
            }
        </>

    )
}

export default GifShop