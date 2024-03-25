import {ColumnDef} from '@tanstack/vue-table';
import {h} from 'vue';

export interface DataStructure {
    routeNum: number;
    id: number;
    name: string;
    color: string;
    grade: string;
    setter: string;
}

export const columns: ColumnDef<DataStructure>[] = [
    {
        accessorKey: 'id',
        header: () => h('div', {class: 'text-center'}, '#id'),
        cell: ({row}) => {
            const id = row.transformedValues.id;
            return h('div', {class: 'text-center'}, id);
        },
    },
    {
        accessorKey: 'name',
        header: () => h('div', {class: 'text-center'}, 'Zone'),
        cell: ({row}) => {
            const name = row.name;
            return h('div', {class: 'text-center'}, name);
        },
    },
    {
        accessorKey: 'color',
        header: () => h('div', {class: 'text-center'}, 'Color'),
        cell: ({row}) => {
            const color = row.color;
            return h('div', {class: 'text-center'}, color);
        },
    },
    {
        accessorKey: 'grade',
        header: () => h('div', {class: 'text-center'}, 'Grade'),
        cell: ({row}) => {
            const grade = row.grade;
            return h('div', {class: 'text-center'}, grade);
        },
    },
    {
        accessorKey: 'setter',
        header: () => h('div', {class: 'text-center'}, 'Setter'),
        cell: ({row}) => {
            const setter = row.setter;
            return h('div', {class: 'text-center'}, setter);
        },
    },
];
