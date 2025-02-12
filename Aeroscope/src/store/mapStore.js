// src/store/mapStore.js
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    center: [48.8566, 2.3522], // Position par défaut (Paris)
    zoom: 5,
  }),
  actions: {
    setCenter(newCenter) {
      this.center = newCenter
    },
    setZoom(newZoom) {
      this.zoom = newZoom
    },
  },
})
