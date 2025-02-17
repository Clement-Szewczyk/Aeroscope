<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAvionStore } from '@/store/avionStore'
import { useRouter } from 'vue-router';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const avionStore = useAvionStore()


const router = useRouter();

onMounted(() => {
  avionStore.fetchAvions() // Récupération des avions au chargement du composant
  window.gotoInfo = gotoInfo // Ajout de la fonction gotoInfo dans le contexte global
})

const gotoInfo =  (code, longitude, latitude) => {
  router.push({ name: 'InfoAvion', params: { code, latitude, longitude } })
}

const donnees = ref([])

watch(() => avionStore.getAvions, (newAvions) => {
  if (newAvions.length > 0) {
    donnees.value = newAvions.map(avion => [
      avion[1], // Callsign
      avion[2], // Origine
      avion[5], // Longitude
      avion[6], // Latitude
      `<button onclick="gotoInfo('${avion[0]}', ${avion[5]}, ${avion[6]})">Info</button>`
    ])
    onAvionsLoaded()
  }
})

const onAvionsLoaded = () => {
  console.log('Les avions ont été chargés avec succès.')
  console.log(donnees.value)
}

</script>

<template>
  <div class="avion-list">
    <h2>Liste des avions</h2>
    <DataTable class="display" :data="donnees" > 
      <thead>
        <tr>
          <th>Callsign</th>
          <th>Origine</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Info</th>
        </tr>
      </thead>
      
    </DataTable>
  </div>
</template>

<style scoped>
.avion-list {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}
</style>







