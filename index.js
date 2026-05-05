const express = require('express')
const app = express();
const Port = 5000;
const mongoose = require("mongoose");

app.use(express.json())


mongoose.connect("mongodb+srv://adedejisam0628:adedeji06@cluster0.ijnrbpy.mongodb.net/?appName=Cluster0")
.then(()=> {
    console.log("MongoDB Connected")
})
.catch((err)=> {
    console.log(err)
})

app.get("/", (req, res)=> {
    res.send("App is running")
})

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true
    },
    content: {
        type: String,
        required: true
    }, 
    // images: {
    //     type: String
    // },
    tags: {
        type: [String],
        default: [],
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }
}, { timestamps: true }
)
const Post = mongoose.model("Post", postSchema);


app.post("/create-post", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const Post = await Post.create({
      title,
      content,
      // author: req.user.id  ← add this when auth is ready
    });

    res.status(201).json({
      success: true,
      data: Post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/remove-post", async (req, res)=> {
    await Post.findOneAndDelete()
})


app.listen(Port, (error)=> {
    if (!error) {
        console.log("Server running on Port " + Port)
    } else {
        console.log("Error :" + error)
    }
})