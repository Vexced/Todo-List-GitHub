import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    const res = await fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const toggleDone = async (id, done) => {
    await fetch(`http://localhost:4000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done }),
    });
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: !done } : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4000/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Nueva tarea"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2 ml-2">Agregar</button>
      </div>
      <ul>
        {todos.map(({ id, task, done }) => (
          <li key={id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleDone(id, done)}
              className="mr-2"
            />
            <span className={`${done ? 'line-through text-gray-400' : ''} flex-grow`}>{task}</span>
            <button onClick={() => deleteTodo(id)} className="text-red-500 ml-2">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
