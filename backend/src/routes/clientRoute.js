import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();
router.get("/clients", clientController.getClients);
router.post("/add-clients", clientController.createClient);
router.put("/clients/:id", clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);
router.get("/search", clientController.searchClient);

export default router;
