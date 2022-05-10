import mongoose from 'mongoose' ;

const userSchema = new mongoose.Schema({


 
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },


},
 {
timestamps: true ,
}
);

const Seller = mongoose.model('Seller', userSchema);

export default Seller;