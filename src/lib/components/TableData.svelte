<script lang="ts">
    import Pagination from './Pagination.svelte';
    type ColumnDefinition = {
        text?: string;
        key: string;
        parse: (value: string) => string;
        component;
        componentProp: string;
    };

    export let entries = [];
    export let uid = '';
    export let perPage = 20;
    export let columns: ColumnDefinition[] = [];

    let page = 0;
    let pageEntries = [];
    $: {
        pageEntries = getPageEntries(entries)
    }

    function getPageEntries(entries) {
        let startIndex = page * parseInt(perPage, 10);
        return entries.slice(startIndex, startIndex + parseInt(perPage, 10));
    }

    function onPageChange(event) {
        page = parseInt(event.detail.pageNumber, 10);
        pageEntries = getPageEntries(entries);
    }

    function getComponentProp(column, entry) {
        const prop = {};
        if (column.component && column.componentProp) {
            prop[column.componentProp] = entry[column.key];
        }

        return prop;
    }
</script>
<style lang="css">
    .table-data {
        width: 100%;
    }
</style>

<Pagination perPage={perPage} total={entries.length} on:page-change={onPageChange}/>
<table class="table-data">
    <thead>
        <tr>
        {#each columns as column}
            <th>{column.text ?? ''}</th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each pageEntries as entry, i}
        <tr id="row-{ uid ? entry[uid] : i}">
            {#each columns as column}
                <td>
                {#if column.parse}
                    {column.parse(entry[column.key])}
                {:else if column.component}
                    <svelte:component this={column.component} {...getComponentProp(column, entry)}/>
                {:else}
                    {entry[column.key]}
                {/if}
                </td>
            {/each}
        </tr>
    {/each}

    {#if pageEntries.length === 0}
        <tr><td colspan="{columns.length}" class="no-result">No Entries found</td></tr>
    {/if}
    </tbody>
</table>
