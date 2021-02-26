import React, { useState, useEffect } from 'react'
import { isEmpty, size } from 'loadsh'
import {addDocument, getCollection, updateDocument, deleteDocument} from './actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, seEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    ( async () => {
      const result = await getCollection("task") 
      if (result.statusResponse) {
        setTasks(result.data)
      }        
    })()
  }, [])

  const editTask = (theTask) => {
    setTask(theTask.name)
    seEditMode(true)
    setId(theTask.id)

  }

  const validForm = () => {
    let isValid = true;
    setError(null)
    if (isEmpty(task)) {
      setError("Debes ingresar una tarea")
      isValid = false
    }
    return isValid
  }
  const addTask = async (e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result = await addDocument("task", {name: task})

    if(!result.statusResponse)
    {
      setError(result.error)
      return
    }

    setTasks([...tasks, {id: result.data.id, name: task}])
    setTask("")
  }

  const saveTask = async (e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result = await updateDocument('task', id, {name: task})

    if (!result.statusResponse)
    {
      setError(result.error)
      return
    }

    setTasks(tasks.map(x => x.id === id ? { id, name: task } : x))

    //setTasks([...tasks, newTask])
    seEditMode(false)
    setId("")
    setTask("")
  }

  const deleteTask = async (id) => {
    const result = await deleteDocument('task', id)
    
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setTasks(tasks.filter(x => x.id != id))
  }

  return (
    <div className="container mt-5">
      <h1>Task</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Task List</h4>
          {
            size(tasks) === 0 ? (
              <li className="list-group-item">there are no scheduled tasks yet</li>
            ) : (
                <ul className="list-group">
                  {
                    tasks.map((task) => (
                      <li className="list-group-item" key={task.id}>
                        <spam className="lead">{task.name}</spam>
                        <button
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => deleteTask(task.id)}
                        >Delete
              </button>
                        <button
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editTask(task)}
                        >Edit
              </button>
                      </li>))
                  }
                </ul>)
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modify Task" : "Add Task"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            {
              error && <spam className="text-danger mb-2">{error}</spam>
            }
            <input type="text"
              className="form-control mb-2"
              placeholder="Insert task..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            ></input>

            <button
              className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
              type="submit">
              {editMode ? "Save" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;