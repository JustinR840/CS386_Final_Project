const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

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
 * Advisees controller
 */

const AdviseesController = new (require('../app/Controllers/AdviseesController.js'))();
const adviseesRouter = require('koa-router')({
    prefix: '/advisees'
});

adviseesRouter.use(VerifyJWT);
adviseesRouter.get('/', Authorize('admin'), AdviseesController.allAdvisees, (err) => console.log(err));
adviseesRouter.get('/:advisee_id', Authorize('admin'), AdviseesController.adviseeInformation, (err) => console.log(err));
adviseesRouter.get('/:advisee_id/advisors', Authorize('admin'), AdviseesController.advisorsForAdvisee, (err) => console.log(err));


/**
 * Advisors controller
 */

const AdvisorsController = new (require('../app/Controllers/AdvisorsController.js'))();
const advisorsRouter = require('koa-router')({
    prefix: '/advisors'
});

advisorsRouter.use(VerifyJWT);
advisorsRouter.get('/', Authorize('advisor'), AdvisorsController.allAdvisors, (err) => console.log(err));
advisorsRouter.get('/:advisor_id', Authorize('advisor'), AdvisorsController.advisorInformation, (err) => console.log(err));
advisorsRouter.get('/:advisor_id/advisees', Authorize('advisor'), AdvisorsController.adviseesForAdvisor, (err) => console.log(err));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    adviseesRouter.routes(),
    advisorsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
