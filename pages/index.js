import Head from "next/head";
import { MongoClient } from "mongodb";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import { useState } from "react";

// const dummy=[
//   {id:111,title:'Learn DSA',completed:false},
//   {id:133,title:'play Game',completed:false},
//   {id:122,title:'Buy Grocery',completed:false}
// ]

export async function getStaticProps(){
  let todos=[];
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const db = client.db("todos");
    todos = await db.collection("todoscollection").find({}).toArray();

    client.close();
    return {
      props:{
        todos:todos.map((todo) => ({
          title: todo.title,
          completed:todo.completed,
          id: todo._id.toString(),
        })),
      },
      revalidate:1,
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default function HomePage(props) {
  const [todos,settodos]=useState(props.todos);

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
