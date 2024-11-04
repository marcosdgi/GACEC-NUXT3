<script setup lang="ts">
import "animate.css";
</script>
<template lang="pug">
    .w-full.grid.items-center.bg-white.gap-4.p-4.rounded-md(class="animate__animated animate__fadeInLeftBig")
        .flex.flex-row.items-center.gap-2
            ElButton(text @click="$router.go(-1)").gap-2.items-center.flex.flex-row
                Icon(name="tabler:arrow-left" size="30").text-green-600
            p.text-2xl Reportes
        hr.text-green-400.w-full
</template>
