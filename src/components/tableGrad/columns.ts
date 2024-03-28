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
        header: () => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'w-full text-xs px-1 md:text-md ',
                },
                () => ['Id'],
            );
        },
        cell: ({row}) =>
            h('div', {class: 'text-center  p-1 text-xs md:text-md '}, row.original.id),
    },
    {
        accessorKey: 'name',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'w-full text-xs px-1 md:text-md ',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => [
                    'Name',
                    h(ArrowUpDown, {class: 'ml-2 h-4 w-4 text-xs md:text-md '}),
                ],
            );
        },
        cell: ({row}) =>
            h(
                'div',
                {class: 'text-center w-full text-xs md:text-md '},
                row.getValue('name'),
            ),
    },
    {
        accessorKey: 'color',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'text-left w-full text-xs px-1 md:text-md ',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => [
                    'Color',
                    h(ArrowUpDown, {class: 'ml-2 h-4 w-4 text-xs md:text-md '}),
                ],
            );
        },
        cell: ({row}) =>
            h(
                'div',
                {
                    class: `text-center rounded-xl bg-${row.original.color} text-${row.original.color}-foreground text-xs  h-5 md:text-md `,
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
                    class: 'text-left text-xs px-1 md:text-md ',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => [
                    'Grade',
                    h(ArrowUpDown, {class: 'ml-2 h-4 w-4 text-xs md:text-md '}),
                ],
            );
        },
        cell: ({row}) =>
            h('div', {class: 'text-center text-xs md:text-md '}, row.getValue('grade')),
    },
    {
        accessorKey: 'setter',
        header: ({column}) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    class: 'text-left text-xs px-1 md:text-md ',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                },
                () => [
                    'Setter',
                    h(ArrowUpDown, {class: 'ml-2 h-4 w-4 text-xs md:text-md '}),
                ],
            );
        },
        cell: ({row}) =>
            h(
                'div',
                {class: 'text-center capitalize text-xs px-1 md:text-md '},
                row.getValue('setter'),
            ),
    },
];
