<script setup lang="ts">
    import {ref, onMounted} from 'vue';

    import {columns, DataStructure} from '@/components/tableGrad/columns';
    import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
    import {Skeleton} from '@/components/ui/skeleton';

    import DataTable from '@/components/tableGrad/dataTable.vue';
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
    <div v-if="data" class="w-full flex flex-col md:flex-row gap-4">
        <Card class="flex flex-col justify-center items-center flex-2 md:max-w-[30vw]">
            <CardHeader>
                <CardTitle>Number of routes: {{ data.routeNum }}</CardTitle>
            </CardHeader>
            <CardContent class="w-full p-4">
                <DataTable :columns="columns" :data="data.transformedValues" />
            </CardContent>
        </Card>
        <Chart :incomingData="data.transformedValues" />
        <ColorTest
            class="flex flex-col justify-center items-center flex-2 md:max-w-[30vw]" />
    </div>
    <div v-else class="w-full flex flex-col md:flex-row gap-4">
        <Card class="flex flex-col justify-center items-center flex-2 md:max-w-[30vw]">
            <CardHeader>
                <CardTitle><Skeleton class="h-6 w-[250px]" /></CardTitle>
            </CardHeader>
            <CardContent class="w-full p-4">
                <div class="space-y-4">
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                    </div>
                    <div class="space-y-2">
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                        <Skeleton class="h-4 w-[250px]" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
