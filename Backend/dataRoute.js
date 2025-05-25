
    import express from "express"
    const router = express.Router();
    import Data from "../Backend/dataModel.js"

    router.post('/', async (req, res) => {
        try {
            const newData = new Data(req.body);
            await newData.save();
            res.status(201).send({ message: 'Data saved successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error saving data', error: error });
        }
    });

    // module.exports = router;
    export default router;