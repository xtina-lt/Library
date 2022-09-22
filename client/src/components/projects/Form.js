import React, {useState} from "react"
import axios from "axios"

const Form = ({ list, setList, projects, setProjects, old, submit }) => {
    const [likeId, setLikeId] = useState('')
    const [item, setItem] = useState( 
        (old && old.hasOwnProperty('node_id')) 
        ? 
        {gitId: old.id, name: old.name.replace("-", " ").replace("_", " "), language: old.language, desc: old.description, categories: old.topics, gitUrl: old.git_url, url: old.homepage} 
        :
        (old)
        ?
        old
        : 
        {gitId: '', name: '', language: '', desc: '', categories: [], gitUrl: '', url: ''} )
    const[success, setSuccess] = useState(false);

    const handleUpdate = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/project/${item._id}`, item)
            .then( res => {setSuccess(true)} )
            .catch( res => console.log(res.data.errors))
    }



    const handleCreate = e => {
        // CREATE LIKE
        e.preventDefault()
        axios.post('http://localhost:8000/api/likes/create', {desc: item.name, url: '/projects', users: []})
            // pass like data to create the project with
            .then( res => {createProj(res.data._id);} ) 
            .catch( res => console.log('error creating like') )
        console.log(likeId)

    }

    const createProj = e => {
        // USE LIKE TO CREATE PROJECT
        console.log('create2', e)
        axios.post('http://localhost:8000/api/project/create', {...item, likeId: e})
            .then( res => { 
                console.log('created:', res.data)
                // update list by giving all elements 
                // that don't have the same git id as created ite,
                setList( list.filter( e => e.gitId !== item.gitId) );
                // add created tdata to projects
                setProjects( [...projects, res.data._id] ) 
            } )
            .catch( res => console.log(res.data.errors))
        }  

    return(
        <form onSubmit={(submit === 'Create') ?  handleCreate : handleUpdate} key={(old) ? old._id : null}>        
            {success && <span className='accent'>Success!<br/></span>}
        <label>
            Github ID:
            <input type="number" value={item.gitId} onChange={ e => setItem({...item, gitId: e.target.value}) }/>
        </label>
        <label>
            Name:
            <input type="text" value={item.name} onChange={ e => setItem({...item, name: e.target.value}) } />
        </label>
        <label>
            Language:
            <input type="text" value={item.language} onChange={ e => setItem({...item, language: e.target.value}) } />
        </label>
        <label>
            Description:
            <input type="text" value={item.desc} onChange={ e => setItem({...item, desc: e.target.value}) } />
        </label>
        <label>
            Url:
            <input type="text" value={item.gitUrl} onChange={ e => setItem({...item, gitUrl: e.target.value}) }/>
        </label>
        <label>
            Deploy Url:
            <input type="text" value={item.url} onChange={ e => setItem({...item, url: e.target.value}) }/>
        </label>
        <label>
            Categories:
            <input type="text" value={item.categories.join(',').replaceAll('-', ' ').replaceAll('_', ' ')} onChange={ e => setItem({...item, categories : e.target.value.split(',')}) }/>
        </label>
        <input type="submit" value={submit || 'Create'}/>
        </form>
    )
}

export default Form