<template>
  <div @click="handleClick">It's {{ count }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const count = ref(0);
const handleClick = () => {
  count.value += 1;
};
</script>

<style></style>
