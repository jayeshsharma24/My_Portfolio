
import express from "express";

export default function dataRoute(db) {
  const router = express.Router();

  const counterSchema = new db.Schema({
    id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  });

  const Counter = db.model("Counter", counterSchema);

  const dataSchema = new db.Schema({
    serialNumber: Number,
    createdAt: { type: Date, default: Date.now },
    name: String,
    email: String,
    number: Number,
  });

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

  const Data = db.model("Data", dataSchema); 


  router.get("/", async (req, res) => {
    try {
      const allData = await Data.find();
      res.status(200).json(allData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  return router;
}
