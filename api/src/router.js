import express from "express";
import * as beerController from "./controllers/beer";
import * as userController from "./controllers/user";
import * as authController from "./controllers/auth";

const router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
    .options(beerController.options)
    .get(beerController.getBeers)
    .post(beerController.postBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
    .options(beerController.options)
    .get(beerController.getBeer)
    .put(beerController.putBeer)
    .delete(beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

module.exports = router;
