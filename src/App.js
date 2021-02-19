import React, {useState}from 'react'
import { isEmpty } from 'loadsh'
import shortId from 'shortid'

function App() {
   const [task, setTask] = useState("")
   const [tasks, setTasks] = useState([])

   const addTask =(e) => {
     e.preventDefault()
     if(isEmpty(task))
     {
        console.log("Task empty")
        return
     }
     
     const newTask =
     {
        id:shortId.generate(),
        name: task 
     }

     setTasks([...tasks, newTask])
     setTask("")
   }

  return (
    <div className="container mt-5">
      <h1>Task</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Task List</h4>
          <ul className="list-group">
{
  tasks.map((task) => (
            <li className="list-group-item" key={task.id}>
              <spam className="lead">{task.name}</spam>
              <button className="btn btn-danger btn-sm float-right mx-2">Delete</button>
              <button className="btn btn-warning btn-sm float-right">Edit</button>
            </li>))
}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Form</h4>
          <form onSubmit={addTask}>
            <input type="text" 
            className="form-control mb-2" 
            placeholder="Insert task..."
            onChange={(text) => setTask(text.target.value)}  
            value={task}
            ></input>
            <button 
            className="btn btn-dark btn-block"
            type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;