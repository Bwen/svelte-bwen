<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import { faExternalLink } from '@fortawesome/pro-duotone-svg-icons';
    import { createEventDispatcher } from "svelte";
    import { parseAttributes } from '$lib/js/attributeProps';

    const dispatch = createEventDispatcher();
    function onLinkClick(event) {
        dispatch('link-click', {hyperlink: event.target.closest('a')});
    }

    export let icon: IconDefinition = null;
    export let icon_hover: IconDefinition = null;
    export let unicode: IconDefinition = null;
    export let subtext = '';
    export let text = '';

    export let href = '';
    export let id = '';
    export let css = '';
    export let data = {};

    let commonAttributes = {};
    $: commonAttributes = parseAttributes({href, id, css, data});
</script>

<style lang="css">
    a {
        cursor: pointer;
    }

    .icon {
        display: inline-block;
        transition: transform .1s ease-in-out;
    }

    .icon :global(.off) {
        display: none;
    }

    a:hover .icon :global(.off) {
        display: inline-block;
    }

    a:hover .icon :global(.on) {
        display: none;
    }
</style>

<a {...commonAttributes} on:click="{onLinkClick}" on:mousedown>
    <span class="wrapper-link">
    {#if icon}
        <span class="icon">
            <Fa class="{icon_hover ? 'on' : ''}" {icon} />
            {#if icon_hover}<Fa class="off" icon={icon_hover} />{/if}
        </span>
    {:else if unicode}
        <span class="icon">
            <span class="unicode">{unicode}</span>
        </span>
    {/if}
    {#if $$slots.default || text}
        <span class="text">
            {#if $$slots.default}<slot></slot>{:else if text}{text}{/if}{#if subtext}<sup>{subtext}</sup>{/if}
            {#if commonAttributes.href && commonAttributes.href.match(/^http/)}<sup><Fa icon={faExternalLink} /></sup>{/if}
        </span>
    {/if}
    </span>
</a>
