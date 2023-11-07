import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  let collection = await db.collection("records");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("records");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});


// This section will help you create a new record.
router.post("/post", async (req, res) => {
  let newDocument = {
					Caption: req.body.Caption,
					Body: req.body.Body,
					PostedBy: req.body.PostedBy,
					Photo: req.body.Photo.toString("base64"),
  };
  let collection = await db.collection("records");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// This section will help you create a new post
router.post("/post", async (req, res) => {
  try {
    const { username, caption, photo } = req.body;

    // Validate the input
    if (!username || !caption || !photo) {
      return res.status(400).send("Bad Request: Missing username, caption, or photo");
    }

    const newPost = {
      username,
      caption,
      photo, // Storing the photo as a base64 string
      createdAt: new Date(),
    };

    const collection = await db.collection("posts");
    const result = await collection.insertOne(newPost);
    
    return res.status(201).send(result);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/create", (req, res) => {//works
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
};
  let collection =  db.collection("records");
  let result = collection.insertOne(newDocument);
  res.send(result).status(204);
})









export default router;