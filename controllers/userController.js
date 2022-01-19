const bcrypt = require('bcryptjs');
const passport = require('passport');
const fetch = require('node-fetch');
const User = require('../models/User');


exports.Login = (req, res) => {
    res.render("login", { pageTitle: "ورود", path: "/login", layout: "./layouts/LoginLayout", message: req.flash("success_msg"), error: req.flash("error") })
}

exports.logout = (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/users/logout")
}

exports.handleLogin = async (req, res, next) => {
    if (req.body["g-recaptcha-response"]) {
        req.flash("error", "اعتبار سنجی captcha الزامی می باشد");
        return res.redirect("/users/login");
    }

    const secretKey = process.env.CAPTCHA_SECRET;

    passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next)
}

exports.rememberMe = (req, res) => {
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expire = null;
    }
    res.redirect("/")
}
exports.Register = (req, res) => {
    res.render("register", { pageTitle: "ثبت نام", path: "/login", layout: "./layouts/LoginLayout" })
}

exports.createPost = async (req, res) => {
    const errors = []
    try {
        await User.userValidation(req.body);
        const { email, fullname, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            errors.push({ message: "کاربری با این ایمیل موجود است " })
            return res.render("register", {
                pageTitle: "ثبت نام",
                path: "/login",
                layout: "./layouts/LoginLayout",
                errors,
            })
        }
        const hash = await bcrypt.hash(password, 14);
        await User.create({ fullname, email, password: hash })
        req.flash("success_msg", "ثبت نام موفقیت امیز بود.")
        res.redirect("/users/login")
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("register", {
            pageTitle: "ثبت نام",
            path: "/login",
            layout: "./layouts/LoginLayout",
            errors,
        })
    }
}