import express from 'express';
import { getBanner, createBanner, deleteBanner, updateBanner,getBannerById } from '../controllers/banner.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/getBanner', getBanner);
router.post('/createbanner', createBanner);
router.delete('/deletebanner/:id', deleteBanner);
router.put('/updateBanner/:id', updateBanner);
router.get('/getBannerById/:id', getBannerById);
router.use(authmiddleware);

router.get('/protected', authmiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
export default router;
