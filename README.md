# User Config Path

Finds and creates (if not existing) a config folder for your app. The path is OS specific.

It has no dependencies.

## Usage

```js
import { findOrCreateConfigFolder } from 'user-config-path';

let configPath = await findOrCreateConfigFolder('MyAppName');
// configPath -> `/Users/username/Library/Preferences/MyAppName`
```

## Supported OS

See also `package.json`:

- macOS
- Windows
- Linux

If your are missing an OS, please open a PR with a confirmation that this module works as expected on the desired OS.

## License

MIT
