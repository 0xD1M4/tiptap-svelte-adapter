<script lang="ts">
  import { NodeViewWrapper, type ViewProps } from '$lib/index.js'

  let { view }: ViewProps = $props()

  const increase = () =>
    view.$.updateAttributes({
      count: view.$.node.attrs.count + 1,
    })
</script>

<NodeViewWrapper class="svelte-component">
  <span class="label">Svelte Component</span>

  <div class="content">
    <button onclick={increase}>
      This button has been clicked {view.$.node.attrs.count} times.
    </button>
  </div>
</NodeViewWrapper>

<style>
  :global(.svelte-component) {
    background: #faf594;
    border: 3px solid #0d0d0d;
    border-radius: 0.5rem;
    margin: 1rem 0;
    position: relative;
  }
</style>
