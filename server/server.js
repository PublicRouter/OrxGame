const express = require('express');
const path = require('path');
const cors = require("cors");

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

app.get("/api/xummSign", (req, res) => {
    res.send({ message: "Hello From xummSign GET Request" })
    // console.log(res)
})


app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
