import { useState } from 'react'

/**
 * Determines if a tab index is within the bounds of the list of tabs.
 * @param index - The index to check.
 * @param length - The length of the list of tabs.
 * @returns - True if the index is within the bounds of the list of tabs, false otherwise.
 */
const indexInBounds = (index: number, length: number): boolean => {
  return index >= 0 && index < length
}

/**
 * A hook to manage a list of tabs. Note that tabs are not rendered by this hook,
 *  but rather the hook provides the state data necessary to track and render tabs.
 */
const useTabs = () => {
  const [tabs, setTabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState(0)

  /**
   * Add a new tab to the list of tabs and return the index of the new tab.
   * @param tab - The name of the new tab.
   * @returns - The index of the newly-created tab.
   */
  const addTab = (tab: string, index?: number): number => {
    const newTabs = [...tabs]

    if (index !== undefined && indexInBounds(index, tabs.length)) {
      newTabs.splice(index, 0, tab)
      setTabs(newTabs)
      return index
    } else {
      newTabs.push(tab)
      setTabs(newTabs)
      return tabs.length - 1
    }
  }

  /**
   * Remove a tab from the list of tabs, and sets the active tab to the index right before the removed tab.
   *  (Or the first tab, if the removed tab was the first).
   * @param index - The index of the tab to remove.
   */
  const removeTab = (index: number): void => {
    if (indexInBounds(index, tabs.length)) {
      setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index))
      setActiveTab(Math.max(0, index - 1))
    } else {
      throw new Error(`Invalid tab index: ${index}`)
    }
  }

  /**
   * Set the active tab to a specific index.
   * @param index - The index of the tab to activate.
   */
  const activateTab = (index: number): void => {
    if (indexInBounds(index, tabs.length)) {
      setActiveTab(index)
    } else {
      throw new Error(`Invalid tab index: ${index}`)
    }
  }

  return { tabs, activeTab, addTab, removeTab, activateTab }
}

export default useTabs
