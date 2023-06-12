import React, { useState } from 'react'
import { usePost } from '../hooks/usePost'

export default function CreatePost() {
    const [name, setName] = useState('')
    const { result, postData } = usePost('https://jsonplaceholder.typicode.com/todos')
    const handleSubmit = (e) =>{
     e.preventDefault();
     postData({
        title:name
    })
    console.log(name)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>postData(name)}>create post</button>
        </form>
     
      <div>
      <h1>{result?.title}</h1>
      </div>
    </div>
  )
}
