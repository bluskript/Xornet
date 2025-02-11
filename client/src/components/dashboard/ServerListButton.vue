<template>
  <router-link :to="{ name: 'machines', params: { machine: machine.uuid } }" class="button" :class="{ thin: thin, rogue: machine.rogue, disconnected: Date.now() > machine.timestamp + 15000 }">
    <!-- Icons Column -->
    <img v-if="!machine.rogue && Date.now() < machine.timestamp + 15000" class="machineType" :src="import(`@/assets/icons/${type}.png`)" alt="" />
    <img v-if="machine.rogue && Date.now() < machine.timestamp + 15000" class="machineType" :src="import(`@/assets/icons/warning.png`)" alt="" />
    <img v-if="Date.now() > machine.timestamp + 15000" class="machineType" :src="import(`@/assets/icons/disconnected.png`)" alt="" />

    <!-- UUID Column -->
    <div class="info">
      <h1 v-if="!machine.rogue" class="hostname">{{ machine.hostname }}</h1>
      <h1 v-if="machine.rogue" class="hostname">{{ machine.hostname }} <strong>(rogue)</strong></h1>
      <h1 class="status">{{ machine.uuid }}</h1>
    </div>

    <!-- CPU Column -->
    <div class="field cpuUsage" v-if="machine.cpu == null"><strong>Unknown</strong></div>
    <div class="field cpuUsage" v-if="machine.cpu != null">{{ machine.cpu }}<strong>%</strong></div>

    <!-- RAM Column -->
    <div class="field ramUsage" v-if="Object.values(machine.ram).some((field) => field != null)">{{ machine.ram.used }}/{{ machine.ram.total > 1 ? Math.ceil(machine.ram.total) : machine.ram.total }}<strong>GB</strong></div>
    <div class="field ramUsage" v-if="Object.values(machine.ram).some((field) => field == null)"><strong>Unknown</strong></div>

    <!-- Disks Column -->
    <div class="field diskUsage">
      <h1 v-for="disk of showDetails ? machine.disks : [machine.disks[0]]" :key="disk">
        <strong>
          {{ disk.fs }}
        </strong>
        {{ disk.size > 1000 ? `${(disk.used / 1000).toFixed(2)}/${(disk.size / 1000).toFixed(2)}` : `${disk.used}/${disk.size}` }}
        <strong>
          {{ disk.size > 1000 ? "TB" : "GB" }}
        </strong>
      </h1>
    </div>

    <!-- Network Column -->
    <div class="field networkUsage">{{ machine.network?.TxSec }}<strong>mbps</strong></div>
    <div class="field networkUsage">{{ machine.network?.RxSec }}<strong>mbps</strong></div>

    <!-- Region Column -->
    <div class="field region"><img :src="machine.geolocation?.countryCode ? import(`@/assets/flags/${machine.geolocation.countryCode}.png`) : import('@/assets/flags/__.png')" alt="Country Flag" /></div>

    <!-- Ping Column -->
    <div class="field ping" v-if="machine.ping != null">{{ machine.ping }}<strong>ms</strong></div>
    <div class="field ping" v-if="machine.ping == null"><strong>Unknown</strong></div>

    <!-- Uptime Column -->
    <div class="field uptime">{{ machine.uptime.formatted.d }}:{{ machine.uptime.formatted.h }}:{{ machine.uptime.formatted.m }}:{{ machine.uptime.formatted.s }}</div>

    <!-- Owner Column -->
    <router-link class="field owner" :to="{ name: 'profile', params: { username: machine?.owner?.username } }"><img :src="machine?.owner?.profileImage" :alt="machine?.owner?.username" />{{ machine.owner.username }}</router-link>

    <!-- Platform Column -->
    <div class="platform">
      <img v-if="machine.platform == 'win32'" :src="import('@/assets/icons/windows-black.png')" alt="" />
      <img v-if="machine.platform == 'darwin'" :src="import('@/assets/icons/macos-black.png')" alt="" />
      <img v-if="machine.platform == 'linux'" :src="import('@/assets/icons/linux-black.png')" alt="" />
      <!-- <img v-if="machine.static.system.manufacturer.startsWith('Raspberry Pi')" :src="import('@/assets/icons/raspberry.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Dell')" style="height: 10px" :src="import('@/assets/icons/dell.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Hewlett-Packard')" :src="import('@/assets/icons/hp.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Gigabyte')" style="height: 7px" :src="import('@/assets/icons/gigabyte.png')" alt="">
            <img v-if="machine.static.system.manufacturer.startsWith('Asus')" style="height: 7px" :src="import('@/assets/icons/asus.png')" alt=""> -->
      <h1 v-if="machine.reporterVersion">v{{ machine.reporterVersion }}</h1>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ServerListButton",
  computed: {
    type: function () {
      return this.machine.isVirtual ? "vm" : "pm";
    },
  },
  props: {
    machine: { type: Object, required: true },
    showDetails: { type: Boolean, required: true },
    thin: { type: Boolean, required: false, default: false },
  },
};
</script>

