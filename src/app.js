const express = require('express');
const database = require('./configs/db')
const googlepayRoutes = require('./routes/googlePayRoutes');
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());


app.use('/googlepay', googlepayRoutes);


app.listen(PORT, async() => {
    try {
        await database();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
