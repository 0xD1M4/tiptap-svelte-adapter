import { mergeAttributes, Node } from '@tiptap/core'
import SvelteNodeViewRenderer from '$lib/SvelteNodeViewRenderer.js'
import CustomView from './CustomView.svelte'

export default Node.create({
  name: 'svelteComponent',

  group: 'block',
  content: 'inline*',

  // atom: true,

  addAttributes() {
    return {
      count: { default: 0 },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="svelte-component"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'svelte-component' }), 0]
  },

  addNodeView() {
    // @ts-expect-error
    return SvelteNodeViewRenderer(CustomView)
  },
})
