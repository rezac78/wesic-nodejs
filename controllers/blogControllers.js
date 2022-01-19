const admin = require('../models/Admin');
const pop = require('../models/Pop');
const tradition = require('../models/Tradition');
const musicfilm = require('../models/Musicfilm');
const england = require('../models/England');
const pageTradition = require('../models/PageTradition');
const { truncate } = require('../utils/helpers');

exports.Index = async (req, res) => {
    try {
        const posts = await admin.find().sort({ createdAt: "desc" })
        res.render("index", { pageTitle: "خانه", path: "/", posts, truncate })
    } catch (err) {
        res.render("errors/500")
    }
}

// exports.getSinglePost = async (req, res) => {
//     const post = await admin.findOne({
//         _id: req.params.id,
//     });
//     if (!post) {
//         return res.redirect("errors/404");
//     } else {
//         res.render("pageTradition", { pageTitle: "داشبورد | ویرایش پست", path: "/upload", layout: "./layouts/AdminLayout", posts })
//     }
// };

exports.Traditi = async (req, res) => {
    try {
        const traditions = await tradition.find().sort({ createdAt: "desc" })
        res.render("traditi", { pageTitle: "سنتی", path: "/traditi", traditions, truncate })
    } catch (err) {
        res.render("errors/500")
    }
}

exports.Musicvideo = (req, res) => {
    res.render("musicvideo", { pageTitle: "موزیک ویدیو", path: "/musicvideo" })
}

exports.Pop = async (req, res) => {
    try {
        const pops = await pop.find().sort({ createdAt: "desc" })
        res.render("pop", { pageTitle: "پاپ", path: "/pop", pops, truncate })
    } catch (err) {
        res.render("errors/500")
    }
}

exports.Musicfilm = async (req, res) => {
    try {
        const musicfilms = await musicfilm.find().sort({ createdAt: "desc" })
        res.render("musicfilm", { pageTitle: "موزیک فیلم", path: "/musicfilm", musicfilms, truncate })
    } catch (err) {
        res.render("errors/500")
    }
}

exports.England = async (req, res) => {
    try {
        const englands = await england.find().sort({ createdAt: "desc" })
        res.render("england", { pageTitle: "خارجی", path: "/england", englands, truncate })
    } catch (err) {
        res.render("errors/500")
    }
}

exports.Game = (req, res) => {
    res.render("game", { pageTitle: "بازی", path: "/game" })
}

exports.Musicplayer = (req, res) => {
    res.render("musicplayer", { pageTitle: "پخش کننده موزیک", path: "/musicplayer" })
}

exports.Study = (req, res) => {
    res.render("study", { pageTitle: "برای مطالعه", path: "/study" })
}


exports.Pageengland = (req, res) => {
    res.render("pageengland", { pageTitle: "بخش خارجی", path: "/pageengland" })
}

exports.Pagepop = (req, res) => {
    res.render("pagepop", { pageTitle: "بخش پاپ", path: "/pagepop" })
}

exports.Pagetraditional = (req, res) => {
    res.render("pagetraditional", { pageTitle: "بخش سنتی", path: "/pagetraditional" })
}

exports.cover = (req, res) => {
    res.render("making", { pageTitle: "درحال ساخت", path: "/cover" })
}

