import { useState, useEffect } from "react";
import "./App.css";

import Modalform from "./Component/Modalform";
import axios from "axios";
import Navbar from "./Component/Navbar";
import Tablelist from "./Component/Tablelist";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchItem, setSearchItem] = useState("");
  const [clientData, setClientData] = useState(null);
  const [clients, setClients] = useState([]);

  const refreshData = async () => {
    const response = await axios.get("http://localhost:3000/api/clients");
    setClients(response.data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleOpen = (mode, client = null) => {
    setModalMode(mode);
    setClientData(client);
    setIsOpen(true);
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchItem} />
      <Tablelist handleOpen={handleOpen} searchItem={searchItem} />
      <Modalform isOpen={isOpen} onClose={() => setIsOpen(false)} mode={modalMode} clientData={clientData} refreshData={refreshData} />
    </>
  );
}

export default App;
