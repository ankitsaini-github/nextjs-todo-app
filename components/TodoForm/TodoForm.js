import classes from './TodoForm.module.css'

export default function TodoForm(props){
  function submitHandler(e){
    e.preventDefault();
    const newtodo={
      id:Math.random(),
      title:e.target.newtodo.value,
      completed:false,
    }
    props.addtodo(newtodo)
    e.target.newtodo.value=''
  }
  return(
      <form className={classes.todoform} onSubmit={submitHandler}>
        <label htmlFor='newtodo'>Add new Todo : </label>
        <input type="text" id="newtodo"/>
        <button type='submit'>Add</button>
      </form>
  )
}