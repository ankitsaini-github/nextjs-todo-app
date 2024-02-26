import classes from './TodoForm.module.css'
import { useState } from 'react';

export default function TodoForm(props){
  const initialvalue=props.addForm?'':props.edittodo.title;
  const [todotitle,settodotitle]=useState(initialvalue);

  async function submitHandler(e){
    e.preventDefault();
    if(todotitle.trim(' ').length===0)
    {
      settodotitle('')
      return; 
    }
    if(props.addForm)
    {const newtodo={
      title:todotitle,
      completed:false,
    }
    props.onSubmit(newtodo)}
    else{
      try {
        const res=await fetch('/api/todos/'+props.edittodo._id,{
          method:'PUT',
          body: JSON.stringify({
            ...props.edittodo,
            title:todotitle,
          }),
          headers:{
            'Content-Type':'application/json',
          }
        })
        const data=await res.json();
        console.log(data);
        props.onEdit();
        props.closeForm();
      } catch (error) {
        console.log('error while updating : ',error)
      }
    }
    settodotitle('')
  }

  return(
      <form className={classes.todoform} onSubmit={submitHandler}>
        <label htmlFor='newtodo'>{props.addForm ?'Add new Todo : ':'Edit Todo : '}</label>
        <input type="text" id="newtodo" value={todotitle} onChange={(e)=>settodotitle(e.target.value)} placeholder='Todo Title...'/>
        <button type='submit'>{props.addForm?'Add':'Update'}</button>
      </form>
  )
}