const express =require ('express');
const cors =require ('cors');
require('dotenv').config()
const app= express()
const port= process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middelware
app.use(cors())
app.use(express.json())


// MongoDB Atlast

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ergu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
  async function run (){
    try{
        await client.connect();
        const MovieSeatCollection= client.db('Movie').collection('Seat')



        app.get('/Movie', async (req,res) => {
            const query={}
            const cursor= MovieSeatCollection.find(query)
            const MovieItem= await cursor.toArray()
            console.log(MovieItem)
            res.send(MovieItem)
        
            })
            app.post('/Movie', async (req,res)=>{
                const Movietool=req.body
                const Movieresult= await MovieSeatCollection.insertOne(Movietool)
                res.send(Movieresult)
            })
             
    }


    finally{

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})