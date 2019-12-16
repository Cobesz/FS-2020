// Load required packages
import Beer from "../models/beer";

let headers = {};

headers['Access-Control-Allow-Origin'] = '*';
headers['Content-Type'] = 'Content-Type', 'application/json';
headers['Content-Type'] = 'Content-Type', 'application/x-www-form-urlencoded';
headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
headers['Allow'] = 'GET, POST, OPTIONS';
headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
headers['Content-Length'] = '0';
headers["Access-Control-Max-Age"] = '86400';

exports.options = function (req, res, next) {

    if (req.method === 'OPTIONS') {
        res.writeHead(200, headers);

        res.send();
    } else {
        res.send(403);
    }
};

// Create endpoint /api/beers for POST
exports.postBeers = function (req, res) {

    console.log(req.body);

    if (!req.body.name || !req.body.type || !req.body.quantity) {
        res.send(403);
    } else {

        // Create a new instance of the Beer model
        const beer = new Beer();

        // Set the beer properties that came from the POST data
        beer.name = req.body.name;
        beer.type = req.body.type;
        beer.quantity = req.body.quantity;

        // Save the beer and check for errors
        beer.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send(beer);
            }
        });
    }
};

// Create endpoint /api/beers for GET
exports.getBeers = function (req, res, next) {
    const perPage = req.query.limit || 0;
    const page = req.query.start || 1;

    console.log(req.query);

    Beer.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, beers) {
            Beer.count().exec(
                function (err, count) {
                    if (err)
                        res.send(err);

                    let items = [];
                    for (let i = 0; i < beers.length; i++) {
                        let item = beers[i].toJSON();
                        item._links = {
                            self: {
                                href: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + item._id
                            }
                        };
                        items.push(item);
                    }
                    let collection = {
                        items: items,
                        _links: {
                            self: {
                                href: req.protocol + '://' + req.get('host') + req.originalUrl
                            }
                        },
                        pagination: {
                            currentPage: Number(page),
                            currentItems: perPage,
                            totalPages: Math.ceil(count / perPage),
                            totalItems: count,
                            _links: {
                                first: {
                                    page: 1,
                                    href: req.protocol + '://' + req.get('host') + req.originalUrl + "?start=" + page + "&limit=" + perPage
                                },
                            }
                        }
                    };
                    if (err) {
                        return next(err)
                    } else
                        res.json(collection);
                });
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
