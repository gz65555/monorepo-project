const { execSync } = require("child_process");
const micromatch = require("micromatch");

const map = {
  main: "latest",
  "dev/*": "beta",
  "[0-9]+.[0-9]+": "latest"
};

const stdout = execSync("git branch --show-current", { encoding: "utf-8" });
const branch = stdout.trim();
const keys = Object.keys(map);
const result = micromatch(branch, keys);
if (result.length > 0) {
  const tag = map[result[0]];
  try {
    execSync(`pnpm publish -r --tag ${tag} --no-git-checks`, { cwd: process.cwd() });
  } catch (error) {
    console.error("执行命令时出错:", error.message);
    console.error("错误输出:", error.output[1].toString());
  }
} else {
  console.log(`no match for the ${branch} branch, stop release`);
}
