import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
    client_id: "",
    employee_id: 1,
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State για modal

  // Φόρτωση εργασιών
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Φόρτωση πελατών
  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchClients();
  }, []);

  // Αποθήκευση νέας εργασίας
  const handleSaveNewTask = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`, newTask);
      fetchTasks();
      resetModal();
    } catch (error) {
      console.error("Error saving task:", error.response ? error.response.data : error.message);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      status: "Pending",
      deadline: "",
      client_id: "",
      employee_id: 1,
    });
  };

  // Αποθήκευση αλλαγών μέσω inline editing
  const handleSaveEdit = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks/${taskId}`, taskToUpdate);
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleFieldChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <table className="w-full border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Client</th>
            <th className="p-2">Status</th>
            <th className="p-2">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleFieldChange(task.id, "title", e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(task.id)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setEditingTaskId(task.id)}>{task.title}</span>
                )}
              </td>
              <td className="p-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={task.description || ""}
                    onChange={(e) => handleFieldChange(task.id, "description", e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(task.id)}
                  />
                ) : (
                  <span onClick={() => setEditingTaskId(task.id)}>
                    {task.description || "No description"}
                  </span>
                )}
              </td>
              <td className="p-2">{clients.find((c) => c.id === task.client_id)?.name || "N/A"}</td>
              <td className="p-2">
                {editingTaskId === task.id ? (
                  <select
                    value={task.status}
                    onChange={(e) => handleFieldChange(task.id, "status", e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span onClick={() => setEditingTaskId(task.id)}>{task.status}</span>
                )}
              </td>
              <td className="p-2">
                {editingTaskId === task.id ? (
                  <input
                    type="date"
                    value={task.deadline || ""}
                    onChange={(e) => handleFieldChange(task.id, "deadline", e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                  />
                ) : (
                  <span onClick={() => setEditingTaskId(task.id)}>{task.deadline}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal για Προσθήκη Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-1/3">
            <h3 className="text-xl mb-4">Add Task</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-2 p-2 border rounded"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full mb-2 p-2 border rounded"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
            <select
              className="w-full mb-2 p-2 border rounded"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={handleSaveNewTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save
            </button>
            <button onClick={resetModal} className="ml-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;
