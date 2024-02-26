import TodoForm from "../TodoForm/TodoForm";
import classes from "./TodoList.module.css";
import { useState } from "react";

export default function TodoList(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [editedtodo,seteditedtodo]=useState({});

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      setShowEdit(false);
    }
  }
  function doneHandler(todo) {
    props.completetodo(todo);
    console.log(todo._id);
  }
  function editHandler(todo) {
    setShowEdit(true);
    seteditedtodo(todo);
    console.log("edit:", todo._id);
  }
  function deleteHandler(todo) {
    console.log("delete:", todo._id);
  }
  return (
    <>
      <div className={classes.todocontainer}>
        {showEdit && (
            <div className={classes.modaloverlay} onClick={closeModal}>
              <div className={classes.modal}>
                <TodoForm addForm={false} edittodo={editedtodo} closeForm={()=>setShowEdit(false)} onEdit={props.onEdit}/>
              </div>
            </div>
        )}
        <ul className={classes.todolist}>
          {props.todos ? (
            props.todos
              .filter((todo) => todo.completed === props.completed)
              .map((todo) => (
                <li key={todo._id}>
                  {!todo.completed && (
                    <button onClick={doneHandler.bind(null, todo)}>DONE</button>
                  )}
                  <p>{todo.title}</p>
                  <span>
                    <button onClick={editHandler.bind(null, todo)}>Edit</button>
                    <button onClick={deleteHandler.bind(null, todo)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))
          ) : (
            <h3>No Todos Found</h3>
          )}
        </ul>
      </div>
    </>
  );
}
