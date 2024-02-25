import Head from "next/head";
import TodoList from "../../components/TodoList/TodoList";

export default function CompletedTaskPage(){
  return <>
    <Head>
      <title>Completed Task</title>
      <meta name="description" content="These task are completed, Well done !!"/>
    </Head>
    <h1>Completed Task : </h1>
    <TodoList todos={[]} completed={true}/>
  </>
}