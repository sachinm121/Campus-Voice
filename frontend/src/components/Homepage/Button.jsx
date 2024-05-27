import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active, linkto}) => {
  return (
    <div>
        <Link className={`text-center text-[16px] text-black p-2 rounded-md bg-gray-400`} to={linkto}>
            {children}
        </Link>
    </div>
  )
}

export default Button