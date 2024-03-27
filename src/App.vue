<script setup lang="ts">
    import MenuNav from '@/components/ui/menuNav/MenuNav.vue';
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full">
        <MenuNav />
        <div class="flex flex-row w-full p-4">
            <RouterView />
        </div>
    </div>
</template>
