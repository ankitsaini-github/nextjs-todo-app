import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      function (err, client) {
        if (err) throw err;

        var db = client.db("todos");

        db.collection("todoscollection").insertOne(data);
        client.close();
      }
    );

    res.status(201).json({ message: "todo inserted" });
  }
}
export default handler;