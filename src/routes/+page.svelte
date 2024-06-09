<script lang="ts">
  import StarterKit from '@tiptap/starter-kit'
  import Editor, { BubbleMenu } from '$lib/index.js'
  import SvelteComponent from './Extension.js'
</script>

<article>
  <Editor
    options={{
      extensions: [
        StarterKit.configure({
          gapcursor: false,
          dropcursor: false,
        }),
        SvelteComponent,
      ],

      content: `
    <p>Hello world!</p>
    <div data-type="svelte-component" count="0"></div>
    <p>Above is the component rendered using Svelte 5</p>
      `,
    }}
  >
    <BubbleMenu>Bubble Menu</BubbleMenu>
  </Editor>
</article>
