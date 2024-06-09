import type { NodeViewRenderer, NodeViewProps, NodeViewRendererOptions } from '@tiptap/core'
import type { Decoration } from '@tiptap/pm/view'
import type { Node as ProseMirrorNode } from '@tiptap/pm/model'

import { NodeView, Editor, type DecorationWithType } from '@tiptap/core'
import SvelteRenderer, { type SvelteViewComponent } from './SvelteRenderer.js'
import { NODE_VIEW_CTX } from './ctx.js'

type RendererUpdateProps = {
  oldNode: ProseMirrorNode
  oldDecorations: Decoration[]
  newNode: ProseMirrorNode
  newDecorations: Decoration[]
  updateProps: () => void
}

export interface SvelteNodeViewRendererOptions extends NodeViewRendererOptions {
  update: ((props: RendererUpdateProps) => boolean) | null
  as?: string
  class?: string
  attrs?: Record<string, string>
}

class SvelteNodeView extends NodeView<SvelteViewComponent, Editor, SvelteNodeViewRendererOptions> {
  declare renderer: SvelteRenderer
  declare contentDOMElement: HTMLElement | null

  mount() {
    const props: NodeViewProps = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    }

    const onDragStart = this.onDragStart.bind(this)

    if (this.node.isLeaf) {
      this.contentDOMElement = null
    } else if (this.options.contentDOMElementTag) {
      this.contentDOMElement = document.createElement(this.options.contentDOMElementTag)
    } else {
      this.contentDOMElement = document.createElement(this.node.isInline ? 'span' : 'div')
    }

    if (this.contentDOMElement) {
      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = 'inherit'
    }

    const as = this.options.as ?? (this.node.isInline ? 'span' : 'div')

    const target = document.createElement(as)
    target.dataset.type = this.node.type.name

    this.renderer = new SvelteRenderer(this.component, {
      target,
      props,
      context: new Map([
        // @ts-expect-error
        ...this.editor.options.editorProps.svelteContext,
        [NODE_VIEW_CTX, { ondragstart: onDragStart }],
      ]),
    })
  }

  get dom() {
    if (!this.renderer.dom.firstElementChild?.hasAttribute('data-node-view-wrapper')) {
      throw Error('Please use the NodeViewWrapper component for your node view.')
    }

    return this.renderer.dom
  }

  get contentDOM() {
    if (this.node.isLeaf) {
      return null
    }

    return this.contentDOMElement
  }

  update(node: ProseMirrorNode, decorations: DecorationWithType[]) {
    const updateProps = () => {
      this.renderer.updateProps({ node, decorations })
    }

    if (typeof this.options.update === 'function') {
      const oldNode = this.node
      const oldDecorations = this.decorations

      this.node = node
      this.decorations = decorations

      return this.options.update({
        oldNode,
        oldDecorations,
        newNode: node,
        newDecorations: decorations,
        updateProps: () => updateProps(),
      })
    }

    if (node.type !== this.node.type) {
      return false
    }

    if (node === this.node && this.decorations === decorations) {
      return true
    }

    this.node = node
    this.decorations = decorations

    updateProps()

    return true
  }

  selectNode() {
    this.renderer.updateProps({ selected: true })
    this.renderer.dom.classList.add('ProseMirror-selectednode')
  }

  deselectNode() {
    this.renderer.updateProps({ selected: false })
    this.renderer.dom.classList.remove('ProseMirror-selectednode')
  }

  destroy(): void {
    this.renderer.destroy()
    this.contentDOMElement = null
  }
}

const SvelteNodeViewRenderer = (
  component: SvelteViewComponent,
  options?: Partial<SvelteNodeViewRendererOptions>,
): NodeViewRenderer => {
  return (props): SvelteNodeView => new SvelteNodeView(component, props, options)
}

export default SvelteNodeViewRenderer
