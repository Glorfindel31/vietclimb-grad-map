<script setup lang="ts">
    import {ref, onMounted} from 'vue';

    import {DataStructure} from '@/components/tableGrad/columns';

    import SkeletonHome from '@/components/skeletonHome/SkeletonHome.vue';

    import RouteList from '@/components/routeList/RouteList.vue';
    import Chart from '@/components/chart/Chart.vue';
    import ColorTest from '@/components/testComponents/ColorTest.vue';

    const data = ref<DataStructure | null>(null);

    onMounted(async () => {
        const response = await fetch(
            'https://rest-google-sheet.vercel.app/api/v1/googlesheet',
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data.value = await response.json();
    });
</script>

<template>
    <div v-if="data" class="flex flex-col flex-wrap w-screen md:flex-row gap-4">
        <RouteList
            :data="data"
            class="flex flex-col justify-center items-center flex-grow-0 md:flex-grow" />
        <Chart
            :incomingData="data.transformedValues"
            class="flex flex-col justify-center items-center flex-grow-0 md:flex-grow" />
        <ColorTest class="flex flex-col justify-center items-center" />
    </div>
    <div v-else class="flex flex-col flex-wrap w-screen md:flex-row gap-4">
        <SkeletonHome />
    </div>
</template>
