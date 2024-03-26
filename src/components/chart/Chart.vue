<script setup lang="ts">
    import {VisXYContainer, VisStackedBar} from '@unovis/vue';

    type Data = (typeof data)[number];
    const data = [
        // Your data items here
        {'Level 1': 10},
        {'Level 2': 15},
        {'Level 3': 5},
        {'Level 4': 10},
    ];
</script>

<template>
    <div class="my-3 px-3 h-[120px]">
        <VisXYContainer
            :data="data"
            class="h-[120px]"
            :style="{
                opacity: 0.9,
                '--theme-primary': `hsl(var(--foreground))`,
            }">
            <VisStackedBar
                :x="(d: Data, i: number) => i"
                :y="(d: Data) => d."
                color="var(--theme-primary)"
                :bar-padding="0.1"
                :rounded-corners="0" />
            <VisAxis type="x" />
            <VisAxis type="y" />
        </VisXYContainer>
    </div>
</template>
