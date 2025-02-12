<script setup>

import { onMounted, ref } from 'vue'
import aicraftApi from '@/API/aicraftApi';




const getdata = async () => {
    try{
        const response = await aicraftApi.get(`/aircraft/${code}`);
        console.log(response.data)
        
    } catch (err) {
        console.error(err);
    }

}

onMounted(() => {
    getdata()
})


</script>







  