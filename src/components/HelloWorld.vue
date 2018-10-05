<template>
  <div class="hello">
    <h1 id="title">{{ message }}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'HelloWorld',
    computed: mapState(['message']),
    methods: mapActions(['fetchMessage']),

    mounted: function() {
        this.fetchMessage()
    }
}
</script>

<style scoped>
h1 {
    margin: 40px 0 0;
}
</style>
