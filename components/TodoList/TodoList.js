import CheckIcon from "../ui/CheckIcon";
import EditIcon from "../ui/EditIcon";
import TodoForm from "../TodoForm/TodoForm";
import TrashBinIcon from "../ui/TrashBinIcon";
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
  async function deleteHandler(id) {
    try {
      const res=await fetch('/api/todos/'+id,{
        method:'DELETE',
        body:JSON.stringify({id:id}),
        headers:{
          'Content-Type':'application/json',
        }
      })
      const data=await res.json();
      console.log(data)
      props.onDelete();
      
    } catch (error) {
      console.log('error deleting :',error)
    }
    console.log("delete:", id);
  }
  return (
    <>
      <div className={props.completed?classes.completedtodocontainer:classes.todocontainer}>
        {showEdit && (
            <div className={classes.modaloverlay} onClick={closeModal}>
              <div className={classes.modal}>
                <TodoForm addForm={false} edittodo={editedtodo} closeForm={()=>setShowEdit(false)} onEdit={props.onEdit}/>
              </div>
            </div>
        )}
        <ul className={classes.todolist}>
          {props.todos.length>0 ? (
            props.todos
              .filter((todo) => todo.completed === props.completed)
              .map((todo) => (
                <li key={todo._id}>
                  <span>
                    {!todo.completed && (
                      <button onClick={doneHandler.bind(null, todo)} className={classes.todocheck}>
                        <CheckIcon/>
                      </button>
                    )}
                    <p>{todo.title}</p>
                  </span>
                  <span className={classes.btngrp}>
                    <button onClick={editHandler.bind(null, todo)} className={classes.todoedit}>
                      <EditIcon/>
                    </button>
                    <button onClick={deleteHandler.bind(null, todo._id)} className={classes.tododel}>
                      <TrashBinIcon/>
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
