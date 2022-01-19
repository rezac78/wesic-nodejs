const multer = require('multer');
const sharp = require('sharp');
const shortId = require('shortid');

const appRoot = require('app-root-path');
const uuid = require('uuid').v4;
const admin = require('../models/Admin');
const pop = require('../models/Pop');
const tradition = require('../models/Tradition');
const musicfilm = require('../models/Musicfilm');
const england = require('../models/England');
const pageTradition = require('../models/PageTradition');
const { formatDate } = require('../utils/jalali');
const { fileFilter } = require('../utils/multer');
const { fileFilterMusic } = require('../utils/multerMusic');

exports.Dashboard = async (req, res) => {
    try {
        const admins = await admin.find()
        const pops = await pop.find()
        const traditions = await tradition.find()
        const musicfilms = await musicfilm.find()
        const englands = await england.find()
        const PageTraditions = await pageTradition.find()
        res.render("admin/dashboard", {
            pageTitle: "داشبورد | ادمین",
            path: "/admin/dashboard",
            layout: "./layouts/AdminLayout",
            admins,
            pops,
            traditions,
            musicfilms,
            englands,
            PageTraditions,
            formatDate,
        })
    } catch (err) {
        console.log(err);
    }
}

exports.AddPost = (req, res) => {
    res.render("admin/posts", { pageTitle: "داشبورد | ساخت پست", path: "/admin/posts", layout: "./layouts/AdminLayout" })
}

exports.Addpop = (req, res) => {
    res.render("admin/pop", { pageTitle: "داشبورد | ساخت بخش پاپ", path: "/admin/posts", layout: "./layouts/AdminLayout" })
}

exports.Addtradition = (req, res) => {
    res.render("admin/tradition", { pageTitle: "داشبورد | ساخت بخش سنتی", path: "/admin/posts", layout: "./layouts/AdminLayout" })
}

exports.Addmusicfilm = (req, res) => {
    res.render("admin/musicfilm", { pageTitle: "داشبورد | ساخت بخش موسیقی فیلم", path: "/admin/posts", layout: "./layouts/AdminLayout" })
}

exports.Addengland = (req, res) => {
    res.render("admin/england", { pageTitle: "داشبورد | ساخت بخش خارجی", path: "/admin/posts", layout: "./layouts/AdminLayout" })
}

exports.Addpagetradition = (req, res) => {
    res.render("admin/pagetradition", { pageTitle: "داشبورد | ساخت بخش سنتی", path: "/admin/posts", layout: "./layouts/AdminLayout" })
}

// ! start part delete
exports.deletePost = async (req, res) => {
    try {
        const result = await admin.findByIdAndRemove(req.params.id);
        res.redirect("/admin/dashboard")
    } catch (err) {
        res.render("errors/500")
    }
}

exports.deletePop = async (req, res) => {
    try {
        await pop.findByIdAndRemove(req.params.id);
        res.redirect("/admin/dashboard")
    } catch (err) {
        res.render("errors/500")
    }
}

exports.deleteTradition = async (req, res) => {
    try {
        await tradition.findByIdAndRemove(req.params.id);
        res.redirect("/admin/dashboard")
    } catch (err) {
        res.render("errors/500")
    }
}

exports.deleteMusicfilm = async (req, res) => {
    try {
        await musicfilm.findByIdAndRemove(req.params.id);
        res.redirect("/admin/dashboard")
    } catch (err) {
        res.render("errors/500")
    }
}

exports.deleteEngland = async (req, res) => {
    try {
        await england.findByIdAndRemove(req.params.id);
        res.redirect("/admin/dashboard")
    } catch (err) {
        res.render("errors/500")
    }
}

