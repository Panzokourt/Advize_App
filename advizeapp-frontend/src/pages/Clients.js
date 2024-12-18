import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: "", email: "", vat: "", phone: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/clients`, newClient);
      fetchClients();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clients</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Client
        </button>
      </div>
      <input
        type="text"
        placeholder="Search clients..."
        className="w-full mt-4 mb-2 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full mt-4 border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">VAT</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.vat}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">
                <button className="text-yellow-500 hover:underline">Edit</button> |{" "}
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-1/3">
            <h3 className="text-xl mb-4">Add Client</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-2 p-2 border rounded"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="VAT"
              className="w-full mb-2 p-2 border rounded"
              value={newClient.vat}
              onChange={(e) => setNewClient({ ...newClient, vat: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full mb-2 p-2 border rounded"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Clients;
