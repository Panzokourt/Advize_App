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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rightPanelTask, setRightPanelTask] = useState(null);

  // Φόρτωση εργασιών και πελατών
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

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

  // Αποθήκευση εργασίας
  const handleSaveTask = async (taskId) => {
    try {
      const updatedTask = tasks.find((task) => task.id === taskId);
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks/${taskId}`, updatedTask);
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
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

  const handleFieldChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, [field]: value } : task))
    );
  };

  return (
    <div className="flex">
      {/* Πίνακας Εργασιών */}
      <motion.div className="p-4 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        <table className="w-full border shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Client</th>
              <th className="p-2">Status</th>
              <th className="p-2">Deadline</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  {editingTaskId === task.id ? (
                    <input
                      value={task.title}
                      onChange={(e) => handleFieldChange(task.id, "title", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveTask(task.id)}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => setEditingTaskId(task.id)}>{task.title}</span>
                  )}
                </td>
                <td className="p-2">
                  {clients.find((client) => client.id === task.client_id)?.name || "N/A"}
                </td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{task.deadline}</td>
                <td className="p-2">
                  <button onClick={() => setRightPanelTask(task)} className="text-blue-500 mr-2">
                    View
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Right Panel */}
      {rightPanelTask && (
        <motion.div
          className="w-1/3 p-4 fixed right-0 top-0 h-full bg-white border-l shadow-lg"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
        >
          <h3 className="text-xl font-bold mb-4">Task Details</h3>
          <p><strong>Title:</strong> {rightPanelTask.title}</p>
          <p><strong>Description:</strong> {rightPanelTask.description}</p>
          <p><strong>Client:</strong> {clients.find((c) => c.id === rightPanelTask.client_id)?.name || "N/A"}</p>
          <p><strong>Status:</strong> {rightPanelTask.status}</p>
          <p><strong>Deadline:</strong> {rightPanelTask.deadline}</p>
          <button
            onClick={() => setRightPanelTask(null)}
            className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </motion.div>
      )}

      {/* Modal για Προσθήκη Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-1/3">
            <h3 className="text-xl mb-4">Add Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 px-4 py-2 rounded text-white">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
