<script lang="ts">
  import type { Action } from 'svelte/action'
  import { getAllContexts, untrack, type Snippet } from 'svelte'
  import { ss } from 'svelte-runes'
  import { Editor, type EditorOptions } from '@tiptap/core'
  import EditorCtx from './EditorCtx.svelte'

  let {
    as = 'article',
    options = {},
    children,
  }: {
    as?: string
    options?: Partial<EditorOptions>
    children?: Snippet<[{ editor: Editor }]>
  } = $props()

  const svelteContext = getAllContexts()

  let editor = ss<null | Editor>(null)

  const mount: Action = (node) =>
    untrack(() => {
      editor.$ = new Editor({
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

  export function getEditor(): null | Editor {
    return editor.$
  }
</script>

<svelte:element this={as} use:mount></svelte:element>

{#if editor.$}
  <EditorCtx editor={editor.$} {children}></EditorCtx>
{/if}
