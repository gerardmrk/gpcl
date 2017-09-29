"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var dotenv_1 = require("dotenv");
var js_yaml_1 = require("js-yaml");
var gcpl = function (_a) {
    var envFile = _a.envFile, configFile = _a.configFile, _b = _a.rootDir, rootDir = _b === void 0 ? process.cwd() : _b;
    // load custom environment variables
    dotenv_1.config({ path: envFile });
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
exports["default"] = gcpl;
//# sourceMappingURL=index.js.map