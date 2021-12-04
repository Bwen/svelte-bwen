<script lang="ts">
    import { page } from '$app/stores';
    import Link from './Link.svelte';
    import { faBars } from '@fortawesome/pro-duotone-svg-icons';
    import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import {createEventDispatcher} from "svelte";
    import type { LinkDefinition } from '$lib/js/types';

    let menuBarItem = {icon: faBars, id: 'menu-bars'};
    export let logoItem: {img: string, url: string, icon: IconDefinition} = null;
    export let centerItems: LinkDefinition[] = [];
    export let rightItems: LinkDefinition[] = [];

    const dispatch = createEventDispatcher();
    function onItemClick(event) {
        if (!event.detail.hyperlink.id) {
            return;
        }

        if (event.detail.hyperlink.id === 'menu-bars') {
            document.querySelector('.app-header .center').classList.toggle('mobile-hover');
            return;
        }

        dispatch('item-click', {hyperlink: event.detail.hyperlink});
    }
</script>

<style lang="css">
    .app-header {
        position: relative;
    }

    :global([media="small"]) .app-header {
        position: fixed;
        bottom: 0;
        z-index: 100;
        width: 100%;
    }

    .wrapper-app-header {
        margin: 0 auto;
        display: flex;
        flex-flow: row;
        width: var(--layout-width);
    }

    .wrapper-app-header :global(a) {
        position: relative;
        cursor: pointer;
        color: inherit;
        text-decoration: none;
    }

    .wrapper-app-header :global(a:hover .wrapper-link) {
    }

    .wrapper-app-header :global(.icon) {
        padding: .25em .45em;
        font-size: 1.75em;
        vertical-align: top;
        max-width: 1.90em;
    }

    .wrapper-app-header :global(a),
    .wrapper-app-header :global(.wrapper-link) {
        display: inline-block;
        vertical-align: top;
    }

    .wrapper-app-header :global(.text) {
        display: inline-block;
        position: relative;
        line-height: 3.5em;
        padding: 0 1em;
    }

    .wrapper-app-header :global(sup) {
        font-style: italic;
        font-size: .65em;
        text-align: center;
        line-height: initial;
        display: block;
        position: absolute;
        bottom: .65em;
        left: 0;
        width: 100%;
    }

    .wrapper-app-header .right {
        flex: auto;
        text-align: right;
    }

    .wrapper-app-header .left {
    }

    .wrapper-app-header .left img {
        max-height: 2.5em;
        min-height: 2.5em;
        min-width: 2.5em;
        max-width: 2.5em;
    }

    .wrapper-app-header .menu-bars {
        display: none;
    }

    :global([media="small"]) .menu-bars,
    :global([media="medium"]) .menu-bars {
        display: inherit;
    }

    :global([media="small"]) .center-items,
    :global([media="medium"]) .center-items {
        display: flex;
        flex-flow: column;
        position: absolute;
        opacity: 0;
        height: 1px;
        overflow: hidden;
    }

</style>

<header class="app-header">
    <section class="wrapper-app-header">
    {#if logoItem.img}
        <section class="left">
            <img src="{logoItem.img}" alt="logo" />
        </section>
    {:else if logoItem.icon}
        <section class="left">
            <Link {...logoItem} />
        </section>
    {/if}

        <nav class="center">
            <div class="menu-bars"><Link {...menuBarItem} on:link-click={onItemClick} /></div>
            <div class="center-items">{#if centerItems.length}{#each centerItems as item}<Link {...item} on:link-click={onItemClick} css={$page.path === item.href ? 'active' : ''} />{/each}{/if}</div>
        </nav>

    {#if rightItems.length}
        <section class="right">
            {#each rightItems as item}<Link {...item} on:link-click={onItemClick} />{/each}
        </section>
    {/if}
    </section>
</header>
