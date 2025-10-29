import { useState } from "react";

const TodoItem = ({ task, toggleDone, removeTask, updateTask }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEdit = () => {
    if (editing) {
      if (!text.trim()) removeTask(task.id);
      else updateTask(task.id, text.trim());
    }
    setEditing(!editing);
  };

  return (
    <li className={`todo-item ${task.done ? 'completed' : ''}`}>
      <div className="left" onClick={() => toggleDone(task.id)}>
        <div className={`checkbox ${task.done ? 'checked' : ''}`}></div>
        {editing ? (
          <input
          className=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            onBlur={handleEdit}
            autoFocus
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>
      <div className="actions">
        <button onClick={handleEdit}>✏️</button>
        <button onClick={() => removeTask(task.id)}>🗑️</button>
      </div>
    </li>
  );
}
export default TodoItem