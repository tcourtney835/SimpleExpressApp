var mongoose = require( 'mongoose' );                       // load mongoose
var Document = mongoose.model('Document');                  // load the document model

// render the simpleForm page
module.exports.listDocuments = function(req, res, next) {

    // first, get all of the documents already in the database
    Document.find({}, function(err, documents) {

        if (err) {
            return next(err);                          // if there is an error, pass it to next
        }

//        console.log("DOCUMENTS", documents);              // uncomment to view documents in console

        // now render the simpleForm, and pass the documents to it
        res.render('simpleForm', { documents: documents});
    })

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

        // get all of the documents again, and return

        // since no error, render the simple form and pass it the returned document
        Document.find({}, function(err, documents) {
            if (err) return next(err);                          // if there is an error, pass it to next

            // now render the simpleForm, and pass the documents to it
            res.render('simpleForm', { documents: documents});
        });

    });

}
