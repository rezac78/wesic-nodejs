const { Router } = require('express');
const adminControllers = require('../controllers/adminControllers');
const router = new Router();

router.get("/dashboard", adminControllers.Dashboard)

// ! start part delete
router.get("/delete-post/:id", adminControllers.deletePost)
router.get("/pop/delete-post/:id", adminControllers.deletePop)
router.get("/tradition/delete-post/:id", adminControllers.deleteTradition)
router.get("/musicfilm/delete-post/:id", adminControllers.deleteMusicfilm)
router.get("/england/delete-post/:id", adminControllers.deleteEngland)
// ! end part delete

// ! start get editpost
router.get("/edit-post/:id", adminControllers.getEditPost)
router.get("/pop/edit-post/:id", adminControllers.getEditPop)
router.get("/tradition/edit-post/:id", adminControllers.getEditTradition)
router.get("/musicfilm/edit-post/:id", adminControllers.getEditMusicfilm)
router.get("/england/edit-post/:id", adminControllers.getEditEngland)
// ! end get editpost
router.get("/posts", adminControllers.AddPost)
router.get("/pop", adminControllers.Addpop)
router.get("/tradition", adminControllers.Addtradition)
router.get("/musicfilm", adminControllers.Addmusicfilm)
router.get("/england", adminControllers.Addengland)
// ! start Editpost
router.post("/edit-post/:id", adminControllers.editPost)
router.post("/pop/edit-post/:id", adminControllers.editPop)
// ! end Editpost
router.post("/image-upload", adminControllers.uploadImage);

router.post("/posts", adminControllers.createPost);
router.post("/pop", adminControllers.createPop);
router.post("/tradition", adminControllers.createTradition);
router.post("/musicfilm", adminControllers.createMusicfilm);
router.post("/england", adminControllers.createEngland);





module.exports = router;
