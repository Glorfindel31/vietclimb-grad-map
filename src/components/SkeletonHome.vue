<script setup lang="ts">
    import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
    import {Skeleton} from '@/components/ui/skeleton';
</script>

<template>
    <Card
        v-for="index in 3"
        :key="index"
        class="flex flex-col justify-center items-center flex-2 md:max-w-[30vw]">
        <CardHeader>
            <CardTitle><Skeleton class="h-6 w-[200px]" /></CardTitle>
        </CardHeader>
        <CardContent class="w-full p-4">
            <div class="space-y-4">
                <div v-for="index in 2" class="space-y-2" :key="index">
                    <Skeleton v-for="index in 2" class="h-4 w-[250px]" :key="index" />
                </div>
            </div>
        </CardContent>
    </Card>
</template>
