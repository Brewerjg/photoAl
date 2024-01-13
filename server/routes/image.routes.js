const UserController = require('../controllers/user.controllers');
const ImageController = require('../controllers/image.controllers'); 
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.get('/api/image', ImageController.AllImage);
    app.post('/api/image/new', ImageController.createImage);
    app.get('/api/oneimage/:id', ImageController.getOneImage);
    app.patch('/api/image/:id', ImageController.updateImage);
    app.delete('/api/delete/:id', ImageController.deleteImage);
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/users', UserController.getAll);
    app.post('/api/logout', authenticate, UserController.logout);
}