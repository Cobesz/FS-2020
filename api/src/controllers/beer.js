// Load required packages
import Beer from "../models/beer";


exports.options = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        res.send(403);
    }
};

// Create endpoint /api/beers for POST
exports.postBeers = function (req, res) {

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
};

// Create endpoint /api/beers for GET
exports.getBeers = function (req, res, next) {
    const perPage = req.query.limit || 2;
    const page = req.query.start || 1;
    // const limit = req.params.limit || 0;

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
                            currentPage: page,
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
//     function(err, count) {
//     if (err) return next(err);
//
//     res.render('main/products', {
//         products: products,
//         current: page,
//         pages: Math.ceil(count / perPage)
//     })
// }
//     )
// })
// }

//     function (req, res) {
//     // Use the Beer model to find all beer
//     Beer.find(function (err, beers) {
//         if (err)
//             res.send(err);
//
//         let items = [];
//         for (let i = 0; i < beers.length; i++) {
//             let item = beers[i].toJSON();
//             item._links = {
//                 self: {
//                     href: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + item._id
//                 }
//             };
//             items.push(item);
//         }
//         let collection = {
//             items: items,
//             _links: {
//                 self: {
//                     href: req.protocol + '://' + req.get('host') + req.originalUrl
//                 }
//             },
//             pagination: 'hele dikke paginatie bla'
//         };
//         res.json(collection);
//     });
// };

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
