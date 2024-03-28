<script setup lang="ts">
    import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
    import DataTable from '@/components/tableGrad/dataTable.vue';
    import {columns, DataStructure} from '@/components/tableGrad/columns';
    import {cn} from '@/lib/utils';

    const props = defineProps({
        data: {
            type: Object as () => DataStructure,
            required: true,
        },
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
            <CardTitle>Number of routes: {{ props.data.routeNum }}</CardTitle>
        </CardHeader>
        <CardContent class="w-full p-4">
            <DataTable :columns="columns" :data="props.data.transformedValues" />
        </CardContent>
    </Card>
</template>
