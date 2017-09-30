"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This whole function must be inherently synchronous;
 *
 * since this is mainly invoked pre-initialization for configs like
 * webpack, fusebox, gulp, etc., making this function asynchronous
 * will create awkward workarounds in the config files (e.g. you can't
 * initialize gulp's default tasks in a then callback).
 */
var process_1 = require("process");
var findRootDir_1 = require("./findRootDir");
var findConfigFile_1 = require("./findConfigFile");
var getConfigObj_1 = require("./getConfigObj");
exports.loadConfig = function (configFile, rootDir) {
    if (!rootDir) {
        // if rootDir not specified, walk up directory tree and find it.
        rootDir = findRootDir_1.default(process.cwd(), [
            "package.json",
            ".git",
            ".gitignore",
            ".config"
        ]);
    }
    if (!configFile && rootDir) {
        // if `configFile` not specified, but `rootDir` was specified OR derived,
        // attempt to find `configFile` using `rootDir`.
        // note: order matters here; if the first result matches and the others
        // are also valid, it will short circuit anyways.
        configFile = findConfigFile_1.default(rootDir, [
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
        return process_1.exit(1);
    }
    var config = getConfigObj_1.default(configFile, rootDir);
    return config;
};
