const express = require("express");
const app = express();
const port = 5500;
const postsRouter = require("./routers/posts.js");



app.listen(port, ()=>{
    console.log(`listening at port: ${port}`);
});

app.use(express.static(`public`));

app.get("/", (req, res)=>{
    res.send("Benvenuti sul mio blog");
})

app.use("/posts", postsRouter);