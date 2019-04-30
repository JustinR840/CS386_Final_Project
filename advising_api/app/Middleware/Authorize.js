const setAccessToken = require('../../config/setAccessToken');


module.exports = (min_type) => {
    return (ctx, next) => {
        console.log('min_type in authorize is ', min_type);

        console.log('In Authorize. ctx.state = ', ctx.state);
        console.log('In Authorize. ctx.state.jwtdata = ', ctx.state.jwtdata);

        const user_type = ctx.state.jwtdata.user.role;

        if (min_type === 'advisor' && user_type !== 'advisor') {
            console.log("min type " + min_type + " !== " + user_type);
            console.log("user not authorized");
            return false;
        }
        else if(min_type === 'advisee' && user_type !== 'advisee') {
            console.log("min type " + min_type + " !== " + user_type);
            console.log("user not authorized");
            return false;
        }
        else if(min_type === 'admin' && user_type !== 'admin') {
            console.log("min type " + min_type + " !== " + user_type);
            console.log("user not authorized");
            return false;
        }
        setAccessToken(ctx, ctx.state.jwtdata.user);
        return next();
    };
};
