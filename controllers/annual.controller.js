import AnnualClient from "../models/annual.model.js";

// GET all
export const getAnnualClients = async (req, res) => {
  try {
    const data = await AnnualClient.find().sort({ sno: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const createAnnualClient = async (req, res) => {
  try {
    const client = await AnnualClient.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
export const updateAnnualClient = async (req, res) => {
  try {
    const updated = await AnnualClient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteAnnualClient = async (req, res) => {
  try {
    const deleted = await AnnualClient.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
