<script setup lang="ts">
    import {VisAxis, VisXYContainer, VisStackedBar} from '@unovis/vue';
    import type {Route} from '@/components/tableGrad/columns';
    import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
    import {cn} from '@/lib/utils';
    import {RouteCount, transformData} from '@/pages/index';

    const props = defineProps({
        incomingData: {
            type: Array as () => Route[],
            required: true,
        },
        class: {
            type: String,
            required: false,
            default: '',
        },
    });

    const data: RouteCount[] = transformData(props.incomingData);
</script>

<template>
    <Card :class="cn(props.class)">
        <CardHeader>
            <CardTitle>Level Chart</CardTitle>
        </CardHeader>
        <CardContent class="w-full">
            <VisXYContainer
                :margin="{left: 10, right: 10}"
                :data="data"
                :style="{
                    opacity: 1,
                    '--theme-primary': `hsl(var(--primary))`,
                    '--theme-text': `hsl(var(--foreground))`,
                }">
                <VisStackedBar
                    :x="(___d: RouteCount, i: number) => i"
                    :y="(d: RouteCount) => d.amount"
                    color="var(--theme-primary)"
                    :rounded-corners="4"
                    :bar-padding="0.05" />
                <VisAxis
                    type="x"
                    :num-ticks="data.length"
                    :tick-format="(index: number) => 'Lvl' +' '+ data[index]?.level "
                    tickTextColor="var(--theme-text)"
                    :grid-line="false"
                    :tick-line="true" />
                <VisAxis
                    type="y"
                    :num-ticks="data.length"
                    :grid-line="false"
                    :tick-line="false"
                    :domain-line="false"
                    tickTextColor="var(--theme-text)" />
            </VisXYContainer>
        </CardContent>
    </Card>
</template>
