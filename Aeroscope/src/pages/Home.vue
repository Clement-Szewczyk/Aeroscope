
<script setup>
import Map from '@/components/Map.vue'
import classmentCom from '@/components/classmentCom.vue';
import infoAvion from '@/components/infoAvion.vue';
import { useRouter } from 'vue-router';
import AvionList from '@/components/AvionList.vue';

const router = useRouter();

const test = "008698";

const gotoInfo =  (code) => {
  router.push({name: 'InfoAvion', params: {code}})
}


</script>


<template>
  <div>
    <button @click="gotoInfo(test)">test</button>
    <AvionList />
  </div>
</template>

