# generic project configuration loader

**STATUS**: still in progress

## Example


**`config.yml`**
```yaml
IAC:
  Region: !env AWS_REGION
  Stage: !env NODE_ENV

Templates:
  LocalPath: !path lib/blueprints
  BucketKey: infrastructure/blueprints
```
**`output`**
```js
  import { loadConfigSync } from 'gpcl'

  const config = loadConfigSync()

  const {
    IAC: { Stage }, // --> process.env.NODE_ENV
    Templates: { LocalPath } // --> [rootPath]/lib/blueprints
  } = config
```
