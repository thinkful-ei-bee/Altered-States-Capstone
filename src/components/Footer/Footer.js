import React from 'react'
import gitLogo from '../../images/git-link.png'
import gitLogoWhite from '../../images/git-link-white.png'
import './Footer.css'
function Footer(){
    return(
        <div className='App-Footer'>
            <div className='credits'>
        <h2 >Credits</h2>

            </div>
            <div className='creators'>

        <h2> Creators</h2>

        <p className='creators1'>Silas Hallahan</p> <a href='https://github.com/Loxphordex'> <img className='gitLogo' src={gitLogo} alt='git-hub-logo'/></a>
        <p className='creators2'>Scott Williams</p> <a href='https://github.com/ollk'> <img className='gitLogo' src={gitLogo} alt='git-hub-logo'/></a>
        <p className='creators3'>Enrique Montemayor</p> <a href='https://github.com/eemontemayor'> <img className='gitLogo' src={gitLogo} alt='git-hub-logo'/></a>
            </div>
    
        </div>
    )
}
export default Footer;