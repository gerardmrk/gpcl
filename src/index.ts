import { resolve } from "path";
import { readFileSync } from "fs";

import { config as env } from "dotenv";
import { load, Type, Schema } from "js-yaml";

export interface ConfigObject<T> {
  readonly [k: string]: T;
}

export interface Params {
  readonly envFile?: string;
  readonly configFile?: string;
  readonly rootDir?: string;
}

const gcpl = <T = any>({
  envFile,
  configFile,
  rootDir
}: Params): ConfigObject<T> => {
  // TODO: search up the directory tree for the paths that were not specified
  if (!envFile) envFile = ".env";
  if (!configFile) configFile = "config.yml";
  if (!rootDir) rootDir = process.cwd();

  // load custom environment variables
  env({ path: envFile });

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

export default gcpl;
