import Head from "next/head";
import {MongoClient} from "mongodb";
import TodoList from "../../components/TodoList/TodoList";
import { useState } from "react";

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
          _id: todo._id.toString(),
        })),
      },
      revalidate:1,
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default function CompletedTaskPage(props){
  const [todos,settodos]=useState(props.todos)
  async function fetchtodos(){
    try {
      const response = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      console.log('fetched:',data);
      
      settodos(data.todos)
    } catch (error) {
      console.log(error)
    }
  }
  return <>
    <Head>
      <title>Completed Task</title>
      <meta name="description" content="These task are completed, Well done !!"/>
    </Head>
    <h1>Completed Task : </h1>
    <TodoList todos={todos} completed={true} onEdit={()=>{fetchtodos();}} onDelete={()=>fetchtodos()}/>
  </>
}