<script setup lang="ts">
    import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTrigger,
    } from '@/components/ui/sheet';
    import toggleTheme from '@/components/ui/toggleTheme.vue';
    import Button from '@/components/ui/button/Button.vue';
    import {Icon} from '@iconify/vue';
</script>

<template>
    <div class="flex flex-col justify-between items-center w-full border-b">
        <Sheet>
            <div
                class="flex flex-row justify-between items-center w-full px-2 py-2 md:px-4 lg:px-8">
                <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Grading Map
                </h1>
                <div class="flex flex-row gap-2">
                    <toggleTheme />
                    <Button variant="outline" size="icon" asChild>
                        <SheetTrigger>
                            <Icon
                                icon="radix-icons:chevron-down"
                                class="h-[1.2rem] w-[1.2rem]" />
                        </SheetTrigger>
                    </Button>
                </div>
                <SheetContent side="top">
                    <SheetHeader>
                        <SheetDescription
                            class="flex justify-end items-center px-8 gap-2">
                            <Button variant="outline" asChild>
                                <RouterLink to="/home" class="text-lg font-medium">
                                    Home
                                </RouterLink>
                            </Button>
                            <Button variant="outline" asChild>
                                <RouterLink to="/about" class="text-lg font-medium">
                                    About
                                </RouterLink>
                            </Button>
                            <Button variant="outline" asChild>
                                <RouterLink to="/" class="text-lg font-medium">
                                    Map
                                </RouterLink>
                            </Button>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </div>
        </Sheet>
    </div>
</template>
