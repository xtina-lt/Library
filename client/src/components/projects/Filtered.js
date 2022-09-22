import React, {useState} from 'react'
import LikeIcon from '../likes/LikeIcon'

const Filtered = ({list}) => {
    return (
        <>
            {list.map( (obj, i) =>
                <div key={i}>
                    <h2>
                        {obj.name}
                    </h2>
                    Language: 
                    <span className='accent'>
                    {(obj.language) ? obj.language : "n/a"}
                    </span>
                    <br/>
                    Description: 
                    <br/>
                    <span className='small-text'>
                        {
                            (obj.desc)
                            ?
                            <span className="small-text">
                                {obj.desc}
                            </span>
                            :
                            <span className="small-text">
                                To be continued...
                            </span>
                        }
                    </span>
                    <br/>
                    Categories: 
                    <br/>
                    {
                        (obj.categories.length > 0)
                        ?
                        <span className="small-text">
                            {obj.categories.join(', ')}
                        </span>
                        :
                        <span className="small-text">
                            None yet...
                        </span>
                    }
                    {/* if url */}
                    {
                        (obj.url)
                        ?
                        <>
                        <br/>
                        <button className='fancy-btn'>
                            <a href={obj.url} target="_blank" rel="noreferrer">
                                Deployed Site {obj.url}
                            </a>
                        </button>
                        </>
                        :
                        null
                    }
                    <button className='fancy-btn'>
                        <a href={obj.gitUrl} target="_blank" rel="noreferrer">
                            GitHub {obj.gitUrl}
                        </a>
                    </button>
                    <LikeIcon id={obj.likeId}/>
                </div>
            )}
        </>
    )
}

export default Filtered