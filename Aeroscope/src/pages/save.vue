<script setup>

import { onMounted, ref } from 'vue'
import aicraftApi from '@/API/aicraftApi';
import { useRoute } from 'vue-router';


const route = useRoute();

const code = route.params.code;
const data = ref(null);
const status = ref(null);

const getdata = async () => {
    try{
        const response = await aicraftApi.get(`/aircraft/${code}`);
        console.log(response.data)
        data.value = response.data;
        status.value = response.status;
        
    } catch (err) {
        console.error(err);
    }

}



onMounted(() => {
    getdata()
})


</script>


<template>
    <div>
        <h1>Info Avion</h1>
    
        <table v-if="status != 'error' ">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Pays</th>
                    <th>Code Constructeur</th>
                    <th>Constructeur</th>
                    <th>Modèle</th>
                    <th>Propriétaire</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="element in data">
                    <td>{{element[0]}}</td>
                    <td>{{element[6]}}</td>
                    <td>{{element[12]}}</td>
                    <td>{{element[13]}}</td>
                    <td>{{element[14]}}</td>
                    <td>{{element[22]}}</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <p>Erreur lors de la récupération des données</p>

        </div>
    
    </div>

</template>





  