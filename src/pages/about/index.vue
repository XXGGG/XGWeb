<template>
    <div>
        <div h-screen w-full flex="~ col" justify-center items-center>
            <p p-10>{{ counter.count }}</p>
            <button btn @click="counter.increment">+1</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const counter = useCounterStore()
</script>
