<svelte:head>
    <title>RISO 3166-1</title>
    <meta name="description" content="ISO 3166-1 standard data from the Rust crate RISO-3166-1 as WASM pack" />
</svelte:head>
<script lang="ts">
    import { faSearch } from '@fortawesome/pro-duotone-svg-icons';
    import TableData from '$lib/components/TableData.svelte';
    import Input from '$lib/components/form/Input.svelte';

    let columns = [
        {key: "flag"},
        {key: "alpha2", text: "Alpha 2"},
        {key: "alpha3", text: "Alpha 3"},
        {key: "numeric", text: "Numeric"},
        {key: "name", text: "Name", },
        {key: "official_name", text: "Official Name"},
    ];

    let entries = [];
    let filteredEntries = entries;

    function onSearch(event) {
        const value = event.target.value.toLowerCase();

        filteredEntries = entries.filter((entry) => {
            let values = [];
            columns.forEach((column) => {
                values.push(entry[column.key].toLowerCase());
            });

            return values.join(' ').includes(value)
        });
    }
</script>

<style lang="css">
</style>

<Input on:input={onSearch} placeholder="Filter by any column" icon={faSearch} />
<TableData entries={filteredEntries} columns={columns} perPage=25 uid="alpha2" />
