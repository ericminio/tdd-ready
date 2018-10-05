<template>
  <div class="hello">
    <h1 id="title">{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data: function() {
        return {
            message: 'loading...'
        }
    },
    mounted: function() {
        axios.get(process.env.VUE_APP_API_URL + '/hello')
            .then((response)=>{
                this.message = response.data.message;
            })
            .catch((error)=>{
                this.message = error;
            })
    }
}
</script>

<style scoped>
h1 {
    margin: 40px 0 0;
}
</style>
