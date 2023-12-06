import express from 'express';
import { getBanner, createBanner, deleteBanner } from '../controllers/banner.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/getBanner', getBanner);
router.post('/createbanner', createBanner);
router.delete('/deletebanner/:id', deleteBanner);
router.use(authmiddleware);

router.get('/protected', authmiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
export default router;
