<script lang="ts">
  import type { Action } from 'svelte/action'
  import { getAllContexts, untrack, type Snippet } from 'svelte'
  import { ss } from 'svelte-runes'
  import { Editor as CoreEditor, type EditorOptions } from '@tiptap/core'
  import EditorCtx from './EditorCtx.svelte'

  let {
    as = 'article',
    options = {},
    children,
  }: {
    as?: string
    options?: Partial<EditorOptions>
    children?: Snippet<[{ editor: CoreEditor }]>
  } = $props()

  const svelteContext = getAllContexts()

  let editor = ss<null | CoreEditor>(null)

  const mount: Action = (node) =>
    untrack(() => {
      editor.$ = new CoreEditor({
        ...options,
        editorProps: {
          ...options.editorProps,
          // @ts-expect-error
          svelteContext: svelteContext,
        },
        element: node,
      })

      return {
        destroy() {
          editor.$?.destroy()
        },
      }
    })

  export function getEditor(): null | CoreEditor {
    return editor.$
  }
</script>

<svelte:element this={as} use:mount></svelte:element>

{#if editor.$}
  <EditorCtx editor={editor.$} {children}></EditorCtx>
{/if}
