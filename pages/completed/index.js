import TodoList from "../../components/TodoList/TodoList";

export default function CompletedTaskPage(){
  return <>
    <h1>Completed Task : </h1>
    <TodoList completed={true}/>
  </>
}