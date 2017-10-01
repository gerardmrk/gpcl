import { readFileSync } from "fs";

import { load, Type, Schema } from "js-yaml";

export interface ConfigObject<T> {
  readonly [k: string]: T;
}

const getConfigObj = <T>(
  configFile: string,
  rootDir: string
): ConfigObject<T> => {
  const configSchema: Schema = Schema.create([
    new Type("!env", {
      kind: "scalar",
      construct: env => process.env[env]
    }),
    new Type("!path", {
      kind: "scalar",
      construct: path => `${rootDir}/${path}`
    })
  ]);

  return load(readFileSync(configFile, "utf8"), {
    schema: configSchema
  });
};

export default getConfigObj;
