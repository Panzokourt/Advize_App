import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", status: "Pending", dueDate: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ανάκτηση εργασιών
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Προσθήκη ή Ενημέρωση εργασίας
  const handleAddTask = async () => {
    try {
      if (isEditMode && selectedTask) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks/${selectedTask.id}`, newTask);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`, newTask);
      }
      fetchTasks();
      resetModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Επεξεργασία εργασίας
  const handleEditTask = (task) => {
    setIsEditMode(true);
    setSelectedTask(task);
    setNewTask({ name: task.name, status: task.status, dueDate: task.dueDate });
    setIsModalOpen(true);
  };

  // Διαγραφή εργασίας
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Επαναφορά Modal
  const resetModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedTask(null);
    setNewTask({ name: "", status: "Pending", dueDate: "" });
  };

  // Φιλτράρισμα εργασιών
  const filteredTasks = tasks.filter(task =>
    task?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full mt-4 mb-2 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full mt-4 border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Task Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{task.name}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    task.status === "Completed"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="p-2">{task.dueDate}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEditTask(task)}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </button>
                {" | "}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-1/3">
            <h3 className="text-xl mb-4">{isEditMode ? "Edit Task" : "Add Task"}</h3>
            <input
              type="text"
              placeholder="Task Name"
              className="w-full mb-2 p-2 border rounded"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={resetModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;
