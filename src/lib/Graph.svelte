<script lang="ts">

    import type {ufv} from '$lib/RemoteApi'
    import dayjs from "dayjs";
    import {onMount} from "svelte";
    import {Line} from "svelte-chartjs";

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from 'chart.js';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale
    );

    const PATTERN = 'DD/MM/YYYY'

    export let mData: ufv[] = []
    let chart
    let mounted = false

    onMount(() => {
        mounted = true
        chart.options = {
            ...chart.options,
            responsive: false,
            locale: 'es',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#FFF',
                        font: {
                            size: 19
                        }
                    }
                },
                tooltip: {
                    titleFont: {
                        size: 21
                    },
                    bodyFont: {
                        size: 19
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#FFF',
                    }
                },
                y: {
                    ticks: {
                        color: '#FFF',
                        font: {
                            size: 19
                        }
                    }
                }
            }
        }
    })

    $: {
        if (mounted) {
            console.log('Updated')
            chart.labels = [mData.map((c) => (dayjs(new Date(c.fecha)).format(PATTERN)))]
            chart.data.datasets.forEach(dataset => {
                dataset.data = mData.map((c) => {
                    return {
                        x: dayjs(new Date(c.fecha)).format(PATTERN),
                        y: c.ufv
                    }
                })
            });
            chart.update();
        }
    }

    const data = {
        datasets: [
            {
                label: 'Valor de la UFV',
                data: [],
                borderColor: '#0FBA81',
                backgroundColor: '#242c46',
                color: '#FFF'
            },
        ]
    };

</script>
<div id="chart-container overflow-auto">
    <Line bind:chart {data}></Line>
</div>


