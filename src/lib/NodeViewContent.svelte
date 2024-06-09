<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  let {
    as = 'div',
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & { as?: string; children?: Snippet } = $props()
</script>

<svelte:element this={as} {...rest} data-node-view-content="" style:white-space="pre-wrap">
  {@render children?.()}
</svelte:element>
