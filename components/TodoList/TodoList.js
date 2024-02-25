import classes from './TodoList.module.css'

export default function TodoList(props){
  function doneHandler(id){
    props.completetodo(id)
    console.log(id)
  }
  function deleteHandler(){
    
  }
  return(
    <div className={classes.todocontainer}>
      <ul className={classes.todolist}>
        {props.todos ?
          props.todos.filter(todo=>todo.completed===props.completed).map((todo)=>(
            <li key={todo.id}>
              {!todo.completed && <button onClick={doneHandler.bind(null,todo.id)}>DONE</button>}
              <p>{todo.title}</p>
              <button onClick={deleteHandler}>Delete</button>
            </li>
          )) : <h3>No Todos Found</h3>
        }
      </ul>
    </div>
  )
}