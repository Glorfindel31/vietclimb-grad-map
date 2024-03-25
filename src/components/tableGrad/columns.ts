import {ColumnDef} from '@tanstack/vue-table';
import {h} from 'vue';
import {ArrowUpDown} from 'lucide-vue-next';
import {Button} from '@/components/ui/button';
export interface Route {
    name: string;
    id: string;
    color: string;
    grade: string;
    setter: string;
}

export interface DataStructure {
    transformedValues: Route[];
    routeNum: number;
}

export const columns: ColumnDef<Route>[] = [
    {
        accessorKey: 'id',
        header: () => h('div', {class: 'text-left w-4'}, '#id'),
        cell: ({row}) => h('div', {class: 'text-left w-4'}, row.original.id),
    },
    {
        accessorKey: 'name',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'text-left w-full',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => ['Name', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})],
            );
        },
        cell: ({row}) => h('div', {class: 'text-center'}, row.getValue('name')),
    },
    {
        accessorKey: 'color',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'text-left w-full',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => ['Color', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})],
            );
        },
        cell: ({row}) =>
            h(
                'div',
                {
                    class: `text-center rounded-xl bg-${row.original.color} text-${row.original.color}-foreground`,
                },
                row.getValue('color'),
            ),
    },
    {
        accessorKey: 'grade',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'text-left',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => ['Grade', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})],
            );
        },
        cell: ({row}) => h('div', {class: 'text-center'}, row.getValue('grade')),
    },
    {
        accessorKey: 'setter',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => ['Setter', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})],
            );
        },
        cell: ({row}) =>
            h('div', {class: 'text-center capitalize'}, row.getValue('setter')),
    },
];
