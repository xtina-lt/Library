import React, {useEffect, useState} from "react"
import axios from "axios"
import Form from "./Form"

const ProjectsAdmin = ({id}) => {
    // initialize state to hold projects from db
    const [projects, setProjects] = useState([])
    // initialize state to hold git repos
    const [list, setList] = useState([])
    // obtain prjects
    const getProjects = async() => {
        const res = await axios.get('http://localhost:8000/api/projects');
        setProjects(res.data.map(e=>e.gitId))
        console.log('im in get projects')
    }
    // filter out repos that aren't in projects
    useEffect( ()=>{
        ////GITHUB
        getProjects();
        axios.get(`https://api.github.com/users/xtina-lt/repos`)
            .then( res => { 
                console.log('projects: ', projects.length + projects)
                console.log('res.data.length:', res.data.length)
                console.log( 'filtered: ', res.data.filter( e=> projects.includes(e.id.toString() )) );
                setList( res.data.filter( e=> !projects.includes(e.id.toString() )) )
            } )
            .catch( res => console.log('something wrong') )
    },[] ) // make sure to stop effect, so as to not go over git request max

    return(
        <>
        <div>
            Projects {projects.length}
            <br/>
            {projects.map(e=> e + ', ')}
            <br/>
            list: {list.length}
        </div>
            {
                (list.length>0) ?
                <div className="container">
                    {list.map( (obj, i) =>
                    <div>
                        <h2>
                            Create
                        </h2>
                        <Form list={list} setList={setList} projects={projects} setProject={setProjects} old={obj} submit={'create'}/>
                    </div>
                )}
                </div>
                :
                <div>
                    <Form list={list} setList={setList} old={null} projects={projects} setProject={setProjects}/>
                </div>
            }
        </>
    )
}

export default ProjectsAdmin