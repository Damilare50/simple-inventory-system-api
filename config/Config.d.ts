/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    PORT: number
    MONGO_URI: string
    JWT_SECRET: string
    JWT_EXPIRY: string
  }
  export const config: Config
  export type Config = IConfig
}
