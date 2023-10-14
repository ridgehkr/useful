/**
 * The state of a list of tabs.
 *
 * @typedef {Object} TabsState
 * @property {string[]} tabs - The list of tabs.
 * @property {number} activeTab - The index of the active tab.
 * @property {function} addTab - Add a new tab to the list of tabs.
 * @property {function} removeTab - Remove a tab from the list of tabs.
 */
export type TabsState = {
    tabs: string[];
    activeTab: number;
    addTab: (tab: string, index?: number) => number;
    removeTab: (index: number) => void;
    activateTab: (index: number) => void;
};
/**
 * A hook to manage a list of tabs. Note that tabs are not rendered by this hook,
 *  but rather the hook provides the state data necessary to track and render tabs.
 */
declare const useTabs: () => TabsState;
export default useTabs;
