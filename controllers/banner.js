import Banner from '../model/banner.js';

export const getBanner = async (req, res) => {
    try {
      const banners = await Banner.find();
  
      if (banners.length === 0) {
        return res.status(404).json({ error: 'No banners found' });
      }
  
      res.json(banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


  export const createBanner = async (req, res) => {
    const { title, description, imageUrl, status } = req.body;
  
    try {
      
      const existingBanner = await Banner.findOne({ title });
  
      if (existingBanner) {
        return res.status(400).json({ error: 'Banner with the same title already exists' });
      }
  
    
      const newBanner = await Banner.create({ title, description, imageUrl, status });
      res.json(newBanner);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const deleteBanner = async (req, res) => {
    const { id } = req.params;
  
    try {
      const bannerToDelete = await Banner.findById(id);
  
      if (!bannerToDelete) {
        return res.status(404).json({ error: 'Banner not found' });
      }
  
      const deletedBanner = await Banner.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  