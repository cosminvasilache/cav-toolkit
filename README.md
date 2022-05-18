# cav-toolkit

A bundle of general use utilities.

## Running a specific function

---

Run `ts-node` in `REPL` mode (run it in the root of the project, because it is installed here, alongside dependencies such as `typescript`):

```bash
npx ts-node
```

Import the function you want to use:

```TypeScript
import { someFunction } from './src/some_path/.../some_file';
```

Execute the function:

```TypeScript
someFunction(arg1, arg2, ...);
```

## Running tests

---

### Run ALL tests

```bash
npm run test

npm test

npm t
```

### Run a specific test

```bash
npm run test --- /path/to/test
```