<style scoped>
.button {
  padding: 8px;
  background-color: var(--background-color);
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid transparent;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  /* transition: 100ms ease; */
  text-decoration: none;
  overflow: hidden;
  user-select: none;
}

.button.rogue {
  background-color: var(--rogue-red);
}

.button:hover:not(.rogue) {
  border: 1px solid var(--white);
  background-color: var(--white);
  /* transform: translateY(-1px); */
  /* box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px; */
}

.button.rogue:hover {
  border: 1px solid var(--rogue-red-border);
}

.button:active {
  transform: translateY(-0px);
}

.button.router-link-active {
  background-color: var(--white);
}

.button.rogue.router-link-active {
  background-color: var(--rogue-red-active) !important;
}

.button img.machineType {
  width: 32px;
  height: 32px;
  filter: invert(var(--filter));
}

.button.thin img.machineType {
  width: 16px;
  height: 16px;
}

.button .infofield {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: center;
  gap: 2px;
}

.button .info {
  min-width: 218px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.button.thin .info {
  display: flex;
  flex-direction: row;
  min-width: 348px;
}

.button .info .hostname,
.button .info .hostname strong {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 117.9%;
  text-transform: lowercase;
  color: var(--black);
  text-align: left;
}

.button.thin .info .hostname,
.button.thin .info .hostname strong {
  font-weight: 500;
  font-size: 11px;
  min-width: 100px;
}

.button.thin .info .hostname strong {
  color: var(--rogue-red-border);
  margin-left: 4px;
}

.button .info * {
  width: 100%;
  white-space: nowrap;
}
.button.thin .info * {
  text-align: center;
  align-items: center;
  display: flex;
  gap: 2px;
}

.button .info .status,
.button *,
.button .platform h1 {
  font-weight: 500;
  font-size: 11px;
  font-family: "Work Sans", sans-serif;
  color: var(--slyColor);
  text-align: left;
}

.button.thin .info .status {
  min-width: fit-content;
  justify-content: flex-end;
}

.button .field {
  text-align: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
  min-width: 72px;
}

.button .field strong,
.button .field.invalid {
  opacity: 0.7;
}
.button .field.cpuUsage {
  margin-left: 32px;
  min-width: 48px;
}

.button .field.region {
  min-width: 48px;
}
.button .field.region img {
  width: 22px;
  height: auto;
}

.button .field.uptime {
  min-width: 100px;
}
.button .field.uptime strong {
  margin-right: 2px;
}
.button .field.owner {
  gap: 8px;
  text-decoration: none;
}

.button .field.owner img {
  width: 18px;
  height: 18px;
  object-fit: cover;
  border-radius: 100%;
}

.button .field.diskUsage {
  display: flex;
  flex-direction: column;
  min-width: 138px;
  align-items: flex-start;
}

.button .field.networkUsage {
  min-width: 86px;
}

.button .field.region {
  min-width: 66px;
}

.button .info .status {
  background: linear-gradient(110.78deg, rgb(118, 230, 80) -1.13%, rgb(249, 214, 73) 15.22%, rgb(240, 142, 53) 32.09%, rgb(236, 81, 87) 48.96%, rgb(255, 24, 189) 67.94%, rgb(26, 75, 255) 85.34%, rgb(98, 216, 249) 99.57%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.button .platform {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.button.thin .platform {
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;
}

.button.disconnected {
  filter: grayscale(1);
  background-color: var(--white);
}

.button .platform img {
  width: auto;
  height: 13px;
  filter: invert(var(--filter));
}
</style>
