import React from 'react'

const Header = ({imgsrc, imgwidth, imgheight, alttext}) => {

    return (
        <header>            
            <img src={require('./images/' + imgsrc)} width={imgwidth} height={imgheight} alt={alttext} />          
        </header>

        
    )
}



export default Header
