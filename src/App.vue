<script setup lang="ts">
    import MenuNav from '@/components/ui/menuNav/MenuNav.vue';
</script>

<template>
    <MenuNav />
    <div class="flex flex-row p-4">
        <RouterView />
    </div>
</template>
