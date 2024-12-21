/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    PORT: number
    MONGO_URI: string
  }
  export const config: Config
  export type Config = IConfig
}
