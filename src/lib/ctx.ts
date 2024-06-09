import type { Editor } from '@tiptap/core'
import { getContext, setContext } from 'svelte'

const CTX = 'TiptapEditorCtx'
export const setEditorCtx = (editor: Editor) => setContext(CTX, editor)

export const getEditorCtx = () => getContext(CTX) as Editor

export const NODE_VIEW_CTX = 'TiptapNodeViewCtx'
export const getNodeViewCtx = () =>
  getContext(NODE_VIEW_CTX) as { ondragstart: (event: DragEvent) => void }
