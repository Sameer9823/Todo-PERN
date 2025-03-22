import axios from "axios";
import { useEffect, useState } from "react";

export default function Tablelist({ handleOpen, searchItem }) {
  const [tbData, setTbData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clients");
        setTbData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/clients/${id}`);
      setTbData(tbData.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client.");
    }
  };

  const filteredData = tbData.filter((client) =>
    client.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <h1 className="text-2xl font-semibold">Clients</h1>
      <div className="overflow-x-auto mt-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((client, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.job}</td>
                <td>{client.email}</td>
                <td>{client.rate}</td>
                <td>{client.inactive ? "Inactive" : "Active"}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpen("edit", client)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error ml-2"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
