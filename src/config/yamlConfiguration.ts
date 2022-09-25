import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { config } from 'dotenv';
import { type } from 'os';

const YAML_DEFAULT_FILE = '../config/config.yml';
const YAML_OVERRIDE_FILE = '../config/config.override.yml';

type ConfigElt = Record<string, any>;

function generateConfig(): ConfigElt {
  let defaultConfig: ConfigElt;
  let overrideConfig: ConfigElt;

  //#region File loading
  try {
    defaultConfig = yaml.load(readFileSync(join(__dirname, YAML_DEFAULT_FILE), 'utf-8')) as ConfigElt;
  } catch (error) {
    throw new Error(error as string);
  }

  try {
    overrideConfig = yaml.load(readFileSync(join(__dirname, YAML_OVERRIDE_FILE), 'utf-8')) as ConfigElt;
  } catch (error) {
    console.log('[INFO] Override file not found, skipping');
  }
  //#endregion

  if (overrideConfig) {
    for (const k in defaultConfig) {
      if (typeof defaultConfig[k] === 'object' && overrideConfig[k] != undefined) {
        for (const l in defaultConfig[k]) {
          if (overrideConfig[k][l] != undefined) {
            defaultConfig[k][l] = overrideConfig[k][l];
          }
        }
      }
    }
  }

  // Generation of connection string for prisma
  try {
    defaultConfig.db.url = defaultConfig.db.engine + '://' + defaultConfig.db.user + ':' + defaultConfig.db.password + '@' + defaultConfig.db.host + ':' + defaultConfig.db.port + '/' + defaultConfig.db.name + '?' + defaultConfig.db.args;
  } catch (error) {
    throw new Error('Cannot build connection string : ' + error);
  }

  return defaultConfig;
}

export default () => {
  return generateConfig();
};
