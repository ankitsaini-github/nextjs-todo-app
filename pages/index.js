import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
const dummy=[
  {id:111,title:'Learn DSA',completed:false},
  {id:133,title:'play Game',completed:false},
  {id:122,title:'Buy Grocery',completed:false}
]

export function getStaticProps(){
  return {
    props:{
      todos:dummy,
    }
  }
}

export default function HomePage(props) {
  return (
    <>
      <h1>Welcome to TODO-APP !!</h1>
      <TodoForm />
      <h1>Task to do:</h1>
      <TodoList todos={props.todos} completed={false}/>
    </>
  );
}
