<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Editor } from '@tiptap/core'
  import { setEditorCtx } from './ctx.js'

  let { editor, children }: { editor: Editor; children?: Snippet<[{ editor: Editor }]> } = $props()

  setEditorCtx(editor)
</script>

{@render children?.({ editor })}
