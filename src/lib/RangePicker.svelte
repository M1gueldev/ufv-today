<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import dayjs from 'dayjs'

    const evt = createEventDispatcher()


    export let format = 'YYYY-MM-DD'
    export let date = new Date()

    let internalF, internalT

    const inputF = (x) => (internalF = dayjs(x).format(format))
    const inputT = (x) => (internalT = dayjs(x).format(format))

    let is_single = false,
        f_from = date,
        f_to = date

    $: commit = () => {
        f_from = dayjs(internalF, format).toDate()
        f_to = dayjs(internalT, format).toDate()
        evt('commit', {
            from: f_from,
            to: !is_single ? f_from : f_to
        })
    }
    onMount(() => {
        const aux = new Date(Date.now());
        inputF(aux)
        inputT(aux)
    })

</script>

<h2 class="h2">Fecha</h2>
<div class="flex flex-col gap-4 items-start">

    <label class="label">
        <span>Desde</span>
        <input type="date" title="Desde" bind:value={internalF} class="input max-w-xs" id="from" on:input={commit}>
    </label>

    {#if is_single}
        <label class="label">
            <span>Hasta</span>
            <input type="date" title="Hasta" bind:value={internalT} class="input max-w-xs" id="to" on:input={commit}>
        </label>
    {/if}

    <label class="flex items-center space-x-2 my-4">
        <input class="checkbox" type="checkbox" bind:checked={is_single}/>
        <p>Rango de fechas</p>
    </label>
</div>
