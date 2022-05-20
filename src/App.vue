<template>
    <Header />

    <main>
        <router-view />
    </main>

    <Footer />

    <Signature v-if="getCheckSignature == false"/>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Signature from "@/components/Signature";

import { useStore } from "vuex";
import {computed} from '@vue/runtime-core';

export default {
    components: { 
        Header,
        Footer,
        Signature 
    },
    setup () {
        const store = useStore();
        return {
            getCheckSignature: computed(() => store.getters.getCheckSignature),
        }
    },
};
</script>

<style lang="scss" scoped>
main {
    margin-top: 70px;
    height: calc(100vh - 120px);
    overflow: auto;
}
</style>
