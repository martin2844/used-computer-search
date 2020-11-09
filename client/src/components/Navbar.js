import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <section className="nav">
         
               <Link href="/"><a>Home</a></Link>
               <Link href="/differences"><a>Differences</a></Link>
         
     </section> 
    )
}

export default Navbar
