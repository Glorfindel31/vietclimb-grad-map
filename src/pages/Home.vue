<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from '@/components/ui/table';
    import {Badge} from '@/components/ui/badge';

    interface Route {
        id: number;
        name: string;
        color: string;
        grade: string;
        setter: string;
    }

    interface DataStructure {
        routeNum: number;
        transformedValues: Route[];
    }

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
    <div class="flex flex-col justify-center items-center w-full">
        <div v-if="data">
            <h1>Number of routes: {{ data.routeNum }}</h1>
            <Table>
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
                            <Badge :class="`bg-${route.color}`">{{ route.color }}</Badge>
                        </TableCell>
                        <TableCell>{{ route.grade }}</TableCell>
                        <TableCell class="text-right">
                            {{ route.setter }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>
