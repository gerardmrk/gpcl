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

export const loadConfigSync = <T = any>(
  configFile?: string,
  rootDir?: string | void
): ConfigObject<T> => {
  if (!rootDir) {
    // if rootDir not specified, walk up directory tree and find it.
    rootDir = findRootDir(process.cwd(), [
      "package.json",
      ".git",
      ".gitignore",
      "node_modules"
    ]);
  }

  if (!configFile && rootDir) {
    // if `configFile` not specified, but `rootDir` was specified OR derived,
    // attempt to find `configFile` using `rootDir`.
    // note: order matters here; if the first result matches and the others
    // are also valid, it will short circuit anyways.
    configFile = findConfigFile(rootDir, [
      "config.yml",
      "settings.yml",
      ".config/config.yml",
      ".config/settings.yml",
      ".config/main.yml",
      ".config/index.yml",
      ".config/project.yml"
    ]);
  }

  if (!configFile || !rootDir) {
    // if neither `configFile` & `rootDir` were specified nor were they
    // found/derived, log an error and exit process (rather than throwing an exception)
    console.error("root dir or/and config not specified or found");
    return exit(1);
  }

  // load the config
  const config: ConfigObject<T> = getConfigObj<T>(configFile, rootDir);

  return config;
};
