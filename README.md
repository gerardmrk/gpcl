[![Coverage Status](https://coveralls.io/repos/github/gerardmrk/gpcl/badge.svg)](https://coveralls.io/github/gerardmrk/gpcl)
[![Dependency Status](https://www.versioneye.com/user/projects/59d082b015f0d723152e3587/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59d082b015f0d723152e3587)

# gpcl

A generic project configuration loader.

Got tired of writing code to load configuration in my various private side projects, so I extracted this into its own package.

 This is catered to my personal preferences, so if this does not fit your needs, feel free to fork or contribute!

## Installation:

```
$ yarn add gpcl
```

## Usage:

1. Add a **YAML** file to your project directory (see [here](#configpath) for allowed locations).
2. Call `loadConfigSync()` in your script to access your config object.

## Example:

**.config/config.yml**
```yml
# - `!env ...` references an environment variable
# - `!path ...` references a local path relative from
#    the root project directory

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

**src/app/index.js**
```js
import { loadConfigSync } from "gpcl";

const config = loadConfigSync();
console.log(config);

//  IAC: {
//    Region: 'ap-southeast-2',
//    Stage: 'staging',
//    Templates: {
//      Local: '/Users/x/Documents/Projects/xo/lib/blueprints',
//      BucketKey: 'infrastructure/blueprints'
//    }
//  },
//  ...
//
// Inject these values into your webpack or fuse-box config!

```

## API:

### `loadConfigSync(configPath?: string, rootDir?: string)`

Both params are optional. If you'd like to specify **`rootDir`** without specifying **`configPath`**,
just pass in `undefined` as the first parameter.

#### rootDir:
- absolute path of your root project directory.
- if not specified, it will walk up the directory tree to find it. Indicators are:
  - `package.json`
  - `node_modules`

#### configPath:
- absolute path of your config file.
- if not specified, it will look for your config file in this order:

  - `<rootDir>/config.yml`
  - `<rootDir>/project.yml`
  - `<rootDir>/settings.yml`
  - `<rootDir>/.config/config.yml`
  - `<rootDir>/.config/project.yml`
  - `<rootDir>/.config/settings.yml`
  - `<rootDir>/config/config.yml`
  - `<rootDir>/config/project.yml`
  - `<rootDir>/config/settings.yml`

***Note**: an error will be thrown if both values are not specified AND cannot be inferred.*

## Supported YAML Types:

Supports anything that is parsable by [`js-yaml`](https://github.com/nodeca/js-yaml#supported-yaml-types), plus 2 additional schema:

1. `!env` type
    - for referencing an environment variable
    - I.E. `process.env[!env]`
    - E.G. `!env NODE_ENV` => `'production'`
2. `!path` type
    - for referencing a path relative from the root directory
    - I.E. `<rootDir>/<!path>`
    - E.G. `!path src/app.js` => `/Users/xo/web/src/app.js`

## TypeScript Support:

This comes bundled with its own type definitions, so you'll get auto-complete and hints if you're using the Visual Studio Code IDE.
