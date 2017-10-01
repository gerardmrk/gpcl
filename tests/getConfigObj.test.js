import { resolve } from "path";

import test from "ava";

import getConfigObj from "../lib/getConfigObj";

const validConfig = resolve(__dirname, "assets", "valid_config.yml");
const invalidConfig = resolve(__dirname, "assets", "invalid_config.yml");

test("successfully parses with the added custom types", async t => {
  process.env.GPCL = "test";
  const rootDir = "sleepless";
  const configObj = getConfigObj(validConfig, rootDir);
  t.is(configObj.Env, "test");
  t.true(configObj.Path.startsWith(rootDir));
});

test("throws an error if invalid syntax", async t => {
  t.throws(() => {
    getConfigObj(invalidConfig, "");
  }, /^YAMLException/);
});
