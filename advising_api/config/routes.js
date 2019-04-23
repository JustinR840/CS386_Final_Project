const Authorize = require('../app/Authorize.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    return ctx.body = 'What is up?';
});


/**
 * Login controller
 */

const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));


/**
 * Theaters controller
 */

const TheatersController = new (require('../app/Controllers/TheatersController.js'))();
const theatersRouter = require('koa-router')({
    prefix: '/theaters'
});

theatersRouter.get('/', Authorize('admin'), TheatersController.allLocations, (err) => console.log(err));


/**
 * Movies controller
 */

const MoviesController = new (require('../app/Controllers/MoviesController.js'))();
const moviesRouter = require('koa-router')({
    prefix: '/movies'
});

moviesRouter.get('/', Authorize('admin'), MoviesController.allMovies, (err) => console.log(err));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    moviesRouter.routes(),
    theatersRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
