<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAvionStore } from '@/store/avionStore'
import { useRouter } from 'vue-router';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';

DataTable.use(DataTablesCore);

const avionStore = useAvionStore();
const router = useRouter();
const donnees = ref([]);

const gotoInfo = (code, longitude, latitude) => {
  router.push({ name: 'InfoAvion', params: { code, latitude, longitude } });
};

watch(() => avionStore.getAvions, (newAvions) => {
  if (newAvions.length > 0) {
    donnees.value = newAvions.map(avion => ({
      callsign: avion[1], 
      origine: avion[2], 
      longitude: avion[5], 
      latitude: avion[6], 
      code: avion[0], 
    }));
    onAvionsLoaded();
  }
});

const onAvionsLoaded = () => {
  console.log('Les avions ont été chargés avec succès.');
  console.log(donnees.value);
};

const columns = [
  { data: 'callsign', title: 'Callsign' },
  { data: 'origine', title: 'Origine' },
  { data: 'longitude', title: 'Longitude' },
  { data: 'latitude', title: 'Latitude' },
  { 
    data: null, 
    title: 'Détails', 
    render: function(data, type, row) {
      return `<button class="btn-info" data-code="${row.code}" data-lon="${row.longitude}" data-lat="${row.latitude}">Voir</button>`;
    }
  }
];

onMounted(() => {
  avionStore.fetchAvions(); // Récupération des avions au chargement du composant

  // Ajout d'un écouteur global pour capturer les clics sur les boutons générés par DataTables
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-info')) {
      const code = event.target.getAttribute('data-code');
      const longitude = event.target.getAttribute('data-lon');
      const latitude = event.target.getAttribute('data-lat');
      gotoInfo(code, longitude, latitude);
    }
  });
});
</script>


<template>
  <div class="avion-list">
    <h2>Liste des avions</h2>
    <DataTable class="display" :data="donnees" 
                  :columns=columns
                  :options="{ pageLength: 100, lengthMenu: [10, 20, 50, 100, 150, 200] }" />
  </div>
</template>

<style>
/* Import global de DataTables */
@import 'datatables.net-dt';

/* Applique un style général pour le tableau */
.dataTable {
  width: 100% !important;
  border-collapse: collapse;
  background-color: #ffffff; /* Fond blanc */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* En-têtes du tableau */
.dataTable thead th {
  background-color: #003366; /* Bleu foncé */
  color: #ffffff; /* Texte blanc */
  padding: 12px;
  text-align: left;
}

/* Cellules du tableau */
.dataTable tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* Lignes alternées */
.dataTable tbody tr:nth-child(even) {
  background-color: #f2f2f2; /* Gris clair */
}

/* Effet au survol */
.dataTable tbody tr:hover {
  background-color: #d9eaff; /* Bleu très clair au survol */
}

/* Styles pour le bouton Info */
.btn-info {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn-info:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
