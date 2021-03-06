// Load required packages
import Beer from "../models/beer";

exports.optionsCollection = function (req, res, next) {

    if (!res.header('Access-Control-Allow-Headers', 'Content-Type, Accept , Content-Type, Application/json, Content-Type, Application/x-www-form-urlencoded')) {
        return res.sendStatus(416);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Allow', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Content-Type', 'Application/json,  Application/x-www-form-urlencoded');
        res.setHeader('Access-Control-Allow-Accept', 'Application/json,  x-www-form-urlencoded');
        return res.sendStatus(200);
    }
};

exports.optionsDetail = function (req, res, next) {

    if (!res.header('Access-Control-Allow-Headers', 'Content-Type, Accept , Content-Type, Application/json, Content-Type, Application/x-www-form-urlencoded')) {
        res.sendStatus(416);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Content-Type', 'Application/json,  Application/x-www-form-urlencoded');
        res.setHeader('Access-Control-Allow-Accept', 'Application/json,  x-www-form-urlencoded');
        return res.sendStatus(200);
    }
};

// Create endpoint /api/beers for POST
exports.postBeers = function (req, res) {


    if (!req.body.title || !req.body.type || !req.body.quantity) {
        res.send(403);
    } else {

        // Create a new instance of the Beer model
        const beer = new Beer();

        // Set the beer properties that came from the POST data
        beer.title = req.body.title;
        beer.type = req.body.type;
        beer.quantity = req.body.quantity;

        // Save the beer and check for errors
        beer.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send(201, beer);
            }
        });
    }
};

// Create endpoint /api/beers for GET
exports.getBeers = function (req, res, next) {


    let perPage = req.query.limit;
    let page = req.query.start;

    const urlSelf = req.protocol + '://' + req.get('host') + '/api/beers';
    console.log(urlSelf);

    if (req.query.start === '' || req.query.limit === '') {
        perPage = 10;
        page = 0;
    }
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
                            },
                            collection: {
                                href: req.protocol + '://' + req.get('host') + "/api/beers"
                            }
                        },
                        pagination: {
                            currentPage: Number(page),
                            currentItems: items.length,
                            totalPages: Math.ceil(count / perPage),
                            totalItems: count,
                            _links: {
                                first: {
                                    page: 1,
                                    href: urlSelf + '?start=1&limit=' + perPage
                                },
                                last: {
                                    page: Math.ceil(count / perPage),
                                    href: urlSelf + '?start=' + Math.ceil(count / perPage) + '&limit=' + perPage
                                },
                                previous: {
                                    page: Number(page) - 1 || 1,
                                    href: urlSelf + '?start=' + (Number(page) - 1 || 1) + '&limit=' + perPage
                                },
                                next: {
                                    page: Number(page) + 1 || Math.ceil(count / perPage),
                                    href: urlSelf + '?start=' + (Number(page) + 1) + '&limit=' + perPage
                                }
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

        if (beer[0]) {
            const detail = {
                _id: beer[0]._id,
                title: beer[0].title,
                quantity: beer[0].quantity,
                type: beer[0].type,
                _links: {
                    self: {
                        href: req.protocol + '://' + req.get('host') + req.originalUrl
                    },
                    collection: {
                        href: req.protocol + '://' + req.get('host') + "/api/beers"
                    }
                }
            };

            res.send(200, detail);
        } else {
            res.send(404)
        }
    });
};


// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = async function (req, res) {

    if (!req.body.title || !req.body.type || !req.body.quantity) {
        res.send(403);
    } else {

        const beer = await Beer.findById(req.params.beer_id);

        if (!beer) {
            console.error('biertje bestaat niet');
            return;
        }


        beer.title = req.body.title || beer.title;
        beer.quantity = req.body.quantity || beer.quantity;
        beer.type = req.body.type || beer.type;

        await beer.save();
        console.log("PUT new: " + beer);
        return res.json(200, beer);
    }
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function (req, res) {
    // Use the Beer model to find a specific beer and remove it
    Beer.remove({_id: req.params.beer_id}).then(beer => {
        console.log(beer)
        if (beer.deletedCount) {
            res.send(204, 'Beer removed!');
        } else {
            res.send(404);
        }
    });
};
