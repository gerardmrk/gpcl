import { lstatSync, existsSync } from "fs";

const findConfigFile = (rootDir: string, toMatch: string[]): string => {
  toMatch = toMatch.map((file: string) => {
    return `${rootDir}/${file}`;
  });

  let configFile: string;

  for (let i = 0, x = toMatch.length; i < x; i++) {
    let ctx = toMatch[i];

    if (existsSync(ctx) && lstatSync(ctx).isFile()) {
      configFile = ctx;
      break;
    }
  }

  return configFile;
};

export default findConfigFile;
