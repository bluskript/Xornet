<template>
  <fieldset class="machine">
    <legend>{{ machine.hostname }}</legend>
    <Gauge :icon="import('@/assets/icons/cpu.png')" suffix="%" :value="parseFloat(machine.cpu)" />
    <Gauge v-if="machine.gpu" :icon="import('@/assets/icons/gpu.png')" suffix="%" :value="parseFloat(machine.gpu.utilizationGpu)" />
    <Gauge :icon="import('@/assets/icons/ram.png')" suffix="r" :value="parseFloat(machine.ram.used)" :maxValue="parseFloat(machine.ram.total)" />
    <Gauge :icon="import('@/assets/icons/upload.png')" suffix="mbps" :value="parseFloat(machine.network.TxSec)" :maxValue="1000 * machine.network.totalInterfaces" />
    <Gauge :icon="import('@/assets/icons/download.png')" suffix="mbps" :value="parseFloat(machine.network.RxSec)" :maxValue="1000 * machine.network.totalInterfaces" />
    <Gauge v-for="disk of machine.disks" :key="disk" :icon="import('@/assets/icons/hdd.png')" suffix="%" :value="parseFloat(disk.use)" :driveLetter="disk.fs" :maxValue="100" />
  </fieldset>
</template>

<script>
import Gauge from "@/components/dashboard/Gauge.vue";

export default {
  name: "GaugeField",
  components: {
    Gauge,
  },
  props: {
    machine: { type: Object, required: true },
  },
};
</script>

<style scoped>
.machine {
  display: flex;
  border: 1px solid #252547;
  flex-direction: row;
  padding: 0px 16px 20px 16px;
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--background-color);
  transition: 100ms ease;
}

.machine legend {
  left: 24px;
  color: var(--black);
  text-transform: lowercase;
}

.machine:hover {
  transform: translateY(-1px);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}
</style>
