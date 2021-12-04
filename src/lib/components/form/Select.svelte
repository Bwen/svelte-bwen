<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faTimes } from '@fortawesome/free-solid-svg-icons';
    import { faSearch } from '@fortawesome/pro-duotone-svg-icons';
    import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
    import { parseAttributes } from '$lib/js/attributeProps';
    import Input from '$lib/components/form/Input.svelte';
    import { Link } from '$lib/components';
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    type OptionDefinition = { text: string; icon?: IconDefinition, unicode?: string, value: string};

    export let value = '';
    export let name = '';
    export let placeholder = '';
    export let options: OptionDefinition[] = [];

    export let id = '';
    export let css = '';
    export let data = {};

    let selectedReset;
    let selectedUnicode;

    let selectWrapper;
    let searchInput;
    let formInput;
    let filteredOptions = [];
    let commonAttributes = {};
    $: {
        commonAttributes = parseAttributes({id, css, data});
        filteredOptions = options;
        onFilterOptions();

        if (selectWrapper) {
            dispatch('change', formInput.value);

            if (formInput.value) {
                selectedReset.classList.add('active');
                selectedUnicode.classList.add('active');
            } else {
                selectedUnicode.classList.remove('active');
                selectedReset.classList.remove('active');
            }

            if (!filteredOptions.length) {
                searchInput.disable(true);
                searchInput.setPlaceholder('No entries found');
            } else {
                searchInput.disable(false);
                searchInput.setPlaceholder(placeholder);
            }
        }
    }

    function onFilterOptions() {
        if (!selectWrapper) {
            return;
        }

        let value = searchInput.getValue().toLowerCase();
        if (!value) {
            formInput.value = '';
        }

        filteredOptions = options.filter((option) => {
            return option.text.toLowerCase().includes(value);
        });
    }

    function reset() {
        formInput.value = '';
        searchInput.setValue('');
        selectedUnicode.innerHTML = '';
        onFilterOptions();
    }

    function onShowOptions() {
        reset();
        selectWrapper.querySelector('ul').classList.add('open');
    }

    function onHideOptions() {
        selectWrapper.querySelector('ul').classList.remove('open');
    }

    /**
     * mouse-down occurs before the input's blur
     * @param event
     */
    function onMouseDown (event) {
        const option = event.target.closest('a');
        const alpha2 = option.getAttribute('data-value');
        const unicode = option.querySelector('.unicode');
        const selectedText = option.querySelector('.text').innerText;

        if (unicode) {
            selectedUnicode.innerHTML = unicode.innerHTML;
        }

        formInput.value = alpha2;
        searchInput.setValue(selectedText);
    }
</script>

<style lang="css">
    .wrapper-select,
    .wrapper-select div{
        display: inline-block;
        position: relative;
    }

    .wrapper-select ul,
    .wrapper-select li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .wrapper-select ul {
        opacity: 0;
        height: 1px;
        overflow-x: hidden;
        position: absolute;
        display: block;
        width: 20em;
    }

    .wrapper-select :global(ul.open) {
        opacity: 100%;
        height: 20em;
        transition:
            height .15s ease-in
        ;
        z-index: 100;
    }

    .wrapper-select ul :global(a) {
        text-decoration: none;
        padding: .35em;
        display: block;
    }

    .wrapper-select ul :global(.fa) {
        position: absolute;
        margin: 8px;
    }

    .wrapper-select .selectedUnicode,
    .wrapper-select .selectedIcon,
    .wrapper-select .selectedReset {
        z-index: 1;
        position: absolute;
        top: 0;
        display: none;
    }

    .wrapper-select .selectedReset {
        right: 0;
        font-size: 0;
    }

    .wrapper-select .selectedUnicode,
    .wrapper-select .selectedIcon {
        padding: 4px;
        left: 1.75em;
    }

    .wrapper-select .active {
        display: block;
    }

    .wrapper-select .selectedReset :global(.fa) {
        margin: 8px;
        font-size: initial;
    }

    .wrapper-select :global(input[type="text"]) {
        padding-left: 3.5em;
        padding-right: 1.5em;
    }
</style>

<div class="wrapper-select" bind:this={selectWrapper}>
    <div {...commonAttributes}>
        <input type="hidden" name="{name}" value="{value}" bind:this={formInput}/>
        <span class="selectedUnicode" bind:this={selectedUnicode}></span>
        <a class="selectedReset" bind:this={selectedReset} on:click={reset}><Fa icon={faTimes} /></a>
        <Input
            bind:this={searchInput}
            on:input={onFilterOptions}
            on:focus={onShowOptions}
            on:blur={onHideOptions}
            placeholder="{placeholder ?? ''}"
            icon={faSearch}
        />
        <ul>
        {#each filteredOptions as option, i}
            <li>
                <Link
                    on:mousedown={onMouseDown}
                    data={{value: option.value}}
                    icon={option.icon}
                    unicode={option.unicode}
                >{option.text}</Link>
            </li>
        {/each}
        </ul>
    </div>
</div>
