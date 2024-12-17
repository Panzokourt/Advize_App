import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]); // Λίστα πελατών για dropdown
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
    client_id: "",
    employee_id: 1,
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Αποθήκευση ή Ενημέρωση εργασίας
  const handleAddTask = async () => {
    try {
      const formattedTask = {
        client_id: newTask.client_id,
        employee_id: newTask.employee_id,
        title: newTask.title,
        description: newTask.description,
        deadline: newTask.deadline,
        status: newTask.status,
      };

      if (isEditMode && selectedTask) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks/${selectedTask.id}`, formattedTask);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`, formattedTask);
      }

      fetchTasks();
      resetModal();
    } catch (error) {
      console.error("Error saving task:", error.response ? error.response.data : error.message);
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

  // Επεξεργασία εργασίας
  const handleEditTask = (task) => {
    setIsEditMode(true);
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      client_id: task.client_id,
      employee_id: task.employee_id,
    });
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedTask(null);
    setNewTask({
      title: "",
      description: "",
      status: "Pending",
      deadline: "",
      client_id: "",
      employee_id: 1,
    });
  };

  const filteredTasks = tasks.filter(task =>
    task?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Client</th>
            <th className="p-2">Status</th>
            <th className="p-2">Deadline</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2">{clients.find(client => client.id === task.client_id)?.name || "N/A"}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.deadline}</td>
              <td className="p-2">
                <button onClick={() => handleEditTask(task)} className="text-yellow-500 hover:underline">Edit</button> |{" "}
                <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-1/3">
            <h3 className="text-xl mb-4">{isEditMode ? "Edit Task" : "Add Task"}</h3>
            <select
              className="w-full mb-2 p-2 border rounded"
              value={newTask.client_id}
              onChange={(e) => setNewTask({ ...newTask, client_id: e.target.value })}
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
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
            <div className="flex justify-end space-x-2">
              <button onClick={resetModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
