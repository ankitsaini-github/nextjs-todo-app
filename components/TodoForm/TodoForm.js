import classes from './TodoForm.module.css'

export default function TodoForm(){
  function submitHandler(e){
    e.preventDefault();
    
  }
  return(
      <form className={classes.todoform} onSubmit={submitHandler}>
        <label for='newtodo'>Add new Todo : </label>
        <input type="text" id="newtodo"/>
        <button type='submit'>Add</button>
      </form>
  )
}