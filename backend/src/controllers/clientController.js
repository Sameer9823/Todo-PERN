import * as clientService from "../services/clientservices.js";

export const getClients = async (req, res) => {
  try {
    console.log("Fetching clients...");
    const clients = await clientService.getClients();
    console.log("Clients fetched:", clients);

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error in getClients controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    console.log("Creating client...");
    const client = await clientService.createClient(req.body);
    console.log("Client created:", client);

    res.status(201).json(client);
  } catch (error) {
    console.error("Error in createClient controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    console.log("Updating client...");
    const client = await clientService.updateClient(req.params.id, req.body);
    console.log("Client updated:", client);

    res.status(200).json(client);
  } catch (error) {
    console.error("Error in updateClient controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    console.log("Deleting client...");
    const client = await clientService.deleteClient(req.params.id);
    console.log("Client deleted:", client);

    res.status(200).json(client);
  } catch (error) {
    console.error("Error in deleteClient controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const searchClient = async (req, res) => {
  try {
    console.log("Searching client...");
    const searchItem = req.query.search;
    const clients = await clientService.searchClient(searchItem);  
    console.log("Clients found:", clients);

    res.status(200).json(clients);
  }
  catch (error) {
    console.error("Error in searchClient controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
