<template>
<div class="hello">
    <h1 id="title">{{ message }}</h1>
    <div>this greetings was fetched from the database</div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    name: 'HelloWorld',
    computed: mapState('home', ['message']),
    methods: mapActions('home', ['fetchMessage']),

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
