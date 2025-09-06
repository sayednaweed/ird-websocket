import { IUser } from "../v1/models/user";
import { MysqlTokenPayload } from "../v1/models/mysql-token-payload";
import { Request } from "express";

declare module "express" {
  interface Request {
    user?: IUser;
    mysqlTokenPayload?: MysqlTokenPayload;
  }
}
