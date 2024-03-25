import {ColumnDef} from '@tanstack/vue-table';
import {h} from 'vue';

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
        header: () => h('div', {class: 'text-center'}, '#id'),
        cell: ({row}) => h('div', {class: 'text-center'}, row.original.id),
    },
    {
        accessorKey: 'name',
        header: () => h('div', {class: 'text-center'}, 'Zone'),
        cell: ({row}) => h('div', {class: 'text-center'}, row.original.name),
    },
    {
        accessorKey: 'color',
        header: () => h('div', {class: 'text-center'}, 'Color'),
        cell: ({row}) => h('div', {class: 'text-center'}, row.original.color),
    },
    {
        accessorKey: 'grade',
        header: () => h('div', {class: 'text-center'}, 'Grade'),
        cell: ({row}) => h('div', {class: 'text-center'}, row.original.grade),
    },
    {
        accessorKey: 'setter',
        header: () => h('div', {class: 'text-center'}, 'Setter'),
        cell: ({row}) => h('div', {class: 'text-center'}, row.original.setter),
    },
];
