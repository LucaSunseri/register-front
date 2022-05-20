<template>
    <div class="container">
        <h1>Home</h1>
        <ul v-if="getUser">
            <li>{{getUser.name}}</li>
            <li>{{getUser.surname}}</li>
            <li>{{getUser.token}}</li>
        </ul> 
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

export default {
    name: "Home",
    data() {
        return {
        };
    },
    setup () {
        const store = useStore();
        return {
            getUser: computed(() => store.getters.getUser),
            getCheckSignature: computed(() => store.getters.getCheckSignature),
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    },
};
</script>
