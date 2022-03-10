const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5100;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const brands = require("./get_brands")
app.use("/requests", brands);
 
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT + '! Go to http://localhost:'
    + PORT + '/');
});