const mongoose = require('mongoose');



const ImageSchema = new mongoose.Schema({
    title: { type: String,},
    imageBody: { type: String},
    image: { type: String,

},
}, { timestamps: true });



module.exports = mongoose.model('image', ImageSchema);