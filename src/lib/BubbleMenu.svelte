<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Action } from 'svelte/action'
  import { BubbleMenuPlugin, type BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu'
  import { getEditorCtx } from './ctx.js'

  let {
    class: className,
    options,
    children,
  }: {
    class?: string
    options?: Partial<Omit<BubbleMenuPluginProps, 'editor' | 'element'>>
    children: Snippet
  } = $props()

  const editor = getEditorCtx()

  const mount: Action = (node) => {
    const { pluginKey = 'bubbleMenu', shouldShow = null, ...rest } = options || {}

    const plugin = BubbleMenuPlugin({
      ...rest,
      shouldShow,
      pluginKey,
      editor,
      element: node,
    })

    editor.registerPlugin(plugin)

    return {
      destroy() {
        editor.unregisterPlugin(pluginKey)
      },
    }
  }
</script>

<div use:mount class={className} style="visibility: hidden">
  {@render children()}
</div>
