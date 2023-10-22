"use strict";
// import express from 'express';
// import { UserNS } from '../@types/user.js';
// //protected-api route, and it checks if the user has the 'view_data' permission
// const authorize = (api: string) => {
//   return (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const permissions: UserNS.Permission[] = res.locals.user?.role?.permissions || [];
//     if (permissions.filter(p => p.name === api).length > 0) {
//       next();
//     } else {
//       res.status(403).send("You don't have the permission to access this resource!");
//     }
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
// export {
//   authorize
// };
