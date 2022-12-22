const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000


//midle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://aythenticationTask:1ZuWPBnKzxe8bCUt@cluster0.et115mk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const userCollection = client.db('authenticationTask').collection('userInfo');

        app.post('/userinfo', async (req, res) => {
            const userInfo = req.body;
            const filter = {}
            const result = await userCollection.insertOne(userInfo);
            res.send(result);
        })

        app.get('/userinfo/:email', async (req,res) => {
            const email = req.params.email;
            const filter = {email: email}
            const result = await userCollection.find(filter).toArray();
            res.send(result);
        })

    }
    finally {

    }
}



run().catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello this is Arko server')
})

app.listen(port, () => {
    console.log(`server running at port: ${port}`);
})

