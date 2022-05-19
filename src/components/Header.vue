<template>
  <header>
      <div class="container header__container">
            <div class="header__left">
                <router-link :to="{ name: 'home' }">Registro Presenze</router-link>
                <router-link v-if="getUser" :to="{ name: 'attendance' }" class="mx-5">Presenze</router-link>
            </div>
            <div class="header__right">
                <div v-if="!getUser" class="user-in">
                    <router-link :to="{ name: 'login' }">
                        <button type="button" class="btn btn-outline-primary mx-3">Login</button>
                    </router-link>
                    <router-link :to="{ name: 'register' }">
                        <button type="button" class="btn btn-outline-primary">Registrati</button> 
                    </router-link>                    
                </div>           
                <div v-else class="user-in">
                    <div class="btn-group">
                        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {{getUser.name}}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
                        </ul>
                    </div>
                </div>           
            </div>    
      </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

export default {
    name: "Header",
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
    methods: {
        logout() {
            this.$store.dispatch('logout')
                .then(() => this.$router.push('/login'))
                .catch((error) => console.log(error))
            ;
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    width: 100%;
    z-index: 999;
    background-color: rgba(30, 30, 30, 0.895);
    color: white;
    .header__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .header__left {
            a {
                color: white;
                text-decoration: none;
                &:hover {
                    color: white;
                }
            }
        }
    }
}
</style>>

