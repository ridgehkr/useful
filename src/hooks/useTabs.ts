import { useState } from 'react'

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
  tabs: string[]
  activeTab: number
  addTab: (tab: string, index?: number) => number
  removeTab: (index: number) => void
  activateTab: (index: number) => void
}

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
const useTabs = (): TabsState => {
  const [tabs, setTabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState(-1)

  /**
   * Add a new tab to the list of tabs and return the index of the new tab.
   *
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
      const newLength = newTabs.push(tab)
      setTabs(newTabs)
      return newLength - 1
    }
  }

  /**
   * Remove a tab from the list of tabs, and sets the active tab to the index right before the removed tab.
   *  (Or the first tab, if the removed tab was the first).
   *
   * @param index - The index of the tab to remove.
   */
  const removeTab = (index: number): void => {
    if (indexInBounds(index, tabs.length)) {
      const oldTabLength = tabs.length
      setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index))
      setActiveTab(oldTabLength > 1 ? Math.max(0, index - 1) : -1)
    } else {
      throw new Error(`Invalid tab index: ${index}`)
    }
  }

  /**
   * Set the active tab to a specific index.
   *
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
