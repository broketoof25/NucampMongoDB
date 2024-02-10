const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
//require the operations module.  now we have access to the 4 CRUD methods in the 
//operation.js file (module)
const dboper = require('./operations');

//setup connection to MongoDB Server
const url = 'mongodb://localhost:27017/';

//name of DB we want to connect to
const dbname = 'nucampsite';

//now to connect we use the Mongo.Client.connect(), the 3rd param the function callback
//gives us access to 'client' object that we can use to interact with DB
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    //assert params err is what we are checking, null is the expected value
    //we are checking against to see if first arg equals second
    assert.strictEqual(err, null);
    console.log('Connected correctly to server');

    //interact with server through DB interactions
    //will connect us to MongoDB DB nucampsite
    //can now use the db object and it's methods to interact with DB
    const db = client.db(dbname);

    //delete all Documents
    //notice how the code is nested with a series of callback functions
    //this is because it's asynchronous since we are connecting to a DB
    //this is also callback hell and can be fixed with promise chaining
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result)

        //insert a document into the Collection
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);
                
                //in the params list - look for a Document with name: Breadcrumb Trail
                // Campground and update the description field with the value below
                dboper.updateDocument(db, {name: "Breadcrumb Trail Campground"}, {description: "Updated Test Description"}, 'campsites', result => {
                    console.log("Updated Document Count: ", result.result.nModified);

                    //call findDocuments again and console.log to confirm update has 
                    //occured
                    dboper.findDocuments(db, 'campsites', docs => {
                        console.log("Found Documents: ", docs);

                        dboper.removeDocument(db, {name: "Breadcrumb Trail Campground"}, 'campsites', result => {
                            console.log('Deleted Document Count: ', result.deletedCount)

                            //close connection
                            client.close();
                        }   
                    );
                });
            }    
        );
    });
});
});
});
