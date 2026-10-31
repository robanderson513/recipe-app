const { spawnSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { homedir } = require('node:os');
const { join } = require('node:path');

function getNpmrc({ env = process.env, npmrcPath = join(homedir(), '.npmrc') } = {}) {
  if (env.GITHUB_NPMRC?.trim()) {
    return env.GITHUB_NPMRC;
  }

  let npmrc;
  try {
    npmrc = readFileSync(npmrcPath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(
        `GitHub Packages credentials are unavailable: ${npmrcPath} was not found. Sign in with npm or set GITHUB_NPMRC.`
      );
    }
    throw error;
  }

  if (!npmrc.trim()) {
    throw new Error(
      `GitHub Packages credentials are unavailable: ${npmrcPath} is empty. Sign in with npm or set GITHUB_NPMRC.`
    );
  }

  return npmrc;
}

function run() {
  let npmrc;
  try {
    npmrc = getNpmrc();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const result = spawnSync('docker', ['compose', ...process.argv.slice(2)], {
    env: { ...process.env, GITHUB_NPMRC: npmrc },
    stdio: 'inherit'
  });

  if (result.error) {
    console.error(`Failed to run Docker Compose: ${result.error.message}`);
    process.exitCode = 1;
    return;
  }

  process.exitCode = result.status ?? 1;
}

if (require.main === module) {
  run();
}

module.exports = { getNpmrc };
