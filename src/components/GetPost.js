import React from 'react'
import { useGet } from '../hooks/useGet'

export default function GetPost() {
    const {data:todo} = useGet('https://jsonplaceholder.typicode.com/todos')
  return (
    <div>
      {todo && todo.slice(0,10).map((d)=><p key={d.title}>{d.title}</p>)}
    </div>
  )
}
