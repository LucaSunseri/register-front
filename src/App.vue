<template>
    <Header />

    <main>
        <router-view />
    </main>

</template>

<script>
import Header from "@/components/Header";

export default {
    components: { Header },
};
</script>

<style lang="scss" scoped>
main {
    margin-top: 70px;
    height: calc(100vh - 70px);
    overflow: auto;
}
</style>
