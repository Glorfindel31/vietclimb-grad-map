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
    <Sheet>
        <div class="flex justify-between items-center w-full p-2 border-b">
            <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">Grading Map</h1>
            <Button variant="outline" size="icon" asChild>
                <SheetTrigger>
                    <Icon icon="radix-icons:chevron-down" class="h-[1.2rem] w-[1.2rem]" />
                </SheetTrigger>
            </Button>
            <SheetContent side="top">
                <SheetHeader>
                    <SheetDescription class="flex justify-end items-center px-8 gap-2">
                        <toggleTheme />
                        <Button variant="outline" asChild>
                            <RouterLink to="/" class="text-lg font-medium">
                                Home
                            </RouterLink>
                        </Button>
                        <Button variant="outline" asChild>
                            <RouterLink to="/about" class="text-lg font-medium">
                                About
                            </RouterLink>
                        </Button>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </div>
    </Sheet>
</template>
