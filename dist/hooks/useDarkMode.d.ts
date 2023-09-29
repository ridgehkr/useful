export type DarkModeUsage = [
    isDarkMode: boolean,
    setIsDarkMode: (dark: boolean) => void
];
/**
 * A hook to manage dark mode state. The document root will also be given a dark-mode class when dark mode is enabled.
 * @returns - An array containing the current dark mode state and a function to toggle dark mode.
 */
declare function useDarkMode(initiallyDark?: null): DarkModeUsage;
export default useDarkMode;
