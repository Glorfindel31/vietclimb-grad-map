<script setup lang="ts">
    import {Card, CardContent} from '@/components/ui/card';
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
        <CardContent>
            <DataTable :columns="columns" :data="props.data.transformedValues" />
        </CardContent>
    </Card>
</template>
