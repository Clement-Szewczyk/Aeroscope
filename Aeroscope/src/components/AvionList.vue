<script setup>
import { onMounted } from 'vue'
import { useAvionStore } from '@/store/avionStore'
import { useRouter } from 'vue-router';

const avionStore = useAvionStore()


const router = useRouter();

onMounted(() => {
  avionStore.fetchAvions() // Récupération des avions au chargement du composant
})

const gotoInfo =  (code) => {
  router.push({name: 'InfoAvion', params: {code}})
}

</script>

<template>
  <div>
    <h2>Liste des avions</h2>
    <table>
      <thead>
        <tr>
          <th>Callsign</th>
         
          <th>Origine</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="avion in avionStore.getAvions" :key="avion[0]">
          <td>{{ avion[1] }}</td>
          <td>{{ avion[2] }}</td>
          <td>{{ avion[5] }}</td>
          <td>{{ avion[6] }}</td>
          <td><button @click="gotoInfo(avion[0])">info</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 







