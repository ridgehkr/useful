# useFul: a React Hooks Library

Welcome to useFul! This library provides a collection of efficient and modern React hooks to enhance your application development experience. These hooks are designed to simplify common tasks, improve code reusability, and promote best practices in your React projects. useFul is written in TypeScript, uses [Vite](https://vitejs.dev/) for its development environment, and [Vitest](https://vitest.dev/) for unit testing.

useFul officially supports [React v18.0](https://react.dev/blog/2022/03/29/react-v18) and newer.

## Documentation

Read the full documentation at [**https://docs.usefulhooks.com**](https://docs.usefulhooks.com/).

## Installation

```sh
npm install @ridgehkr/useful
```

Or, with Yarn:

```sh
yarn add @ridgehkr/useful
```

## Development

This project uses [Yarn](https://yarnpkg.com/) as its package manager. To get started, first install all project dependencies:

```sh
yarn
```

Spin up the development server:

```sh
npm run dev
```

Or, with Yarn:

```sh
yarn dev
```

All hooks live in `/src/hooks/`, and their associated unit tests are in `/src/tests/`. Every hook follows the standard hook naming convention of "use[hook capability]", e.g. useFetch or useLocalStorage.

Unit test files use the name format of `[hook name].test.tsx`, e.g. `useFetch.test.tsx` or `useLocalStorage.test.tsx`. All unit tests for a hook should exist in their associated test file and nowhere else.

### Unit tests

useFul relies on [Vitest](https://vitest.dev/) for its unit testing framework. [The test results](#test-scripts) can be seen either in the console (`test` task) or in a browser (`test:ui`). The scripts, when running, will watch your test files and automatically run again when any changes are made.

Note that [most hooks don't have unit tests yet](https://docs.usefulhooks.com#unit-tests). If you'd like to contribute to this effort, please [submit a pull request](https://github.com/ridgehkr/useful)!

#### Test Scripts

Run all tests in the console:

```sh
npm run test
```

Or, with Yarn:

```sh
yarn test
```

Run all unit tests as well as Vitest's live test status UI:

```sh
npm run test:ui
```

Or, with Yarn:

```sh
yarn test:ui
```

## Contributing

useFul thrives on contributions from developers like you! If you encounter issues or have any suggestions for improvements, please feel free to contribute by opening an issue or submitting a pull request in the [GitHub repository](https://github.com/ridgehkr/useful).

## License

This project is licensed under the [MIT License](https://github.com/ridgehkr/hooks/blob/master/LICENSE.txt).

Written by [Caleb Pierce](https://calebpierce.dev).
