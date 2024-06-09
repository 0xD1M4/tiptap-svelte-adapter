<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  import { getNodeViewCtx } from './ctx.js'

  let {
    as = 'div',
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & { as?: string; children: Snippet } = $props()

  const { ondragstart } = getNodeViewCtx()
</script>

<svelte:element
  this={as}
  data-node-view-wrapper=""
  role="none"
  {ondragstart}
  {...rest}
  style:white-space="normal"
>
  {@render children()}
</svelte:element>
