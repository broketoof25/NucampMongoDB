//we will write 4 methods to insert, find, remove and update documents
//we will be using the assert module, strict version so we will require it
//we can remove the require for assert since we are not using it anymore
//and moved to returning PROMISES, the PROMISE will return a RESOLVE OR REJECT

//const assert = require('assert').strict;

//insert - 4 params for this method
//insertDocument has access to collection in connected DB, so can now use 
//insertOne() method of the collection
//since no callback in the param list, this method will return a PROMISE
exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    //find() with an empty param list means we want to find all documents in Collection
    //since no callback in the param list, this method will return a PROMISE
    return coll.find().toArray()
};

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    //the document arg is the JS object passed in that will be used to figure out
    //which document to delete.
    //since no callback in the param list, this method will return a PROMISE
    return coll.deleteOne(document)
};

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    //updateOne() has 4 params, document - info on object we want to update
    //second param is an object with the upates we want to make, we will use the $set
    //mongoDB will see that and know we want to overwrite with 'update'
    //third param to pass in optional configs
    //4th is a callback function that will give us an error or the result of the operation
    //since no callback in the param list, this method will return a PROMISE
    return coll.updateOne(document, {$set: update}, null)
};

