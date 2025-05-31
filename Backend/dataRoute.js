import express from "express";
import PDFDocument from "pdfkit";
import mongoose from "mongoose";

export default function dataRoute(portfolioDb) {
  const router = express.Router();

  const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

  const Counter = portfolioDb.model("Counter", counterSchema);

  const dataSchema = new mongoose.Schema({
  serialNumber: Number,
  createdAt: { type: Date, default: Date.now },
  name: String,
  email: String,
  number: Number
});

  // Auto-increment serialNumber
  dataSchema.pre("save", async function (next) {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { id: "serialNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.serialNumber = counter.seq;
    }
    next();
  });

  const Data = portfolioDb.model("Data", dataSchema);

  // GET all data
  router.get("/", async (req, res) => {
    try {
      const data = await Data.find().sort({ serialNumber: 1 });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST new data
  router.post("/", async (req, res) => {
    try {
      const newData = new Data(req.body);
      await newData.save();
      res.status(201).send({ message: "Data saved successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error saving data", error });
    }
  });

  // PUT update data
  router.put("/:id", async (req, res) => {
    try {
      const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!updatedData) return res.status(404).json({ message: "Data not found" });
      res.json(updatedData);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE data
  router.delete("/:id", async (req, res) => {
    try {
      const deletedData = await Data.findByIdAndDelete(req.params.id);
      if (!deletedData) return res.status(404).json({ message: "Data not found" });
      res.json({ message: "Data deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PDF download
  router.get("/download-pdf", async (req, res) => {
    try {
      const allData = await Data.find().sort({ serialNumber: 1 }).lean();
      if (!allData.length) return res.status(404).send("No data available");

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=data.pdf");

      const doc = new PDFDocument({ margin: 30, size: "A4" });
      doc.pipe(res);

      doc.fontSize(18).text("MongoDB Data Report", { align: "center" }).moveDown();

      allData.forEach((item, index) => {
        doc.fontSize(12).text(`Record #${index + 1}`, { underline: true }).moveDown(0.5);
        doc.text(`Name: ${item.name || "N/A"}`);
        doc.text(`Email: ${item.email || "N/A"}`);
        doc.text(`Number: ${item.number || "N/A"}`);
        doc.text(`Created At: ${new Date(item.createdAt).toLocaleString()}`);
        doc.moveDown(1.5);
      });

      doc.end();
    } catch (err) {
      console.error("PDF Generation Error:", err);
      res.status(500).send("Failed to generate PDF");
    }
  });

  // CSV download
  router.get("/download-csv", async (req, res) => {
    try {
      const allData = await Data.find().sort({ serialNumber: 1 }).lean();
      if (!allData.length) return res.status(404).send("No data available");

      const csvHeaders = ["Name", "Email", "Number", "Created At"];
      const csvRows = allData.map(item => [
        item.name || "",
        item.email || "",
        item.number || "",
        new Date(item.createdAt).toLocaleString()
      ]);

      const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map(row => row.map(v => `"${v}"`).join(","))
      ].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      res.status(200).send(csvContent);
    } catch (err) {
      console.error("CSV Generation Error:", err);
      res.status(500).send("Failed to generate CSV");
    }
  });

  return router;
}
