const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

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

        //recreate campsites Collection
        const collection = db.collection('campsites');

        //insert a document into the Collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            //print to console all the Documents, give collection.find() an empty parameter list to do this.  then chain a toArray() to it
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                //close connection
                client.close();
            });
        });

    });
});