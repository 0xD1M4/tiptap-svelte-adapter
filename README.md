# tiptap-svelte

> Svelte 5 adapter for Tiptap v2

## Installation

```bash
pnpm add tiptap-svelte
```

## Usage

```svelte
<script lang="ts">
  import Editor, { BubbleMenu } from 'tiptap-svelte'
  import StarterKit from '@tiptap/starter-kit'
</script>

<Editor
  options={{
    extensions: [StarterKit],
    content: `Hello world!`,
  }}
>
  <BubbleMenu>Bubble Menu</BubbleMenu>
</Editor>
```
