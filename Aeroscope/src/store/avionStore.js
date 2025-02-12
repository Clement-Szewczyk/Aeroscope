import { defineStore } from 'pinia'
import apiClient from '@/API/api'

export const useAvionStore = defineStore('avion', {
    state: () => ({
      avions: [],
      avionSelectionne: null,
    }),
    actions: {
      async fetchAvions() {
        try {
          const response = await apiClient.get('/states/all') // Appel API avec Axios
          if (response.data && response.data.states) {
            this.avions = response.data.states
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des avions :", error)
        }
      },
      setAvionSelectionne(avion) {
        this.avionSelectionne = avion
      },
    },
    getters: {
      getAvions: (state) => state.avions,
      getAvionSelectionne: (state) => state.avionSelectionne,
    },
  })