export interface ConfigObject<T> {
    readonly [k: string]: T;
}
declare const getConfigObj: <T>(configFile: string, rootDir: string) => ConfigObject<T>;
export default getConfigObj;
