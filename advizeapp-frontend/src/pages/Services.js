import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "", price: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/services`, newService);
      fetchServices();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Service
        </button>
      </div>
      <table className="w-full mt-4 border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Service Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{service.name}</td>
              <td className="p-2">{service.description}</td>
              <td className="p-2">{service.price}</td>
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
            <h3 className="text-xl mb-4">Add Service</h3>
            <input
              type="text"
              placeholder="Service Name"
              className="w-full mb-2 p-2 border rounded"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full mb-2 p-2 border rounded"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full mb-2 p-2 border rounded"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
