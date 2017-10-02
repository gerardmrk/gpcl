[![npm](https://img.shields.io/npm/v/gpcl.svg)](https://www.npmjs.com/package/gpcl)
[![Dependency Status](https://www.versioneye.com/user/projects/59d082b015f0d723152e3587/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59d082b015f0d723152e3587)
[![Coverage Status](https://coveralls.io/repos/github/gerardmrk/gpcl/badge.svg?branch=master)](https://coveralls.io/github/gerardmrk/gpcl?branch=master)
[![Build Status](https://travis-ci.org/gerardmrk/gpcl.svg?branch=master)](https://travis-ci.org/gerardmrk/gpcl)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

# gpcl

A generic project configuration loader with a simple path-finder.

It searches for your config file and loads it.

No more `someConfigLoader(resolve(__dirname, '..', '..', '..', 'config', 'main.yml'))` !

## Installation:

```
$ yarn add gpcl
```

## Usage:

1. Add a **YAML** file to your project directory (see [here](#configpath) for default supported locations).
2. Call `loadConfigSync()` in your script to access your config object.

## Example:

**src/backend/web/app/setup.js**
```js
import { loadConfigSync } from "gpcl";

const config = loadConfigSync();
// ...
```

**.config/config.yml**
```yml
IAC:
  Region: !env AWS_REGION
  Stage: !env APP_ENV

  Templates:
    Local: !path lib/blueprints
    BucketKey: infrastructure/blueprints

Development:
  ServerAddr: '0.0.0.0:4200'
  Hateoas: !path .meta/dev/docker_endpoints.json
```

***Output:***
```json
{
  "IAC": {
    "Region": "ap-southeast-2",
    "Stage": "staging",
    "Templates": {
      "Local": "/Users/x/DevProjects/xo/lib/blueprints",
      "BucketKey": "infrastructure/blueprints"
    }
  },
  "Development": {
    "ServerAddr": "0.0.0.0:4200",
    "Hateoas": "/Users/x/DevProjects/xo/.meta/dev/docker_endpoints.json"
  }
}
```

## API:

### `loadConfigSync(configPath?: string, rootDir?: string)`

#### rootDir:
- absolute path of your root project directory. If not specified, it will walk up the directory tree to find it. Indicators are:
  - `package.json`
  - `node_modules`

#### configPath:
- absolute path of your config file. If not specified, it will look for your config file in this order (first in `<rootDir>`, then in `<rootDir>/config` and vice versa):

  - `<rootDir[/.config, /config]>/config.yml`
  - `<rootDir[/.config, /config]>/project.yml`
  - `<rootDir[/.config, /config]>/settings.yml`

Both params are optional. If you'd like to specify **`rootDir`** without specifying **`configPath`**,
just pass in `undefined` as the first parameter.

***Note**: an error will be thrown if both values are not specified AND cannot be inferred.*

## Supported YAML Types:

Supports anything that is parsable by [`js-yaml`](https://github.com/nodeca/js-yaml#supported-yaml-types), plus 2 additional custom types:

1. `!env` type
    - for referencing an environment variable
    - I.E. `process.env[!env]`
    - E.G. `!env NODE_ENV` => `'production'`
2. `!path` type
    - for referencing a path relative from the root directory
    - I.E. `<rootDir>/<!path>`
    - E.G. `!path src/app.js` => `/Users/xo/web/src/app.js`

## Type Definitions:

This comes bundled with its own type definitions for **TypeScript**, so you'll get auto-complete and hints if you're using the Visual Studio Code IDE.

## Todos:

- [x] complete all tests
- [x] bump npm package to v1
- [ ] write and test for Go
- [ ] generate godocs
- [ ] set go package version

## Remarks

I created this after repetitively copy-pasting the same code across various private side-projects for loading configuration, and it became tedious to use `path.resolve(__dirname, '..', '..', '..' /* etc */)` on the same config file when calling it from multiple places in the codebase.

If this does not fit your needs, feel free to fork or contribute!
