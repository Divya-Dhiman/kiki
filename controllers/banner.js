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

export const getBannerById = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    res.json(banner);
  } catch (error) {
    console.error('Error fetching banner by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  export const createBanner = async (req, res) => {
    const { title, description, imageUrl, status } = req.body;
  
    try {
      
      const existingBanner = await Banner.findOne({ title });
  
      if (existingBanner) {
        return res.status(400).json({ error: 'Banner with the same title already exists' });
      }
  
    
      const newBanner = await Banner.create({ title, description, imageUrl, status });
      res.status(200).json(newBanner);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const deleteBanner = async (req, res) => {
    const { id } = req.params;
  
    try {
      const bannerDelete = await Banner.findById(id);
  
      if (!bannerDelete) {
        return res.status(404).json({ error: 'Banner not found' });
      }
  
      const deletedBanner = await Banner.findByIdAndDelete(id);
      res.json(deletedBanner);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

 
  export const updateBanner = async (req, res) => {
    const { id } = req.params;
    const { title, description, imageUrl, status } = req.body;
  
    try {
      const bannerUpdate = await Banner.findById(id);
  
      if (!bannerUpdate) {
        return res.status(404).json({ error: 'Banner not found' });
      }
  

      bannerUpdate.title = title;
      bannerUpdate.description = description;
      bannerUpdate.imageUrl = imageUrl;
      bannerUpdate.status = status;
  
      
      const updatedBanner = await bannerUpdate.save();
      
      res.json(updatedBanner);
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  