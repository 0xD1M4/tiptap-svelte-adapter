import type { NodeViewProps } from '@tiptap/core'
import { mount, unmount, type Component } from 'svelte'
import { ss, type SS } from 'svelte-runes'

export type ViewProps<T = NodeViewProps> = { view: SS<T> }
export type SvelteViewComponent = Component<ViewProps>

export type SvelteRendererOptions = {
  target: HTMLElement
  props: NodeViewProps
  context: Map<string, any>
}

class SvelteRenderer {
  component: ReturnType<typeof mount>

  dom: HTMLElement
  props: SS<NodeViewProps>

  constructor(component: SvelteViewComponent, { target, props, context }: SvelteRendererOptions) {
    this.props = ss(props)

    this.dom = target
    this.dom.classList.add('svelte-renderer')

    this.component = mount(component, {
      target,
      props: { view: this.props },
      context,
    })
  }

  updateProps(props: Partial<NodeViewProps>): void {
    this.props.$ = Object.assign(this.props.$, props)
  }

  destroy(): void {
    unmount(this.component)
  }
}

export default SvelteRenderer
