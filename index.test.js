import { findOrCreateConfigFolder, configFolder } from './index';
import { stat } from 'node:fs/promises';

test('configFolder', async () => {
  let path = await configFolder('My Super App v1.1');
  expect(path).toMatch('/My_Super_App_v1.1');
});

test('findOrCreateConfigFolder', async () => {
  let path = await findOrCreateConfigFolder('My Super App v1.1');
  let result = await stat(path);
  expect(result.isDirectory()).toBeTruthy();
});
