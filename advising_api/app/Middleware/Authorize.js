const setAccessToken = require('../../config/setAccessToken');


module.exports = (min_type) => {
    return (ctx, next) => {
        const user_type = ctx.state.jwtdata.user.role;
        let authorized = false;

        if(min_type === "advisor" && user_type === "advisor")
        {
            authorized = true;
        }
        else if(min_type === "advisee")
        {
            if(user_type === "advisor" || user_type === "advisee")
            {
                authorized = true;
            }
        }

        if(authorized)
        {
            setAccessToken(ctx, ctx.state.jwtdata.user);
            return next();
        }

        return false;
    };
};
