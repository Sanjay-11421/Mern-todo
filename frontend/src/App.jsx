import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function fetchData() {
    axios
      .get("https://mern-todo-50hg.onrender.com/get")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addTask() {
    if (!task?.trim()) return;
    axios
      .post("https://mern-todo-50hg.onrender.com/create", { task: task })
      .then((data) => {
        console.log(data);
        fetchData();
        setTask("");
      })
      .catch((err) => console.log(err));
  }

  function deleteTask(id) {
    axios
      .delete("https://mern-todo-50hg.onrender.com/delete/" + id)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  }

  function updateTask(id) {
    axios
      .put("https://mern-todo-50hg.onrender.com/update/" + id)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="bg-black text-white h-[100vh] flex justify-center items-center">
      <div>
        <h1 className="text-center font-bold text-4xl ">Todo</h1>
        <div className="mt-10">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter Task"
            className="border border-white/20 p-1 px-2 rounded-md mr-2 focus:outline-0 shadow-sm shadow-white"
          />
          <button
            onClick={addTask}
            className="border cursor-pointer border-white/20 px-2 py-1 rounded-md text-shadow-sm shadow-sm shadow-white text-shadow-white"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="mt-4 text-center shadow-white shadow-sm bg-white/5 rounded-md flex justify-center p-2">
            {" "}
            No Records{" "}
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="mt-4 shadow-white shadow-sm bg-white/5 rounded-md flex justify-between p-2"
            >
              <div className="flex">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => updateTask(todo._id)}
                  className="cursor-pointer"
                />
                {todo.done ? (
                  <h1 className="ml-2  line-through">{todo.task}</h1>
                ) : (
                  <h1 className="ml-2">{todo.task}</h1>
                )}
              </div>

              <button
                onClick={() => deleteTask(todo._id)}
                className="text-red-300 cursor-pointer hover:text-red-400"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
