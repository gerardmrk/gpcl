import { resolve } from "path";

import test from "ava";

import { _configLoader } from "../.cache_tests";

const configPath = resolve(__dirname, "assets", "valid_config.yml");
// fake the current execution location
const cwd = resolve(
  __dirname,
  "mock_dir",
  "src",
  "scripts",
  "eden",
  "build_assets"
);

test("loads config with both params specified", async t => {
  const loadConfigSync = _configLoader([], []);

  const config = loadConfigSync(configPath, "xx");

  t.truthy(config);
  // verify the rootDir was correctly passed in
  t.true(config.Path.startsWith("xx"));
});

test("infers root directory when not specified", async t => {
  const loadConfigSync = _configLoader([], ["main.go", "match_03.json"], cwd);
  const expectedRootDir = resolve(__dirname, "mock_dir", "src", "scripts");
  const config = loadConfigSync(configPath);
  t.true(config.Path.startsWith(expectedRootDir));
});

test("infers config path when not specified but root dir is specified", async t => {
  const loadConfigSync = _configLoader(["vault/vault.yml"], []);
  const config = loadConfigSync(
    undefined,
    resolve(__dirname, "mock_dir", "src")
  );
  t.truthy(config.gpcl);
  t.true(Array.isArray(config.gpcl));
});

test("gracefully exits if both params not specified and cannot be inferred", async t => {
  const loadConfigSync = _configLoader(["not_like_this.yml"], ["dank_memes"]);

  t.throws(() => {
    const config = loadConfigSync();
  });
});
