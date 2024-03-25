<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {columns, DataStructure} from '@/components/tableGrad/columns';
    import DataTable from '@/components/tableGrad/dataTable.vue';

    import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

    const data = ref<DataStructure | null>(null);

    onMounted(async () => {
        const response = await fetch(
            'https://rest-google-sheet.vercel.app/api/v1/googlesheet',
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data.value = await response.json();
        console.log(data.value?.transformedValues);
    });
</script>

<template>
    <div v-if="data">
        <Card class="flex flex-col justify-center items-center w-full">
            <CardHeader>
                <CardTitle>Number of routes: {{ data.routeNum }}</CardTitle>
            </CardHeader>
            <CardContent>
                <!-- <Table>
                    <TableCaption>Route List</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-4">ID#</TableHead>
                            <TableHead>Zone</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead class="w-4">Grade</TableHead>
                            <TableHead class="text-right"> Set by</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            v-for="(route, index) in data.transformedValues"
                            :key="index">
                            <TableCell class="font-medium">
                                {{ route.id }}
                            </TableCell>
                            <TableCell>{{ route.name }}</TableCell>
                            <TableCell>
                                <Badge
                                    :class="`bg-${route.color} text-${route.color}-foreground hover:bg-${route.color}/80`">
                                    {{ route.color }}
                                </Badge>
                            </TableCell>
                            <TableCell>{{ route.grade }}</TableCell>
                            <TableCell class="text-right">
                                {{ route.setter }}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> -->
                <DataTable :columns="columns" :data="data.transformedValues" />
            </CardContent>
        </Card>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>