// ! end part delete
// ! start part create
exports.createPost = async (req, res) => {
    const errors = []

    const images = req.files ? req.files.images : {};
    const fileName = `${shortId.generate()}_${images.name}`;
    const uploadPath = `${appRoot}/public/uploads/home/${fileName}`

    try {
        req.body = { ...req.body, images };
        await admin.postValidation(req.body)
        await sharp(images.data).jpeg({ quality: 60 }).toFile(uploadPath).catch((err) => console.log(err));
        await admin.create({ ...req.body, images: fileName })
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/posts", { pageTitle: "داشبورد | ساخت پست", path: "/admin/posts", layout: "./layouts/AdminLayout", errors })
    }
}

exports.createPop = async (req, res) => {
    const errors = []

    const images = req.files ? req.files.images : {};
    const fileName = `${shortId.generate()}_${images.name}`;
    const uploadPath = `${appRoot}/public/uploads/pop/${fileName}`

    try {
        req.body = { ...req.body, images };
        await pop.postValidation(req.body)
        await sharp(images.data).jpeg({ quality: 60 }).toFile(uploadPath).catch((err) => console.log(err));
        await pop.create({ ...req.body, images: fileName })
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/posts", { pageTitle: "داشبورد | ساخت پست", path: "/admin/posts", layout: "./layouts/AdminLayout", errors })
    }
}

exports.createTradition = async (req, res) => {
    const errors = []

    const images = req.files ? req.files.images : {};
    const fileName = `${shortId.generate()}_${images.name}`;
    const uploadPath = `${appRoot}/public/uploads/tradition/${fileName}`

    try {
        req.body = { ...req.body, images };
        await tradition.postValidation(req.body)
        await sharp(images.data).jpeg({ quality: 60 }).toFile(uploadPath).catch((err) => console.log(err));
        await tradition.create({ ...req.body, images: fileName })
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/posts", { pageTitle: "داشبورد | ساخت پست", path: "/admin/posts", layout: "./layouts/AdminLayout", errors })
    }
}

exports.createMusicfilm = async (req, res) => {
    const errors = []

    const images = req.files ? req.files.images : {};
    const fileName = `${shortId.generate()}_${images.name}`;
    const uploadPath = `${appRoot}/public/uploads/musicfilm/${fileName}`

    try {
        req.body = { ...req.body, images };
        await musicfilm.postValidation(req.body)
        await sharp(images.data).jpeg({ quality: 60 }).toFile(uploadPath).catch((err) => console.log(err));
        await musicfilm.create({ ...req.body, images: fileName })
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/posts", { pageTitle: "داشبورد | ساخت پست", path: "/admin/posts", layout: "./layouts/AdminLayout", errors })
    }
}

exports.createEngland = async (req, res) => {
    const errors = []

    const images = req.files ? req.files.images : {};
    const fileName = `${shortId.generate()}_${images.name}`;
    const uploadPath = `${appRoot}/public/uploads/england/${fileName}`

    try {
        req.body = { ...req.body, images };
        await england.postValidation(req.body)
        await sharp(images.data).jpeg({ quality: 60 }).toFile(uploadPath).catch((err) => console.log(err));
        await england.create({ ...req.body, images: fileName })
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/posts", { pageTitle: "داشبورد | ساخت پست", path: "/admin/posts", layout: "./layouts/AdminLayout", errors })
    }
}


// ! end part create

// ! start get Edit

exports.getEditPost = async (req, res) => {
    const posts = await post.findOne({
        _id: req.params.id,
    });
    if (!posts) {
        return res.redirect("errors/404");
    } else {
        res.render("admin/editPost", { pageTitle: "داشبورد | ویرایش پست", path: "/admin/edit-post", layout: "./layouts/AdminLayout", post })
    }
}

exports.getEditPop = async (req, res) => {
    const poppage = await pop.findOne({
        _id: req.params.id,
    });
    if (!poppage) {
        return res.redirect("errors/404");
    } else {
        res.render("admin/pop/editPost", { pageTitle: "داشبورد | ویرایش پست", path: "/admin/pop/edit-post", layout: "./layouts/AdminLayout", poppage })
    }
}

