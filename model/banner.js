import {mongoose} from 'mongoose';
const { Schema } = mongoose;

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  
});

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
