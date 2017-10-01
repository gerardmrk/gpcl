const { resolve } = require("path");

const test = require("ava");

const findConfigFile = require("../lib/findConfigFile").default;

const rootDir = resolve(__dirname, "mock_dir");

// valid config file paths
const valid00 = ".config/settings.yml";
const valid01 = "config.yml";
const valid02 = ".config/main.yml";
const valid03 = ".config/terraform/_meta/config.yml";
const valids = [valid01, valid02, valid03];

// invalid config file paths
const invalids = [
  ".config/scripts/index.yml",
  "project.yml",
  "src/vault/vault-config.hcl"
];

let mix = [];

// zip-merge arrays for a realistic input scenario
for (let i = 0, x = valids.length; i < x; i++) {
  mix.push(valids[i]);
  mix.push(invalids[i]);
}

test("returns the only first valid path found", t => {
  let configFile = findConfigFile(rootDir, mix);
  t.is(configFile, `${rootDir}/${valid01}`);

  const newMix = [valid00, ...mix];
  configFile = findConfigFile(rootDir, newMix);

  t.is(configFile, `${rootDir}/${valid00}`);
});

test("returns undefined if no valid paths found", t => {
  const configFile = findConfigFile(rootDir, invalids);
  t.falsy(configFile);
});

test("ignores a valid path that isn't a file", t => {
  const invalidValid = ".config/terraform";
  const newMix = [invalidValid, ...mix];

  const configFile = findConfigFile(rootDir, newMix);

  t.not(configFile, `${rootDir}/${invalidValid}`);
  t.is(configFile, `${rootDir}/${valid01}`);
});
