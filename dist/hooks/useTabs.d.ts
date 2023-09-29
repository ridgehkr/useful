/**
 * A hook to manage a list of tabs. Note that tabs are not rendered by this hook,
 *  but rather the hook provides the state data necessary to track and render tabs.
 */
declare const useTabs: () => {
    tabs: string[];
    activeTab: number;
    addTab: (tab: string, index?: number) => number;
    removeTab: (index: number) => void;
    activateTab: (index: number) => void;
};
export default useTabs;
