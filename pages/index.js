import Head from "next/head";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import { useState } from "react";
const dummy=[
  {id:111,title:'Learn DSA',completed:false},
  {id:133,title:'play Game',completed:false},
  {id:122,title:'Buy Grocery',completed:false}
]

// export function getStaticProps(){
//   return {
//     props:{
//       todos:dummy,
//     }
//   }
// }

export default function HomePage(props) {
  const [todos,settodos]=useState(dummy);

  async function addtodoHandler(todo){ 
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      console.log(data);
      settodos(prev=>[...prev,todo])
    } catch (error) {
      console.log(error)
    }
    // settodos(prev=>[...prev,todo])
  }

  function completeHandler(id){
    const todoindex=todos.findIndex(i=>i.id===id)
    const todo=todos.find(i=>i.id===id)
    todo.completed=true;
    const updatedtodos=[...todos]
    updatedtodos[todoindex]=todo;
    settodos(updatedtodos);
  }
  return (
    <>
      <Head>
        <title>Todo-app</title>
        <meta name="description" content="Todo App where you can list all your task and complete them"/>
      </Head>
      <h1>Welcome to TODO-APP !!</h1>
      <TodoForm addtodo={addtodoHandler}/>
      <h1>Task to do:</h1>
      <TodoList todos={todos} completed={false} completetodo={completeHandler}/>
    </>
  );
}
