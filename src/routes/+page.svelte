<script lang="ts">
    import RangePicker from "$lib/RangePicker.svelte";
    import {getUFV, getUFVs} from "$lib/RemoteApi";
    import {onMount} from "svelte";
    import Graph from "$lib/Graph.svelte";

    let data = []
    const handle = ({detail}: Event) => {
        const {from, to} = detail
        getUFVs(from, to).then(loadUfv)
    }
    const loadUfv = (s) => {
        console.log('FEtched')
        data = s
    }
    onMount(() => {
        getUFV(Date.now()).then(loadUfv)
    })
</script>
<main class="container mx-auto px-4 my-4">
    <RangePicker on:commit={handle}></RangePicker>
    {#if data.length === 0}
        <h1 class="h1">No se encontraron registros para la fecha solicitada</h1>
    {:else if data.length === 1}
        <h1 class="h1">Bs. {data[0].ufv}</h1>
    {:else }
        <Graph bind:mData={data}></Graph>
    {/if}
</main>