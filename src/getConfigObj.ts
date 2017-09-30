import { readFileSync } from "fs";

import { load, Type, Schema } from "js-yaml";

export interface ConfigObject<T> {
  readonly [k: string]: T;
}

const getConfigObj = <T>(
  configFile: string,
  rootDir: string
): ConfigObject<T> => {
  // declare custom schema
  const configSchema: Schema = Schema.create([
    // enable environment variable references in the Yaml file
    new Type("!env", {
      kind: "scalar",
      construct: env => process.env[env]
    }),
    // enable path references (resolved from root project dir) in the Yaml file
    new Type("!path", {
      kind: "scalar",
      construct: path => `${rootDir}/${path}`
    })
  ]);

  // load the Yaml file and return an object of its content
  return load(readFileSync(configFile, "utf8"), {
    schema: configSchema
  });
};

export default getConfigObj;
