const { application, json } = require('express');
const express = require('express');
const router = express.Router();
let request = require("request");

function getBrands (req, res) {
    const {apikey, method, params} = req.body;
    console.log(req.body);
    request.post({
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer API_KEY_TEST"
        },

        "url": "https://app.socialinsider.io/api",
        "body": JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params
        })
    }, (err, resp, body) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        console.log(resp.body);
        return res.status(200).json(JSON.parse(body));
    })
}

router.post("/", getBrands);

module.exports = router;