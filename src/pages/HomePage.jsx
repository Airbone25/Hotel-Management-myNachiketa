import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    const [data,setData] = useState([])
    const [error,setError] = useState()
    useEffect(()=>{
        loadData()
    },[])
    async function loadData(){
        try{
            const res = await fetch("https://testaug.onrender.com/api/staff")
            if(!res.ok){
                throw new Error("Response is not Ok!")
            }
            const recData = await res.json()
            setData(recData.data)
        }catch(error){
            console.error(error)
            setError(error.message)
        }
    }
  return (
    <div>
        <div>Staff Members</div>

        <Link to="/create">Create Staff +</Link>

        <div>
            {data.map((e,i)=>(
                <ul className='staff-cont'>
                    <li><p>{e.fullName}</p><p>{e.email}</p><p>{e.phone}</p><p>{e.role}</p><p>{e.department}</p><p>{e.shift}</p><p>{e.status}</p><p><Link>Edit</Link> | <a>Delete</a></p></li>
                </ul>
            ))}
        </div>

        {error && <div style={{"color": "red"}}>{error}</div>}
    </div>
  )
}