exports.getEditTradition = async (req, res) => {
    const traditionpage = await tradition.findOne({
        _id: req.params.id,
    });
    if (!traditionpage) {
        return res.redirect("errors/404");
    } else {
        res.render("admin/tradition/editPost", { pageTitle: "داشبورد | ویرایش پست", path: "/admin/pop/edit-post", layout: "./layouts/AdminLayout", traditionpage })
    }
}

exports.getEditMusicfilm = async (req, res) => {
    const musicfilmpage = await musicfilm.findOne({
        _id: req.params.id,
    });
    if (!musicfilmpage) {
        return res.redirect("errors/404");
    } else {
        res.render("admin/musicfilm/editPost", { pageTitle: "داشبورد | ویرایش پست", path: "/admin/pop/edit-post", layout: "./layouts/AdminLayout", musicfilmpage })
    }
}
exports.getEditEngland = async (req, res) => {
    const englandpage = await england.findOne({
        _id: req.params.id,
    });
    if (!englandpage) {
        return res.redirect("errors/404");
    } else {
        res.render("admin/england/editPost", { pageTitle: "داشبورد | ویرایش پست", path: "/admin/pop/edit-post", layout: "./layouts/AdminLayout", englandpage })
    }
}

// ! end get Edit

exports.editPost = async (req, res) => {
    const errors = [];

    const post = await admin.findOne({ _id: req.params.id });
    try {
        await admin.postValidation(req.body);
        if (!post) {
            return res.redirect("errors/404");
        }
        else {
            const { title, content } = req.body;
            post.title = title;
            post.content = content;

            await post.save();
            return res.redirect("/admin/dashboard")
        }
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/editPost", { pageTitle: "داشبورد | ویرایش پست ", path: "/admin/edit-post", layout: "./layouts/AdminLayout", errors, post })
    }

}

exports.editPop = async (req, res) => {
    const errorArr = [];

    const popPage = await pop.findOne({ _id: req.params.id });
    try {
        await popPage.postValidation(req.body);
        if (!popPage) {
            return res.redirect("errors/404");
        }
        else {
            const { title, content } = req.body;
            popPage.title = title;
            popPage.content = content;

            await popPage.save();
            return res.redirect("/admin/dashboard")
        }
    } catch (err) {
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("admin/pop/editPost", { pageTitle: "داشبورد | ویرایش پست ", path: "/admin/edit-post", layout: "./layouts/AdminLayout", errors: errorArr, popPage })
    }

}

exports.uploadImage = (req, res) => {
    const upload = multer({
        limits: { fileSize: 4000000 },
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).send("حجم عکس نباید بیشتر از 4 مگابایت باشد")
            }
            res.send(err);
        } else {
            if (req.file) {
                const fileName = `${uuid()}_${req.file.originalname}`;
                await sharp(req.file.buffer).jpeg({
                    quality: 60
                })
                    .toFile(`./public/uploads/${fileName}`)
                    .catch(err => console.log(err));
                res.status(200).send("آپلود عکس موفقیت آمیز بود");
            } else {
                res.send("جهت آپلود باید عکسی انتخاب کنید");
            }
        }
    });
};


exports.uploadMusic = (req, res) => {
    const upload = multer({
        limits: { fileSize: 4000000 },
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).send("حجم عکس نباید بیشتر از 4 مگابایت باشد")
            }
            res.send(err);
        } else {
            if (req.file) {
                const fileName = `${uuid()}_${req.file.originalname}`;
                await sharp(req.file.buffer).jpeg({
                    quality: 60
                })
                    .toFile(`./public/uploads/${fileName}`)
                    .catch(err => console.log(err));
                res.status(200).send("آپلود عکس موفقیت آمیز بود");
            } else {
                res.send("جهت آپلود باید عکسی انتخاب کنید");
            }
        }
    });
};

