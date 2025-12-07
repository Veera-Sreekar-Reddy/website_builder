// Keyboard shortcuts handler
export const SHORTCUTS = {
  UNDO: { key: 'z', ctrl: true, shift: false },
  REDO: { key: 'z', ctrl: true, shift: true },
  COPY: { key: 'c', ctrl: true },
  PASTE: { key: 'v', ctrl: true },
  DELETE: { key: 'Delete', ctrl: false },
  DUPLICATE: { key: 'd', ctrl: true },
  SAVE: { key: 's', ctrl: true },
  PREVIEW: { key: 'p', ctrl: true, shift: true }
}

export function matchShortcut(event, shortcut) {
  const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !(event.ctrlKey || event.metaKey)
  const shiftMatch = shortcut.shift === undefined ? true : (event.shiftKey === shortcut.shift)
  const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
  
  return ctrlMatch && shiftMatch && keyMatch
}

export function setupKeyboardShortcuts(handlers) {
  return (event) => {
    // Don't trigger shortcuts when typing in inputs
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
      if (!matchShortcut(event, SHORTCUTS.SAVE)) {
        return
      }
    }

    if (matchShortcut(event, SHORTCUTS.UNDO) && handlers.onUndo) {
      event.preventDefault()
      handlers.onUndo()
    } else if (matchShortcut(event, SHORTCUTS.REDO) && handlers.onRedo) {
      event.preventDefault()
      handlers.onRedo()
    } else if (matchShortcut(event, SHORTCUTS.COPY) && handlers.onCopy) {
      event.preventDefault()
      handlers.onCopy()
    } else if (matchShortcut(event, SHORTCUTS.PASTE) && handlers.onPaste) {
      event.preventDefault()
      handlers.onPaste()
    } else if (matchShortcut(event, SHORTCUTS.DELETE) && handlers.onDelete) {
      event.preventDefault()
      handlers.onDelete()
    } else if (matchShortcut(event, SHORTCUTS.DUPLICATE) && handlers.onDuplicate) {
      event.preventDefault()
      handlers.onDuplicate()
    } else if (matchShortcut(event, SHORTCUTS.SAVE) && handlers.onSave) {
      event.preventDefault()
      handlers.onSave()
    } else if (matchShortcut(event, SHORTCUTS.PREVIEW) && handlers.onPreview) {
      event.preventDefault()
      handlers.onPreview()
    }
  }
}

