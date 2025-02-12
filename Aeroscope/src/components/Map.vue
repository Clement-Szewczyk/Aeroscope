<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAvionStore } from '@/store/avionStore'

const map = ref(null)
const avionStore = useAvionStore()

onMounted(() => {
  // Initialisation de la carte
  map.value = L.map('map').setView([48.8566, 2.3522], 5) // Paris par défaut

  // Ajout d'un fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  // Charger les avions et les ajouter sur la carte
  avionStore.fetchAvions().then(() => {
    avionStore.avions.forEach(avion => {
      if (avion[5] && avion[6]) { // Vérifier que la latitude/longitude existent
        L.marker([avion[6], avion[5]]).addTo(map.value)
          .bindPopup(`<strong>${avion[1]}</strong><br>Altitude: ${avion[7]}m`)
      }
    })
  })
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
