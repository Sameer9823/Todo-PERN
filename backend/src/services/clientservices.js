import { query } from "../db.js";

export const getClients = async () => {
  try {
    const { rows } = await query("SELECT * FROM clients_tb");
    return rows;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Database error");
  }
};

export const createClient = async (client) => {
  try {
    const { rows } = await query(
      "INSERT INTO clients_tb (name, email, job, rate, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [client.name, client.email, client.job, client.rate, client.isActive]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Database error");
  }
};

export const updateClient = async (id, client) => {
  try {
    const { rows } = await query(
      "UPDATE clients_tb SET name=$1, email=$2, job=$3, rate=$4, isActive=$5 WHERE id=$6 RETURNING *",
      [client.name, client.email, client.job, client.rate, client.isActive, id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Database error");
  }
};

export const deleteClient = async (id) => {
  try {
    const { rows } = await query(
      "DELETE FROM clients_tb WHERE id=$1 RETURNING *",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Database error");
  }
};

export const searchClient = async (search) => {
  try {
    const { rows } = await query(
      "SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1",
      [`%${search}%`]
    );
    return rows;
  } catch (error) {
    console.error("Error searching client:", error);
    throw new Error("Database error");
  }
};
