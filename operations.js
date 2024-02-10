//we will write 4 methods to insert, find, remove and update documents
//we will be using the assert module, strict version so we will require it
const assert = require('assert').strict;

//insert - 4 params for this method
//insertDocument has access to collection in connected DB, so can now use 
//insertOne() method of the collection
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    //find() with an empty param list means we want to find all documents in Collection
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    })
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    //the document arg is the JS object passed in that will be used to figure out
    //which document to delete.
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    })
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    //updateOne() has 4 params, document - info on object we want to update
    //second param is an object with the upates we want to make, we will use the $set
    //mongoDB will see that and know we want to overwrite with 'update'
    //third param to pass in optional configs
    //4th is a callback function that will give us an error or the result of the operation
    coll.updateOne(document, {$set: update}, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    })
};

