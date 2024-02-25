import classes from './TodoList.module.css'

export default function TodoList(props){
  function doneHandler(){
    
  }
  function deleteHandler(){
    
  }
  return(
    <div className={classes.todocontainer}>
      <ul className={classes.todolist}>
        {props.todos ?
          props.todos.map((todo)=>(
            <li key={todo.id}>
              {!props.completed && <button onClick={doneHandler}>DONE</button>}
              <p>{todo.title}</p>
              <button onClick={deleteHandler}>Delete</button>
            </li>
          )) : <h3>No Todos Found</h3>
        }
      </ul>
    </div>
  )
}