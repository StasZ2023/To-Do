import { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
export default function TodoApp() {
  const storageKey = "todo-react-css";
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(storageKey) || "[]"));
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    const task = { id: Date.now(), text, done: false, createdAt: Date.now() };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const removeTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleDone = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const updateTask = (id, text) => setTasks(tasks.map((t) => (t.id === id ? { ...t, text } : t)));
  const clearCompleted = () => setTasks(tasks.filter((t) => !t.done));

  const filtered = tasks.filter((t) => {
    if (filter === "active" && t.done) return false;
    if (filter === "completed" && !t.done) return false;
    if (query && !t.text.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="controls">
          <div className="add-task">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Задача"
            />
            <button onClick={addTask} className="btn-primary">+</button>
          </div>

          <div className="tools">
            <input
              type="text"
              placeholder="Поиск..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search"
            />
            <div className="filters">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`filter ${filter === f ? 'active' : ''}`}
                >
                  {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="todo-list">
          {filtered.length === 0 && <li className="empty">Нет задач</li>}
          {filtered.map((task) => (
            <TodoItem key={task.id} task={task} toggleDone={toggleDone} removeTask={removeTask} updateTask={updateTask} />
          ))}
        </ul>

        <footer className="footer">
          <div>{remaining} задач{ remaining === 0 ? '' : remaining === 1 ? 'а': remaining <= 4 ? 'и':''}</div>
          <button onClick={clearCompleted} className="btn-clear">Очистить выполненные</button>
        </footer>
      </div>
    </div>
  );
}

