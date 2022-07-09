# 接口管理平台后端

### 调试方式
- 参考接口文档
- npm run dev

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:12222/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
# git tag release-v1.1.0
git tag release-v<版本号>
git push origin tag release-v<版本号>
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
