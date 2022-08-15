import React, {useState} from "react"
import axios from "axios"

const Form = ({ list, setList, old, submit }) => {
    const [item, setItem] = useState( old || {name: '', desc: '', url: '', price: ''} )
    const[success, setSuccess] = useState(false);

    const handleUpdate = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/gifshop/${item._id}`, item)
            .then( e => {setSuccess(true)} )
            .catch( e => console.log('wrong'))
    }

    const handleCreate = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/gifshop/create', {...item, users: []})
            .then( e => { setList([...list, e.data]);
                            setItem({name: '', desc: '', url: '', price: ''});
            } )
            .catch( e => console.log('wrong'))
    }

    return(
        <form onSubmit={(old) ? handleUpdate : handleCreate} >        
            {success && <span className='accent'>Success!<br/></span>}
        <label>
            Name:
            <input type="text" value={item.name} onChange={ e => setItem({...item, name: e.target.value}) } />
        </label>
        <label>
            Description:
            <input type="text" value={item.desc} onChange={ e => setItem({...item, desc: e.target.value}) } />
        </label>
        <label>
            Url:
            <input type="text" value={item.url} onChange={ e => setItem({...item, url: e.target.value}) }/>
        </label>
        <label>
            Price:
            <input type="text" value={item.price} onChange={ e => setItem({...item, price: e.target.value}) }/>
        </label>
        <input type="submit" value={submit || 'Create'}/>
        </form>
    )
}

export default Form