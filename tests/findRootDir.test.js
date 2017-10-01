import { resolve } from "path";

import test from "ava";

import findRootDir from "../.cache_tests/findRootDir";

const criteria = [
  ".config",
  "dist",
  "match_01.json",
  "match_02.json",
  "match_03.json",
  "main.go"
];

// fake the current execution location
const cwd = resolve(
  __dirname,
  "mock_dir",
  "src",
  "scripts",
  "eden",
  "build_assets"
);

const expectedRootDir = resolve(__dirname, "mock_dir", "src", "scripts");

test("returns the FIRST parent dir path that matches all the given criteria", async t => {
  const rootDir = findRootDir(cwd, criteria);
  t.is(rootDir, expectedRootDir);
});

test("returns undefined if no parent dir matches [all] the criteria", async t => {
  const rootDir = findRootDir(cwd, [
    ".gitignore",
    ".git",
    "package-lock.json",
    "_0_1_2_3_4_5_6_7.hcl"
  ]);

  t.falsy(rootDir);
});
