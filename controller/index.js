var mongoose = require('mongoose');
var BlogSchema = mongoose.Schema({
    title: String,
    date: String,
    autor: String,
    text: String
});
// set mongoUri
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
mongoose.connect(mongoUri);
var myblogs = mongoose.model('blogs', UserSchema);
exports.list = function(req, res) {
    var blogs = mongoose.model('blogs');
    blogs.find(function(err, blogs) {
        if (!err) {
            res.send(blogs);
        } else res.send(err);
    });
};
exports.blog = function(req, res) {
    var blog = mongoose.model('blogs');
    blog.findById(req.params.id, function(err, blog) {
        if (!err) {
            res.send(blog);
        } else res.send(err);
    });
}
exports.add = function(req, res) {
    var blog = mongoose.model('blogs');
    var jsonData = JSON.parse(req.body.data);
    newblog = new blog({
        title: jsonData.title,
        date: new Date(),
        autor: jsonData.autor,
        text: jsonData.text
    });
    newblog.save(function(err) {
        if (!err) {
            res.send({
                "message": "new blog added"
            });
        } else res.send(null);
    });
}
exports.delete = function(req, res) {
    var blog = mongoose.model('blogs');
    blog.findByIdAndRemove(req.params.id, function(err, blog) {
        if (!err) {
            res.send({
                "message": "blog with ID:" + req.params.id + " deleted."
            });
        } else res.send(err);
    });
}
exports.update = function(req, res) {
    var blog = mongoose.model('blogs');
    var jsonData = JSON.parse(req.body.data);
    blog.findByIdAndUpdate(req.params.id, {
        title: jsonData.title,
        date: new Date(),
        autor: jsonData.autor,
        text: jsonData.text
    }, function(err) {
        if (!err) {
            res.send({
                "message": "blog with ID:" + req.params.id + " updated."
            });
        } else res.send(err);
    });
}