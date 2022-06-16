import * as os from 'os';
import { stat, mkdir } from 'node:fs/promises';

const homedir = os.homedir();
// Possible values are 'aix', 'darwin', 'freebsd','linux', 'openbsd', 'sunos', and 'win32'.
const osSystem = os.platform();

async function configPath() {
  let path = homedir;

  if (osSystem === 'win32') {
    let windowsPath = process.env.APPDATA;
    if (!windowsPath) {
      throw Error(
        `Could not find APPDATA in process env (this should not happen). Please set a custom value for process env 'APPDATA' to proceed.`
      );
    }
    return windowsPath;
  }

  if (osSystem === 'darwin') {
    let darwinPath = `${path}/Library/Preferences`;
    return darwinPath;
  }

  // if no os-specific rules are found, use the $XDG_CONFIG_HOME || $HOME/.config path
  if (process.env['XDG_CONFIG_HOME']) {
    path = process.env['XDG_CONFIG_HOME'];
  } else {
    path = `${homedir}/.config`;
  }
  return path;
}

export async function configFolder(appName) {
  // sanatize for folder name
  appName = appName.replace(/[^A-Za-z0-9\.-_]/g, '_');
  return `${await configPath()}/${appName}`;
}

export async function findOrCreateConfigFolder(appName) {
  const path = await configFolder(appName);
  try {
    await stat(path);
  } catch (e) {
    if (e.message.match('ENOENT: no such file or directory')) {
      await mkdir(path, { recursive: true });
    } else {
      throw e;
    }
  }

  return path;
}
