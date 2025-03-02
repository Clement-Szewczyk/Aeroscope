<script setup>
import { onMounted, ref } from 'vue'
import aicraftApi from '@/API/aicraftApi';
import { useRoute } from 'vue-router';
import Map from '@/components/Map.vue';

const route = useRoute();
const code = route.params.code;
const longitude = parseFloat(route.params.longitude);
const latitude = parseFloat(route.params.latitude);
const valeur = ref(null);
const reqst = ref(null);
const loading = ref(true); // Ajout de la propriété loading

console.log("longitude", longitude, "\n latitude", latitude)
console.log("code", code)
const getdata = async () => {
    loading.value = true; // Début du chargement
    try {
        const response = await aicraftApi.get(`/aircraft/${code}`);
        if (response.data.status === 'error') {
            reqst.value = 'error';
            valeur.value = response.data.message;
        } else {
            reqst.value = 'success';
            valeur.value = response.data;
        }
    } catch (err) {
        console.error(err);
        reqst.value = 'error';
        valeur.value = 'Erreur lors de la récupération des données';
    } finally {
        loading.value = false; // Fin du chargement
    }
}

onMounted(() => {
    getdata()
})
</script>

<template>
    <div>
        <h1>Info Avion</h1>
        <div v-if="loading">
            <p>Chargement...</p> <!-- Logo de chargement -->
        </div>
        <div v-else class="content">
            <div class="info">
                <div v-if="reqst === 'success'">
                    <ul>
                        <li><strong>ICAO24 :</strong> {{ valeur.data[0] }}</li>
                        <li><strong>Pays :</strong> {{ valeur.data[6] }}</li>
                        <li><strong>Code Constructeur :</strong> {{ valeur.data[12] }}</li>
                        <li><strong>Constructeur :</strong> {{ valeur.data[13] }}</li>
                        <li><strong>Modèle :</strong> {{ valeur.data[14] }}</li>
                        <li><strong>Propriétaire :</strong> {{ valeur.data[22] }}</li>                
                    </ul>
                </div>
                <div v-else>
                    <p>{{ valeur }}</p>
                </div>
            </div>
            <div class="map">
                <Map :longitude="longitude" :latitude="latitude" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    justify-content: space-between;
}

.info {
    flex: 1;
    margin-right: 20px;
}

.map {
    flex: 1;
}
</style>