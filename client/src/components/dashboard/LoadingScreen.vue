<template>
  <div v-if="isVisible" class="loadingScreen">
    <Logo class="logo" />
    <progress :value="loadingProgress" max="100"></progress>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/components/dashboard/Logo.vue";
import { defineProps, onMounted, ref } from "vue";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const props =
  defineProps<{
    isLoaded: boolean;
  }>();

const loadingProgress = ref(0);
const isVisible = ref(true);

onMounted(async () => {
  for (let i = 0; i <= 100; i++) {
    loadingProgress.value = i;
    await sleep(50);
    if (loadingProgress.value == 100) {
      await sleep(50);
      isVisible.value = false;
    }
    if (props.isLoaded) {
      loadingProgress.value = 100;
      await sleep(150);
      isVisible.value = false;
      break;
    }
  }
});
</script>

<style scoped>
.loadingScreen {
  background: white;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
}

.loadingScreen .logo {
  width: 256px;
  height: auto;
}

.loadingScreen progress {
  -webkit-appearance: none;
  appearance: none;

  width: 250px;
  height: 4px;
  border-radius: 4px;
  overflow: hidden;
}

progress::-webkit-progress-bar {
  background-color: var(--white);
}

progress::-webkit-progress-value {
  background: linear-gradient(110.78deg, rgb(118, 230, 80) -1.13%, rgb(249, 214, 73) 15.22%, rgb(240, 142, 53) 32.09%, rgb(236, 81, 87) 48.96%, rgb(255, 24, 189) 67.94%, rgb(26, 75, 255) 85.34%, rgb(98, 216, 249) 99.57%);
  transition: 100ms ease;
  border-radius: 4px;
}
</style>
