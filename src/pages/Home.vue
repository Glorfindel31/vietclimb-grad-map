<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {DataStructure} from '@/components/tableGrad/columns';
    import {
        transformData,
        RouteCount,
        easyRouteCounter,
        normalRouteCounter,
    } from '@/pages/index';

    import RouteCountCards from '@/components/RouteCountCards.vue';
    import RouteList from '@/components/RouteList.vue';
    import Chart from '@/components/Chart.vue';
    import SkeletonHome from '@/components/SkeletonHome.vue';

    const data = ref<DataStructure | null>(null);

    const routeNumber = ref<RouteCount[] | null>(null);
    const easyRouteCount = ref<number | 0>(0);
    const normalRouteCount = ref<number | 0>(0);
    const hardRouteCount = ref<number | 0>(0);

    onMounted(async () => {
        const response = await fetch(
            'https://rest-google-sheet.vercel.app/api/v1/googlesheet',
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data.value = await response.json();
        if (!data.value) {
            throw new Error('Data is null');
        }
        routeNumber.value = transformData(data.value.transformedValues);
        easyRouteCount.value = easyRouteCounter(routeNumber.value);
        normalRouteCount.value = normalRouteCounter(routeNumber.value);
        hardRouteCount.value =
            data.value.routeNum - easyRouteCount.value - normalRouteCount.value;
    });
</script>

<template>
    <div class="flex flex-col justify-center min-w-full">
        <div
            class="overflow-hidden sm:rounded-[0.5rem] sm:border bg-background shadow p-2 sm:p-4 md:p-4 lg:p-8">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-3xl font-bold tracking-tight">Gym Dashboard</h2>
                <img src="/LogoDarkTheme.png" class="w-40 block dark:hidden" alt="Logo" />
                <img
                    src="/LogoLightTheme.png"
                    class="w-40 hidden dark:block"
                    alt="Logo" />
            </div>
            <Transition name="fade">
                <div v-if="data">
                    <RouteCountCards
                        :routeNum="data.routeNum"
                        :easyRouteCount="easyRouteCount"
                        :normalRouteCount="normalRouteCount"
                        :hardRouteCount="hardRouteCount" />
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                        <RouteList :data="data" class="" />
                        <Chart
                            :incomingData="data.transformedValues"
                            class="flex flex-col justify-center items-center" />
                    </div>
                </div>
                <div v-else>
                    <SkeletonHome />
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
