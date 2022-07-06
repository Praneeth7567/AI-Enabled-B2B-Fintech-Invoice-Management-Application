import * as React from 'react';
import abc_product from '../images/abc_product.svg';
import hrclogo from '../images/hrclogo.svg';

export default function Header(){
    return(
        <div style = {{backgroundColor : "#31414F"}}>
        <img src = {abc_product}  alt = "ABC ProductsLogo" />
        <img className = "hrclogo" src ={hrclogo}  alt = "Highradius Logo" />
        <div className='header_text'>Invoice List</div>
    </div>
    )
}