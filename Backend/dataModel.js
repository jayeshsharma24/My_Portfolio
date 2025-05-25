
    import mongoose from "mongoose";
    const counterSchema = new mongoose.Schema({
        id: { type: String, required: true },
        seq: { type: Number, default: 0 }
      });
      const Counter = mongoose.model("Counter", counterSchema);

    const dataSchema = new mongoose.Schema({
        
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
    
    
    const Data = mongoose.model('Data', dataSchema);
export default Data;