export interface ConfigObject<T> {
    readonly [k: string]: T;
}
export interface Params {
    readonly envFile?: string;
    readonly configFile?: string;
    readonly rootDir?: string;
}
declare const gcpl: <T = any>({envFile, configFile, rootDir}: Params) => ConfigObject<T>;
export default gcpl;
