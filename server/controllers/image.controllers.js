const image = require('../models/image.models');

module.exports ={
    // create
    createImage: (req, res) => {
        image.create(req.body)
            .then(newImage => res.json(newImage))
            .catch((err => res.status(400).json(err)));
                },
    // read
    AllImage: (req, res) => {
        image.find()
            .then(allImage => res.json(allImage))
            .catch((err => res.json(err)));
            },

    // read one
    getOneImage: (req, res) => {
        image.findById(req.params.id)
            .then(oneImage => res.json(oneImage))
            .catch(err => res.json(err));
    },
    // update, add in validator function

    updateImage: (req, res) => {
        image.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(updateImage => res.json(updateImage))
        .catch((err => res.status(400).json(err)));
                },
        // .catch(err => res.json(err));
    // },
    // delete
    deleteImage: (req, res) => {
        image.findByIdAndDelete(req.params.id)
        .then(deleteImage => res.json(deleteImage))
        .catch(err => res.json(err));
    },

}