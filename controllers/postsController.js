const posts = require("../data/postsData.js");

function index(req, res){
    let myRes = posts;
    const {tag} = req.query;
    if (tag) {
        myRes = posts.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    res.json(myRes);
};

function show(req, res){
    const id = req.params.id;
    const post = posts.find(post => post.id === Number(id));
    if(!post){
        return res.status(404).json({err: "post not found"});
    }
    return res.json(post);
};

function store(req, res){
    res.send("aggiungo un nuovo post");
};

function update(req, res){
    const id = req.params.id;
    res.send(`cambio interamente il post con id: ${id}`);
};

function modify(req, res){
    const id = req.params.id;
    res.send(`cambio in parte il post con id: ${id}`);
};

function destroy(req, res){
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {
        res.status(404);
        return res.json({
            status: 404,
            err: "not found",
            mess: "post not found"
        })
    }
    posts.splice(posts.indexOf(post),1);
    console.log(posts);
    res.sendStatus(204);
};

module.exports = {index, show, store, update, modify, destroy};
