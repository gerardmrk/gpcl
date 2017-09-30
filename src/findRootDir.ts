import { readdirSync } from "fs";

const findRootDir = (pwd: string, toMatch: string[]): string | void => {
  const scan = handleScanDir(toMatch);
  const paths = pwd.substring(1).split("/");

  let ctx = pwd;

  for (let i = paths.length - 1; i >= 0; i--) {
    const isRoot = scan(ctx);
    if (isRoot) break;
    ctx = ctx.substring(0, ctx.length - paths[i].length - 1);
  }
  console.log(ctx);

  return ctx;
};

const handleScanDir = (toMatch: string[]) => (dir: string): boolean => {
  const files = readdirSync(dir);
  const v = new Set([...files, ...toMatch]);
  return files.length === v.size;
};

export default findRootDir;
