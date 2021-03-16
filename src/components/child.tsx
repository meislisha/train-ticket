
import React,{useContext}from 'react'
import {ThemeContext} from '../App.jsx'
export default function Child(){
const theme = useContext(ThemeContext)
  return (
    <div>
theme:{theme}
    </div>
  )

}