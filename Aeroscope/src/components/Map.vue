<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(null)


const props = defineProps({
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
})

console.log("coordonné", props.latitude, props.longitude)


onMounted(() => {
  // Initialisation de la carte
  map.value = L.map('map').setView([props.latitude, props.longitude], 5) // Paris par défaut 

  // Ajout d'un fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  //Ajout d'un point au coordonnées passées en props
  L.marker([props.latitude, props.longitude]).addTo(map.value)
  
})
</script>

<template>
  <div id="map" class="map-container"></div>
</template>

<style>
.map-container {
  width: 500px;
  height: 500px;
  border-radius: 8px;
}
</style>