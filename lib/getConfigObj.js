"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var js_yaml_1 = require("js-yaml");
var getConfigObj = function (configFile, rootDir) {
    // declare custom schema
    var configSchema = js_yaml_1.Schema.create([
        // enable environment variable references in the Yaml file
        new js_yaml_1.Type("!env", {
            kind: "scalar",
            construct: function (env) { return process.env[env]; }
        }),
        // enable path references (resolved from root project dir) in the Yaml file
        new js_yaml_1.Type("!path", {
            kind: "scalar",
            construct: function (path) { return rootDir + "/" + path; }
        })
    ]);
    // load the Yaml file and return an object of its content
    return js_yaml_1.load(fs_1.readFileSync(configFile, "utf8"), {
        schema: configSchema
    });
};
exports.default = getConfigObj;
