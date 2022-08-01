import React from 'react'

const Nav = props => {
    const links = [{name: 'Home', url: '/'}, {name: 'GitHub', url: 'https://github.com/xtina-lt'}]
    return(
        <nav>
            {links.map((e, i)=>
                <a key={i} href={e.url}>
                    {e.name}
                </a>
            )}
        </nav>
    )
}

export default Nav