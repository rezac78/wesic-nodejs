const { Router } = require('express');
const blogController = require("../controllers/blogControllers");
const router = new Router();

router.get('/', blogController.Index)
router.get('/traditi', blogController.Traditi)
router.get('/musicvideo', blogController.Musicvideo)
router.get('/pop', blogController.Pop)
router.get('/musicfilm', blogController.Musicfilm)
router.get('/england', blogController.England)
router.get('/game', blogController.Game)
router.get('/musicplayer', blogController.Musicplayer)
router.get('/study', blogController.Study)
router.get('/pageengland', blogController.Pageengland)
router.get('/pagepop', blogController.Pagepop)
router.get('/pagetraditional', blogController.Pagetraditional)
router.get('/cover', blogController.cover)

module.exports = router;