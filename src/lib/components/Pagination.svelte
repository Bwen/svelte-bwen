<script lang="ts">
    import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/pro-duotone-svg-icons';
    import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
    import { Link } from '$lib/components';
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();

    export let total = 1;
    export let perPage = 10;
    export let maxPagesDisplay = 7;

    let pageCurrent = 0;
    let totalPages = 0;
    let pagesDisplay = [];
    $: {
        pagesDisplay = [];
        totalPages = Math.ceil(total / perPage);
        let middlePageThreshold = Math.floor(maxPagesDisplay / 2);
        for (let i=0; i < totalPages; i++) {
            if (pagesDisplay.length >= maxPagesDisplay) {
                break;
            }

            // Current page should be displayed in the middle, and the last page should always have mxPagesDisplay
            if (i < (pageCurrent - middlePageThreshold) && i < (totalPages - maxPagesDisplay)) {
                continue;
            }

            pagesDisplay.push(i);
        }

        // If the pageCurrent is out of bound bring it back to the first page
        if (-1 === pagesDisplay.indexOf(pageCurrent)) {
            pageCurrent = 0;
            dispatch('page-change', {pageNumber: 0});
        }
    }

    function onLinkClick(event) {
        let pageNumber = parseInt(event.detail.hyperlink.getAttribute('data-page'), 10);
        if (isNaN(pageNumber)) {
            let pageArrow = event.detail.hyperlink.getAttribute('data-page');
            let pageLast = totalPages - 1 ;

            switch (pageArrow) {
                case 'previous':
                    pageNumber = isNaN(pageCurrent) || 0 === pageCurrent ? 0 : pageCurrent - 1;
                    break;
                case 'next':
                    pageNumber = isNaN(pageCurrent) || pageLast <= pageCurrent ? pageLast : pageCurrent + 1;
                    break;
                case 'first':
                    pageNumber = 0;
                    break;
                case 'last':
                    pageNumber = pageLast;
                    break;
                default:
                    console.warn('Pagination component could not parse the arrows correctly!');
                    break;
            }
        }

        pageCurrent = pageNumber;
        dispatch('page-change', {pageNumber});
    }
</script>

<style lang="css">
    .pagination {
        margin: auto;
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        text-align: center;
    }

    .pagination :global(a) {
        text-decoration: none;
        width: 2em;
    }

    .pagination :global(.current) {
        font-weight: bolder;
    }
</style>

<section class="pagination">
    {#if totalPages > 1}
    <Link icon={faAngleDoubleLeft} on:link-click={onLinkClick} data="{{page: 'first'}}" />
    <Link icon={faAngleLeft} on:link-click={onLinkClick} data="{{page: 'previous'}}" />
    {/if}

    {#each pagesDisplay as page}
        <Link text="{page + 1}" on:link-click={onLinkClick} data="{{page}}" css="{pageCurrent === page ? 'current' : ''}" />
    {/each}

    {#if totalPages > 1}
    <Link icon={faAngleRight} on:link-click={onLinkClick} data="{{page: 'next'}}" />
    <Link icon={faAngleDoubleRight} on:link-click={onLinkClick} data="{{page: 'last'}}" />
    {/if}
</section>
