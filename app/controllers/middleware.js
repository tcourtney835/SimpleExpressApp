var mongoose = require( 'mongoose' );                       // load mongoose
var Document = mongoose.model('Document');                  // load the document model

// render the simpleForm page
module.exports.listDocuments = function(req, res, next) {
    res.render('simpleForm');
};

// add a new document to the database
module.exports.addDocument = function(req, res, next) {

    // get the title and description from the request body
    var title = req.body.title;
    var description = req.body.description;

    // make a JSON object using the title and description, to be put into database
    var data = {
        title: title,
        description: description
    }

    // create a new document, using the model and supplied data, to be stored in database
    var document = new Document(data);

    // save the document in the database; save takes a function that will run after save
    document.save(function(err, result) {

        // save function returns err with any errors, and result with the saved document
        if (err) {
            // if there is an error, write it to the output and return next (don't load simple form)
            console.log("ERROR", err);
            return next(err);
        }

        // since no error, render the simple form and pass it the returned document
        res.render('simpleForm', result);
    });

}
