import React from 'react'
import gitLogo from '../../images/git-link.png'
// import gitLogoWhite from '../../images/git-link-white.png'
import './Footer.css'


function Footer(){
    // console.log(props.location.pathname)
    return(
        <footer className='App-Footer'>
            <div className='credits'>
        <h2 >Credits:</h2>
        <p>This app utilizes the following Artificial Intelligence API's : <br/> <a href='https://www.ibm.com/watson/services/tone-analyzer/'> IBM Watson Tone Analyzer</a> <br/>
        <a href='https://azure.microsoft.com/en-us/services/cognitive-services/face/'>Microsoft Azure Face </a>
         </p>
            </div>
            <div className='creators'>

        <h2> Created by:</h2>
          <p className='creators1'>Silas Hallahan <a href='https://github.com/Loxphordex'> <img className='gitLogo' src={gitLogo} alt='git-hub-logo'/></a></p>         
        <p className='creators2'>Scott C. Williams <a href='https://github.com/ollk'> <img className='gitLogo' src={gitLogo} alt='git-hub-logo'/></a></p> 
        <p className='creators3'>Enrique Montemayor <a href='https://github.com/eemontemayor'> <img className='gitLogo' src={gitLogo} alt='git-hub-logo'/></a></p> 
            </div>
    
        </footer>
    )
}
export default Footer;