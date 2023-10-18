"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
//protected-api route, and it checks if the user has the 'view_data' permission
const authorize = (api) => {
    return (req, res, next) => {
        const permissions = res.locals.user?.role?.permissions || [];
        if (permissions.filter(p => p.name === api).length > 0) {
            next();
        }
        else {
            res.status(403).send("You don't have the permission to access this resource!");
        }
    };
};
exports.authorize = authorize;
