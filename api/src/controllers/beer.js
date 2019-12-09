// Load required packages
import Beer from "../models/beer";

exports.options = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method

    //respond with 200
    res.send(200);
    next();
};

// Create endpoint /api/beers for POST
exports.postBeers = function (req, res) {

    // Create a new instance of the Beer model
    const beer = new Beer();


    // Set the beer properties that came from the POST data
    beer.items[0] = {
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity
    };

    beer.pagination = 'Dikke pagination bla';
    beer._links.self.href = req.protocol + '://' + req.get('host') + req.originalUrl;

    // Save the beer and check for errors
    beer.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send(beer);
        }
    });
};

// Create endpoint /api/beers for GET
exports.getBeers = function (req, res) {
    // Use the Beer model to find all beer
    Beer.find(function (err, beers) {
        if (err)
            res.send(err);

        res.json(beers);
    });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function (req, res) {
    // Use the Beer model to find a specific beer
    Beer.find({_id: req.params.beer_id}, function (err, beer) {
        if (err)
            res.send(err);

        res.json(beer);
    });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function (req, res) {
    // Use the Beer model to find a specific beer
    Beer.update({_id: req.params.beer_id}, {quantity: req.body.quantity}, function (err, num, raw) {
        if (err)
            res.send(err);

        res.json({message: num + ' updated'});
    });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function (req, res) {
    // Use the Beer model to find a specific beer and remove it
    Beer.remove({_id: req.params.beer_id}, function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Beer removed from the locker!'});
    });
};
