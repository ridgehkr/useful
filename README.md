# Useful: a React Hooks Library

Welcome to Useful! This library provides a collection of efficient and modern React hooks to enhance your application development experience. These hooks are designed to simplify common tasks, improve code reusability, and promote best practices in your React projects. Useful is written in TypeScript, uses [Vite](https://vitejs.dev/) for its development environment, and [Vitest](https://vitest.dev/) for unit testing.

Useful officially supports [React v18.0](https://react.dev/blog/2022/03/29/react-v18) and newer.

## Documentation

Read the full documentation at [**https://docs.usefulhooks.com**](https://docs.usefulhooks.com/).

## Installation

```sh
pnpm install @ridgehkr/useful

# or with npm
npm install @ridgehkr/useful
```

## Development

This project uses [pNpm](https://pnpm.io/) as its package manager. To get started, first install all project dependencies:

```sh
pnpm install

# or with npm
npm install
```

Spin up the development server:

```sh
pnpm dev

# or with npm
npm run dev
```

All hooks live in `/src/hooks/`, and their associated unit tests are in `/src/tests/`. Every hook follows the standard hook naming convention of "use[hook capability]", e.g. useFetch or useLocalStorage.

Unit test files use the name format of `[hook name].test.tsx`, e.g. `useFetch.test.tsx` or `useLocalStorage.test.tsx`. All unit tests for a hook should exist in their associated test file and nowhere else.

### Unit tests

Useful relies on [Vitest](https://vitest.dev/) for its unit testing framework. [The test results](#test-scripts) can be seen either in the console (`test` task) or in a browser (`test:ui`). The scripts, when running, will watch your test files and automatically run again when any changes are made.

Note that [most hooks don't have unit tests yet](https://docs.usefulhooks.com#unit-tests). If you'd like to contribute to this effort, please [submit a pull request](https://github.com/ridgehkr/useful)!

#### Test Scripts

Run all tests in the console:

```sh
pnpm test

# or with npm
npm run test
```

Run all unit tests as well as Vitest's live test status UI:

```sh
pnpm test:ui

# or with npm
npm run test:ui
```

## Contributing

Useful thrives on contributions from developers like you! If you encounter issues or have any suggestions for improvements, please feel free to contribute by opening an issue or submitting a pull request in the [GitHub repository](https://github.com/ridgehkr/useful).

## License

This project is licensed under the [MIT License](https://github.com/ridgehkr/hooks/blob/master/LICENSE.txt).

Written by [Caleb Pierce](https://calebpierce.dev).
