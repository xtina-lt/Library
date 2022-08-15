import React, {useState, useEffect} from 'react'
import axios from 'axios'

const GifshopUser = ({id}) => {
    // instantiate list
    const [list, setList] = useState([])

    useEffect( ()=> {
        axios.get(`http://localhost:8000/api/gifshops/user/${id}`)
            .then( res => setList(res.data) )
            .catch( res => console.log(res.data.errors) )
    }, [list] )

    return(
        <>
            <div>
                <h2>
                    GifShop Collection
                </h2>
                <span className='accent'>
                    Click image for full size.
                </span>
                {/* Find where users includes logged in id */}
                {list.map( (obj, i) =>
                    <>
                    <h3 key={i}>
                        {obj.name}
                    </h3>
                    <a href={obj.url} target="_blank" rel="noopener">
                        <img src={obj.url} alt={obj.name}/>
                    </a>
                    </>
                )}
            </div>
        </>
    )
}

export default GifshopUser
