# Custom React Hooks Library

Welcome to the Custom React Hooks Library! This library provides a collection of custom React Hooks built using TypeScript to enhance your React development experience. These hooks are designed to simplify common tasks, improve code reusability, and promote best practices in your React projects.

## Installation

```sh
npm install @ridgehkr/hooks
```

Or, with Yarn:

```sh
yarn add @ridgehkr/hooks
```

## Available Hooks

### `useFetch()`

Simplifies making HTTP requests using the [native Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). It automatically manages fetched data, loading state, and errors (if there are any).

### `useDebounce()`

Debounces a given callback function. This allows you to wait for a given period of time before the callback function is invoked, and it will only be invoked once after the timeout occurs. This is helpful for reacting to user input, such as running an AJAX search while a user types in an input field.

### `useGeolocation()`

Gets the user's current latitude and longitude location via the browser's geolocation API.

### `useMediaQuery()`

Monitors a media query string's state.

### `useLocalStorage()`

Manages data persistence in the browser's local storage. This can be useful for maintaining user preferences or small pieces of data across sessions.

## Contributing

Contributions to this library are welcome! If you have a useful custom hook to add, a bug to fix, or an enhancement to propose, please open an issue or submit a pull request on the [GitHub repository](https://github.com/ridgehkr/hooks).

## License

This project is licensed under the MIT License.

---

Written by [Caleb Pierce](https://calebpierce.dev).
