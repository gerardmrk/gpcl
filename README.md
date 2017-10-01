[![npm](https://img.shields.io/npm/v/gpcl.svg)](https://www.npmjs.com/package/gpcl)
[![Dependency Status](https://www.versioneye.com/user/projects/59d082b015f0d723152e3587/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59d082b015f0d723152e3587)
[![Build Status](https://travis-ci.org/gerardmrk/gpcl.svg?branch=master)](https://travis-ci.org/gerardmrk/gpcl)
[![Coverage Status](https://coveralls.io/repos/github/gerardmrk/gpcl/badge.svg)](https://coveralls.io/github/gerardmrk/gpcl)

# gpcl

A generic project configuration loader.

If this does not fit your needs, feel free to fork or contribute!

## Installation:

```
$ yarn add gpcl
```

## Usage:

1. Add a **YAML** file to your project directory (see [here](#configpath) for default supported locations).
2. Call `loadConfigSync()` in your script to access your config object.

## Example:

**src/app/index.js**
```js
import { loadConfigSync } from "gpcl";

const config = loadConfigSync();
console.log(config);
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

- [ ] complete all tests
- [ ] bump npm package to v1
- [ ] write and test for Go
- [ ] generate godocs
- [ ] set go package version
