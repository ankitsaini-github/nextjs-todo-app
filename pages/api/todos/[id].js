import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res){
  if (req.method === "PUT") {
    const {_id,title,completed} = req.body;

    MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      function (err, client) {
        if (err) throw err;

        var db = client.db("todos");

        db.collection("todoscollection").updateOne({_id: ObjectId(_id)},{$set:{title,completed}});
        client.close();
      }
    );

    res.status(201).json({ message: "todo updated" });
  }
  else if (req.method === "DELETE") {
    const {id} = req.body;

    MongoClient.connect(
      "mongodb+srv://ankit:ankit123123123@cluster0.goaussj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      function (err, client) {
        if (err) throw err;

        var db = client.db("todos");

        db.collection("todoscollection").deleteOne({_id: ObjectId(id)});
        client.close();
      }
    );

    res.status(200).json({ message: "todo deleted" });
  }
}

export default handler;