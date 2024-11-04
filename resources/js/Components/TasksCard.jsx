import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TasksCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    status: task.status,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    Inertia.put(`/tasks/${task.id}`, editedTask, {
      onError: (errors) => {
        setErrors(errors);
        toast.error('Failed to update the task. Please check the form.');
      },
      onSuccess: () => {
        setIsEditing(false);
        toast.success('Task updated successfully!');
      },
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      Inertia.delete(`/tasks/${task.id}`, {
        onSuccess: () => {
          toast.success('Task deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete the task.');
        },
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-2">
      {!isEditing ? (
        <>
          <h2 className="text-lg font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {task.due_date}</p>
          <p className="text-sm text-gray-500 up">
            Status: <span className="uppercase">{task.status}</span>
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-black text-white px-2 py-1 rounded"
              title="Edit Task"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 rounded"
              title="Delete Task"
            >
              <Trash size={16} />
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className={`p-2 border rounded ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            placeholder="Title"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}

          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className={`p-2 border rounded ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            placeholder="Description"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}

          <input
            type="date"
            name="due_date"
            value={editedTask.due_date}
            onChange={handleChange}
            className={`p-2 border rounded ${
              errors.due_date ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.due_date && (
            <span className="text-red-500 text-sm">{errors.due_date}</span>
          )}

          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className={`p-2 border rounded ${
              errors.status ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">{errors.status}</span>
          )}

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TasksCard;
