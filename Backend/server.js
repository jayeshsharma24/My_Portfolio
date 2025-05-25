import express from "express"
import dataRoute from "../Backend/dataRoute.js"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use('/data', dataRoute);

mongoose.connect('mongodb://localhost:27017/Portfolio_Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('Hello World!')
//   })
const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})