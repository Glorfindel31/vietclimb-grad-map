<script setup lang="ts">
    import {VisAxis, VisXYContainer, VisStackedBar} from '@unovis/vue';
    import type {Route} from '@/components/tableGrad/columns';
    type Data = {
        level: string;
        amount: number;
    };

    const props = defineProps({
        incomingData: {
            type: Array as () => Route[],
            required: true,
        },
    });

    const transformData = (incomingData: Route[]): Data[] => {
        const data: Data[] = [];

        incomingData.reduce((gradeCounts, route) => {
            const existing = gradeCounts.find(d => d.level === route.grade);
            if (existing) {
                existing.amount++;
            } else {
                gradeCounts.push({
                    level: route.grade,
                    amount: 1,
                });
            }
            return gradeCounts;
        }, data);
        data.sort((a, b) => {
            return Number(a.level) - Number(b.level);
        });
        return data;
    };
    const data: Data[] = transformData(props.incomingData);
</script>

<template>
    <div class="my-3 px-3">
        <VisXYContainer
            :margin="{left: 20, right: 20}"
            :data="data"
            :style="{
                opacity: 1,
                '--theme-primary': `hsl(var(--foreground))`,
            }">
            <VisStackedBar
                :x="(___d: Data, i: number) => i"
                :y="(d: Data) => d.amount"
                :rounded-corners="4"
                :bar-padding="0.15" />
            <VisAxis
                type="x"
                :num-ticks="data.length"
                :tick-format="(index: number) => 'level' + data[index]?.level "
                :grid-line="false"
                :tick-line="false" />
            <VisAxis
                type="y"
                :num-ticks="data.length"
                :tick-format="(index: number) => data[index]?.amount"
                :grid-line="false"
                :tick-line="false"
                :domain-line="false"
                color="var(--theme-primary)" />
        </VisXYContainer>
    </div>
</template>
