// History management for undo/redo functionality
export class HistoryManager {
  constructor(maxHistory = 50) {
    this.history = []
    this.currentIndex = -1
    this.maxHistory = maxHistory
  }

  push(state) {
    // Remove any future history if we're not at the end
    this.history = this.history.slice(0, this.currentIndex + 1)
    
    // Add new state
    this.history.push(JSON.parse(JSON.stringify(state)))
    this.currentIndex++
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift()
      this.currentIndex--
    }
  }

  undo() {
    if (this.canUndo()) {
      this.currentIndex--
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
    }
    return null
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
    }
    return null
  }

  canUndo() {
    return this.currentIndex > 0
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1
  }

  getCurrentState() {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
    }
    return null
  }

  clear() {
    this.history = []
    this.currentIndex = -1
  }
}

