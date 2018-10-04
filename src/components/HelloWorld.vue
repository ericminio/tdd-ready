<template>
  <div class="hello">
    <h1 id="title">{{ message }}</h1>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data: function() {
        return {
            message: 'loading...'
        }
    },
    mounted: function() {
        this.fetchData()
            .then((response)=> {
                if (!response.ok) {
                    this.message = response.status + ':' + response.statusText;
                } else {
                    return response.json();
                }
            })
            .then((body)=>{
                this.message = body.message;
            });
    },
    methods: {
        fetchData() {
            return fetch(window.location.origin + '/hello');
        }
    }
}
</script>

<style scoped>
h1 {
    margin: 40px 0 0;
}
</style>
