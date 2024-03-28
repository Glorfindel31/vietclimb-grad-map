<script setup lang="ts">
    import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
    import {cn} from '@/lib/utils';

    const props = defineProps({
        class: {
            type: String,
            required: false,
            default: '',
        },
    });
</script>

<template>
    <Card :class="cn(props.class)">
        <CardHeader>
            <CardTitle>Color Test</CardTitle>
        </CardHeader>
        <CardContent class="w-full p-4">
            <div class="grid grid-cols-7">
                <div class="w-full pt-[100%] bg-background">background</div>
                <div class="w-full pt-[100%] bg-foreground">foreground</div>
                <div class="w-full pt-[100%] bg-card">card</div>
                <div class="w-full pt-[100%] bg-card-foreground">card</div>
                <div class="w-full pt-[100%] bg-popover">popover</div>
                <div class="w-full pt-[100%] bg-popover-foreground">popover</div>
                <div class="w-full pt-[100%] bg-primary">primary</div>
                <div class="w-full pt-[100%] bg-primary-foreground">primary</div>
                <div class="w-full pt-[100%] bg-secondary">secondary</div>
                <div class="w-full pt-[100%] bg-secondary-foreground">secondary</div>
                <div class="w-full pt-[100%] bg-muted">muted</div>
                <div class="w-full pt-[100%] bg-muted-foreground">muted</div>
                <div class="w-full pt-[100%] bg-accent">accent</div>
                <div class="w-full pt-[100%] bg-accent-foreground">accent</div>
                <div class="w-full pt-[100%] bg-destructive">destructive</div>
                <div class="w-full pt-[100%] bg-destructive-foreground">destructive</div>
                <div class="w-full pt-[100%] bg-border">border</div>
                <div class="w-full pt-[100%] bg-input">input</div>
                <div class="w-full pt-[100%] bg-ring">ring</div>
                <div class="w-full pt-[100%] bg-black">black</div>
                <div class="w-full pt-[100%] bg-black-foreground">black</div>
                <div class="w-full pt-[100%] bg-white">white</div>
                <div class="w-full pt-[100%] bg-white-foreground">white</div>
                <div class="w-full pt-[100%] bg-yellow">yellow</div>
                <div class="w-full pt-[100%] bg-yellow-foreground">yellow</div>
                <div class="w-full pt-[100%] bg-orange">orange</div>
                <div class="w-full pt-[100%] bg-orange-foreground">orange</div>
                <div class="w-full pt-[100%] bg-red">red</div>
                <div class="w-full pt-[100%] bg-red-foreground">red</div>
                <div class="w-full pt-[100%] bg-pink">pink</div>
                <div class="w-full pt-[100%] bg-pink-foreground">pink</div>
                <div class="w-full pt-[100%] bg-purple">purple</div>
                <div class="w-full pt-[100%] bg-purple-foreground">purple</div>
                <div class="w-full pt-[100%] bg-blue">blue</div>
                <div class="w-full pt-[100%] bg-blue-foreground">blue</div>
                <div class="w-full pt-[100%] bg-green">green</div>
                <div class="w-full pt-[100%] bg-green-foreground">green</div>
                <div class="w-full pt-[100%] bg-vis-color-main">vis</div>
                <div class="w-full pt-[100%] bg-vis-color-main-dark">vis</div>
                <div class="w-full pt-[100%] bg-vis-color-grey">vis</div>
            </div>
        </CardContent>
    </Card>
</template>
