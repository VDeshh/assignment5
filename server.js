const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const { MongoClient, ServerApiVersion } = require('mongodb');

const corsOptions = {
  origin: "https://cpsc455-assignment5-cmh9.onrender.com", // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

const uri = "mongodb+srv://vdesh:goosebumps@cluster0.8c6uvtf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
let inventoryCollection;

app.use(express.json());


async function run() {
  try {
    await client.connect();
    db = client.db("Assignment4");
    inventoryCollection = db.collection("Inventory");
    console.log("Connected to MongoDB!");
    startServer();
  } catch (err) {
    console.dir(err);
  }
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post('/api/inventory', async (req, res) => {
  const { name, image, price, description } = req.body;
  const newItem = { name, image, price, description };
  
  try {
    const result = await inventoryCollection.insertOne(newItem);
    console.log(result); 
    if(result.insertedId) {
      res.json({ _id: result.insertedId, ...newItem }); 
    }else {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

const { ObjectId } = require('mongodb');

app.delete('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  
  const _id = new ObjectId(id);
  const result = await inventoryCollection.deleteOne({ _id });

  if (result.deletedCount === 1) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  
  const _id = new ObjectId(id);
  const updatedItem = req.body;
  
  const result = await inventoryCollection.updateOne({ _id }, { $set: updatedItem });

  if (result.matchedCount === 1) {
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});
app.get('/api/inventory', async (req, res) => {
  const { sort } = req.query;
  const sortOption = {};

  if (sort === 'asc') {
    sortOption.price = 1;
  } else if (sort === 'desc') {
    sortOption.price = -1;
  }

  const inventory = await inventoryCollection.find().sort(sortOption).toArray();
  res.json(inventory);
});

app.get('/api/inventory/search', async (req, res) => {
  const { searchTerm, sort } = req.query;
  const searchOption = searchTerm ? { name: new RegExp(searchTerm, 'i') } : {};
  const sortOption = {};

  if (sort === 'asc') {
    sortOption.price = 1;
  } else if (sort === 'desc') {
    sortOption.price = -1;
  }

  const searchResults = await inventoryCollection.find(searchOption).sort(sortOption).toArray();
  res.json(searchResults);
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

run();
