const express = require('express');
const path = require('path');
const cors = require("cors");
const {createPayload, subscribeToPayload} = require('./utils/xummSign');

const PORT = process.env.PORT || 3001;
const app = express();


const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,

}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/api/xummSign", async (req, res) => {
   const qrObj = await createPayload()
   console.log("INSIDE EXPRESS ENDPOINT: Qr const: ", qrObj)
   res.send(qrObj)

    // console.log(res)
})

app.get("/api/payloadSubscribe?:uuid", async (req, res) => {
    // const subResult = await subscribeToPayload()
    const uuid = req.query.uuid
    const xummSubInit = await subscribeToPayload(uuid)
    const xummObj = await xummSubInit.json()
    res.send({message: xummObj})
    // const runSub = await subscribeToPayload(uuid).catch(err => console.log(err))
    // res.send("payloadSubscirbe response from server: ",uuid)
    // console.log("req.query.uuid = ", uuid)
    // const testobj = {
    //     name: "testing",
    //     functionTest: ()=> {
    //         console.log("hello from inside function")
    //     }

    // }
    
    // const runSubscribe = await subscribeToPayload(uuid)
// res.send({message: uuid})   
})


app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
