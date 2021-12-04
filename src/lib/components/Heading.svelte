<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import { faLink } from '@fortawesome/pro-duotone-svg-icons';

    export let tag = 'h1';
    export let icon: IconDefinition = null;
    export let subtext = '';
    export let text: string;

    if (!text) {
         throw new Error('Heading component requires text prop');
    }

    function getAnchorId(text) {
        if (!text) {
            return '';
        }

        return text.replace(/[^a-z0-9]/ig, '-');
    }

    // TODO: Once https://github.com/sveltejs/svelte/pull/5481 is merged remove all #ifs
</script>

<style lang="css">
    h1, h2, h3, h4, h5 {
        position: relative;
    }

    .anchor-link {
        opacity: 0;
        position: absolute;
        left: -1.25em;
        padding-right: .25em;
    }

    h1:hover .anchor-link,
    h2:hover .anchor-link,
    h3:hover .anchor-link,
    h4:hover .anchor-link,
    h5:hover .anchor-link {
        opacity: 100%;
    }
</style>


{#if tag === 'h2'}
    <h2 id="{getAnchorId(text)}">
        <a href="#{getAnchorId(text)}" class="anchor-link"><Fa icon={faLink} /></a>
        {#if icon}<Fa icon={icon} />{/if}
        {text}
        {#if subtext}<i><sup>{subtext}</sup></i>{/if}
    </h2>
{:else if tag === 'h3'}
    <h3 id="{getAnchorId(text)}">
        <a href="#{getAnchorId(text)}" class="anchor-link"><Fa icon={faLink} /></a>
        {#if icon}<Fa icon={icon} />{/if}
        {text}
        {#if subtext}<i><sup>{subtext}</sup></i>{/if}
    </h3>
{:else if tag === 'h4'}
    <h4 id="{getAnchorId(text)}">
        <a href="#{getAnchorId(text)}" class="anchor-link"><Fa icon={faLink} /></a>
        {#if icon}<Fa icon={icon} />{/if}
        {text}
        {#if subtext}<i><sup>{subtext}</sup></i>{/if}
    </h4>
{:else if tag === 'h5'}
    <h5 id="{getAnchorId(text)}">
        <a href="#{getAnchorId(text)}" class="anchor-link"><Fa icon={faLink} /></a>
        {#if icon}<Fa icon={icon} />{/if}
        {text}
        {#if subtext}<i><sup>{subtext}</sup></i>{/if}
    </h5>
{:else}
    <h1 id="{getAnchorId(text)}">
        <a href="#{getAnchorId(text)}" class="anchor-link"><Fa icon={faLink} /></a>
        {#if icon}<Fa icon={icon} />{/if}
        {text}
        {#if subtext}<i><sup>{subtext}</sup></i>{/if}
    </h1>
{/if}
