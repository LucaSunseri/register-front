<template>
    <h1>Home</h1>
    <ul v-if="getUser">
        <li>{{getUser.name}}</li>
        <li>{{getUser.surname}}</li>
        <li>{{getUser.token}}</li>
    </ul>
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
        }
    },
    computed: {
    },
    mounted() {},
    methods: {},
};
</script>
