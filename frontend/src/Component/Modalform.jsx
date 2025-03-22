import { useState, useEffect } from "react";
import axios from "axios";

export default function Modalform({ isOpen, onClose, mode, clientData, refreshData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.inactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [mode, clientData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = { name, email, job, rate, inactive: status };

    try {
      if (mode === "edit") {
        await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClient);
      } else {
        await axios.post("http://localhost:3000/api/add-clients", newClient);
      }
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">
          {mode === "edit" ? "Edit Client" : "Add Client"}
        </h3>
        <form onSubmit={handleSubmit}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            Name
            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            Email
            <input type="email" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            Job
            <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} required />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            Rate
            <input type="text" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} required />
          </label>
          <select onChange={(e) => setStatus(e.target.value === "Inactive")} value={status ? "Inactive" : "Active"} className="select select-bordered w-full mb-4">
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="btn btn-success" type="submit">
            {mode === "edit" ? "Save Changes" : "Add Client"}
          </button>
        </form>
      </div>
    </dialog>
  );
}
