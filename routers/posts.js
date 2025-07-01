const express = require("express");
const router = express.Router();
const posts = require("../data/postsData.js")

//index
router.get("/", (req,res) =>{
    let myRes = posts;
    const {tag} = req.query;
    if (tag) {
        myRes = posts.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    res.json(myRes);
});

//show
router.get("/:id", (req,res) =>{
    const id = req.params.id;
    const post = posts.find(post => post.id === Number(id));
    if(post){
        return res.json(post);
    }
    else{
        return res.status(404).json({err: "post not found"});
    }
});

// store
router.post("/", (req, res) =>{
    res.send("aggiungo un nuovo post");
});

// update
router.put("/:id", (req, res) =>{
    const id = req.params.id;
    res.send(`cambio interamente il post con id: ${id}`);
});

//modify
router.patch("/:id", (req, res) =>{
    const id = req.params.id;
    res.send(`cambio in parte il post con id: ${id}`);
});

// detroy
router.delete("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);
    if (post) {
        posts.splice(posts.indexOf(post),1);
    }
    else{
        res.status(404);
        return res.json({
            status: 404,
            err: "not found",
            mess: "post not found"
        })
    }
    console.log(posts);
    res.sendStatus(204);
});


module.exports = router;