const MongoClient = require('mongodb').MongoClient;
//don't need asserts anymore, was just using for basic error handling while demonstrating
//callback hell.  The returned PROMISE will either RESOLVE or REJECT

//const assert = require('assert').strict;

//require the operations module.  now we have access to the 4 CRUD methods in the 
//operation.js file (module)
const dboper = require('./operations');

//setup connection to MongoDB Server
const url = 'mongodb://localhost:27017/';

//name of DB we want to connect to
const dbname = 'nucampsite';

//now to connect we use the Mongo.Client.connect()
//gives us access to 'client' object that we can use to interact with DB
//the below method returns a PROMISE so we can chain with a .then, if RESOLVE will return
//'client' as resolved value.  The PROMISE .then method takes a callback function as it's
//parameter
//the MongoClient method below returns a PROMISE, if it fails it gets caught in the CATCH at the bottom  
MongoClient.connect(url, {useUnifiedTopology: true}).then(client => {

    console.log('Connected correctly to server');

    //interact with server through DB interactions
    //will connect us to MongoDB DB nucampsite
    //can now use the db object and it's methods to interact with DB
    const db = client.db(dbname);

    //delete all Documents
    //notice how the code is nested with a series of callback functions
    //this is because it's asynchronous since we are connecting to a DB
    //this is also callback hell and can be fixed with promise chaining
    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection', result);
    })
    .catch(err => {
        console.log('No collection to drop.')
    })

    //insert a document into the Collection
    //insertDocument handles below handles each of the DB operations below in CHAIN, waiting for the first to 
    //resolve, then continuing on to next.
    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites') 
    //since we are using .then to chain, the RESULT variable below will hold the value from the PROMISE
    .then (result => {
        console.log('Insert Document:', result.ops);

            return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);
    
                
                //in the params list - look for a Document with name: Breadcrumb Trail
                // Campground and update the description field with the value below
        return dboper.updateDocument(db, {name: "Breadcrumb Trail Campground"}, {description: "Updated Test Description"}, 'campsites');
    })
    .then(result => {
        console.log("Updated Document Count: ", result.result.nModified);

        //call findDocuments again and console.log to confirm update has 
        //occured
        return dboper.findDocuments(db, 'campsites'); 
    })
    .then (docs => {
        console.log("Found Documents: ", docs);

        return dboper.removeDocument(db, {name: "Breadcrumb Trail Campground"}, 'campsites');
    })
    .then (result => {
        console.log('Deleted Document Count: ', result.deletedCount)

        //close connection
        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
//we can chain the catch method here
.catch(err => console.log(err));
