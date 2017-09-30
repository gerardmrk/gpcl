"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var findRootDir = function (pwd, toMatch) {
    var scan = handleScanDir(toMatch);
    var paths = pwd.substring(1).split("/");
    var ctx = pwd;
    for (var i = paths.length - 1; i >= 0; i--) {
        var isRoot = scan(ctx);
        if (isRoot)
            break;
        ctx = ctx.substring(0, ctx.length - paths[i].length - 1);
    }
    return ctx;
};
var handleScanDir = function (toMatch) { return function (dir) {
    var files = fs_1.readdirSync(dir);
    var uniques = new Set(files.concat(toMatch));
    return files.length === uniques.size;
}; };
exports.default = findRootDir;
