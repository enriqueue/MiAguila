const { Router } = require('express');
const { getController, postController } = require('../controllers/server');
const router = Router();

router.get('/', getController);
router.post('/', postController);

module.exports = router;