const express = require('express');
const router = express.Router();

router.use(express.urlencoded());
router.use(express.json());

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function (error, client) {
    const blog = client.db("blog");
    console.log("DB connected");

    router.get("/video", function (req, res) {
        res.render("video", { pageTitle: "ساخت سنتی", path: "/upload" })
    })

    router.post("/video", function (req, res) {
        blog.collection("posts").insertOne(req.body, function (error, document) {
            res.send("posted success")
        })
    })

    router.get("/pop", function (req, res) {
        res.render("popUpload", { pageTitle: "ساخت پاپ", path: "/upload" })
    })

    router.post("/pop", function (req, res) {
        blog.collection("popPage").insertOne(req.body, function (error, document) {
            res.send("posted success")
        })
    })

    router.get("/england", function (req, res) {
        res.render("englandUpload", { pageTitle: "ساخت خارجی", path: "/upload" })
    })

    router.post("/england", function (req, res) {
        blog.collection("englandPage").insertOne(req.body, function (error, document) {
            res.send("posted success")
        })
    })

    router.get("/musicfilm", function (req, res) {
        res.render("musicfilmUpload", { pageTitle: "ساخت موسیقی فیلم", path: "/upload" })
    })

    router.post("/musicfilm", function (req, res) {
        blog.collection("musicfilmPage").insertOne(req.body, function (error, document) {
            res.send("posted success")
        })
    })

    router.get("/pageTradition", function (req, res) {
        blog.collection("posts").find().sort({ "_id": 1 }).toArray(function (error, posts) {
            res.render("pageTradition", { pageTitle: "سنتی", path: "/upload", posts: posts })
        })
    })

    router.get("/popPage", function (req, res) {
        blog.collection("popPage").find().sort({ "_id": 1 }).toArray(function (error, popPage) {
            res.render("popPage", { pageTitle: "پاپ", path: "/upload2", popPage: popPage })
        })
    })

    router.get("/englandPage", function (req, res) {
        blog.collection("englandPage").find().sort({ "_id": 1 }).toArray(function (error, englandPage) {
            res.render("englandPage", { pageTitle: "خارجی", path: "/upload2", englandPage: englandPage })
        })
    })

    router.get("/musicfilmPage", function (req, res) {
        blog.collection("musicfilmPage").find().sort({ "_id": 1 }).toArray(function (error, musicfilmPage) {
            res.render("musicfilmPage", { pageTitle: "موسیقی فیلم", path: "/upload2", musicfilmPage: musicfilmPage })
        })
    })
})



module.exports = router;
