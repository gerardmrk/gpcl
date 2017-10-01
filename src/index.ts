/**
 * This whole function must be inherently synchronous;
 * 
 * since this is mainly invoked pre-initialization for configs like
 * webpack, fusebox, gulp, etc., making this function asynchronous
 * will create awkward workarounds in the config files (e.g. you can't
 * initialize gulp's default tasks in a then callback).
 */
import { exit } from "process";
import { resolve } from "path";
import { readFileSync } from "fs";

import { load, Type, Schema } from "js-yaml";

import findRootDir from "./findRootDir";
import findConfigFile from "./findConfigFile";
import getConfigObj, { ConfigObject } from "./getConfigObj";

// export for testing.
// this is actually private API
export const _configLoader = (
  configFileMatch: string[],
  rootDirMatch: string[],
  cwd?: string
) => <T = any>(
  configFile?: string,
  rootDir?: string | void
): ConfigObject<T> => {
  if (!cwd) {
    // for testing purposes
    cwd = process.cwd();
  }

  if (!rootDir) {
    // if rootDir not specified, walk up directory tree and find it.
    rootDir = findRootDir(cwd, rootDirMatch);
  }

  if (!configFile && rootDir) {
    // if `configFile` not specified, but `rootDir` was specified OR derived,
    // attempt to find `configFile` using `rootDir`.
    // note: order matters here; if the first result matches and the others
    // are also valid, it will short circuit anyways.
    configFile = findConfigFile(rootDir, configFileMatch);
  }

  if (!configFile || !rootDir) {
    // if neither `configFile` & `rootDir` were specified nor were they found/derived
    throw new Error(
      "gpcl: root dir or/and config not specified and cannot be found"
    );
  }

  // load the config
  const config = getConfigObj<T>(configFile, rootDir as string);

  return config;
};

export const loadConfigSync = _configLoader(
  [
    "config.yml",
    "project.yml",
    "settings.yml",
    ".config/config.yml",
    ".config/project.yml",
    ".config/settings.yml",
    "config/config.yml",
    "config/project.yml",
    "config/settings.yml"
  ],
  ["package.json", "node_modules"]
);
