<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Importez votre fichier ICO ici
import airplaneIco from '@/assets/plane.svg'

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

  // Création d'une icône personnalisée avec le fichier ICO
  const airplaneIcon = L.icon({
    iconUrl: airplaneIco,
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [19, 19], // Point de l'icône qui correspondra à la position du marqueur
  })

  // Ajout d'un point avec l'icône personnalisée aux coordonnées passées en props
  L.marker([props.latitude, props.longitude], { icon: airplaneIcon }).addTo(map.value)
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