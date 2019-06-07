import React from 'react'
import {Link} from 'react-router-dom'
import './Button.css'

export default function BackButton(){
    return(
  <Link to='/' className='back-btn'> Back </Link>
    )
}