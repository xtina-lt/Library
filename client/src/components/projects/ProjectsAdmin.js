import React, {useEffect, useState} from "react"
import axios from "axios"
import Form from "./Form"

const ProjectsAdmin = ({id}) => {
    const [list, setList] = useState([])
    const [projects, setProjects] = useState([])
    // GET ALL THE PROJECTS IN DATABASE
    useEffect( () => {
        axios.get(`http://localhost:8000/api/projects`)
            .then( res => {setProjects(res.data.map(e=>e.gitId))})
            .catch( res => console.log('failed changed like') )
    }, [])
    // GET ALL THE PROJECTS FROM GITHUB
    // filter out the ones that are saved by github id
    axios.get('https://api.github.com/users/xtina-lt/repos')
        .then( res => { 
            console.log(res.data)
            setList( res.data.filter(e => !projects.includes(e.id.toString())))
        })
        .catch( res => console.log('faled projects', res.data) )

    // const handleDelete = (e, like) => {
    //     e.preventDefault();
    //     var filtered = like.users.filter(e=>e!==id)
    //     // // update like
    //     axios.put(`http://localhost:8000/api/like/${like}`, {...like, users: filtered})
    //         .then( res => console.log('changed like'))
    //         .catch( res => console.log('failed changed like') )
    //     // // changee like
    //     var filteredlist = list.filter(e=>e._id!==like._id)
    //     setList(filteredlist)
    // }

    return(
        <>
        <div>
            list: {list.length}
            <br/>
            projects: {projects.length}
            <br/>
            {projects.map(e=>e + ', ')}
        </div>
            { list.map( (obj, i) =>
                    <div>
                        <h2>
                            Create
                        </h2>
                        <Form list={list} setList={setList} projects={projects} setProject={setProjects} old={obj} submit={'create'}/>
                    </div>
                )}
        </>
    )
}

export default ProjectsAdmin