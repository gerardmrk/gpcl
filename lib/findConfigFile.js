"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var findConfigFile = function (rootDir, toMatch) {
    toMatch = toMatch.map(function (file) {
        return rootDir + "/" + file;
    });
    var configFile;
    for (var i = 0, x = toMatch.length; i < x; i++) {
        var ctx = toMatch[i];
        if (fs_1.existsSync(ctx) && fs_1.lstatSync(ctx).isFile()) {
            configFile = ctx;
            break;
        }
    }
    return configFile;
};
exports.default = findConfigFile;
