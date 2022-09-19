import React, {useState,  useEffect} from 'react'
import axios from 'axios'
import Filtered from './Filtered'
import Form from './Form'
import Cookies from 'js-cookie'

const Projects = ({setHeader}) => {
    setHeader('Projects')
    const [list, setList] = useState([])

    useEffect( () => {
        axios.get('http://localhost:8000/api/projects')
            .then( res => {console.log(res.data); setList(res.data)})
            .catch( res => console.log('err in projects findall'))
    }, [] )

    const handleDelete = (e, id) => {
        axios.delete(`http://localhost:8000/api/projects/${id}`)
            .then( res => setList( list.filter(e._id!==id) ) )
            .catch( res => console.log("err in projects delete") )
    }
    
    return (
        <>
        {
            (Cookies.get("userId") && Cookies.get("userId")==="62f693acc7864d95c7e69e82")
            ?
            <>
            <div className='container'>
                {list.map( (obj, i) =>
                    <div>
                        <Form list={list} setList={setList} old={obj} submit={"update"}/>
                    </div>
                )}
            </div>
            </>
            :
            <>
            {/* USER */}
            <div className='no-background'>
                <h2>
                    Python
                </h2>
                <Filtered list={list.filter(e=>e.language==="Python" || e.language==="python")}/>
            </div>
            <div className='no-background'>
                <h2>
                    Java
                </h2>
                <Filtered list={list.filter(e=>e.language==="Java" || e.language==="java")}/>
            </div>
            <div className='no-background'>
                <h2>
                    JavaScript
                </h2>
                <Filtered list={list.filter(e=>["JavaScript", "javascript", "Javascript"].includes(e.language) )}/>
            </div>
            <div className='no-background'>
                <h2>
                    Other
                </h2>
                <Filtered list={list.filter( e=> !["python", "Python", "java", "Java" ,"JavaScript", "javascript", "Javascript"].includes(e.language)  ) }/>
            </div>
            </>
        }
        </>
    )
}

export default Projects