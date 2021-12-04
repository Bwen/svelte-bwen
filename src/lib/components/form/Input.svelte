<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import { parseAttributes } from '$lib/js/attributeProps';

    export let icon: IconDefinition = null;
    export let value = '';
    export let name = '';
    export let placeholder = '';

    export let id = '';
    export let css = '';
    export let data = {};

    let commonAttributes = {};
    $: commonAttributes = parseAttributes({id, css, data, name, value, placeholder});

    let input;
    export function setValue(value: string): void {
        input.value = value;
    }

    export function setPlaceholder(value: string): void {
        input.placeholder = value;
    }

    export function getValue(): string {
        return input.value;
    }

    export function disable(disable: boolean): void {
        input.disabled = disable;
    }
</script>

<style lang="css">
    .wrapper-input {
        display: inline-block;
        position: relative;
    }

    .wrapper-input :global(.fa) {
        position: absolute;
        margin: 8px;
    }

    input[type="text"] {
        padding-left: 2em;
    }
</style>

<div class="wrapper-input">
    {#if icon}<Fa {icon} />{/if}
    <input
        bind:this={input}
        type="text"
        on:input
        on:focus
        on:blur
        {...commonAttributes}
    />
</div>
