<template>
    <div class="container">
        <form @submit.prevent="createAttendance">
            <div class="ls-form">
                <h2 class="mt-3 mb-4">Inserisci una nuova presenza</h2>
                <div v-if="checkRole()" class="row">
                    <div class="col-6">
                        <label for="activity_id" class="form-label">Seleziona un utente</label>
                    </div>
                    <div class="col-6">
                        <select id="user_id" class="form-select" v-model="user_id">
                            <option selected value="">Selezione un utente</option>
                            <option v-for="user in getAllDeveloperUser" :key="user.id" :value="user.id">{{user.name}} {{user.surname}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="date" class="form-label">Data</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="date"
                            id="date"
                            type="date"
                            class="form-control"
                        />    
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="time_start_morning" class="form-label">Ora inizio Mattina</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="time_start_morning"
                            id="time_start_morning"
                            type="time"
                            class="form-control"
                        />  
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="time_end_morning" class="form-label">Ora fine Mattina</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="time_end_morning"
                            id="time_end_morning"
                            type="time"
                            class="form-control"
                        /> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="time_start_afternoon" class="form-label">Ora inizio Pomeriggio</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="time_start_afternoon"
                            id="time_start_afternoon"
                            type="time"
                            class="form-control"
                            placeholder="Inizio Pomeriggio"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="time_end_afternoon" class="form-label">Ora fine Pomeriggio</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="time_end_afternoon"
                            id="time_end_afternoon"
                            type="time"
                            class="form-control"
                            placeholder="Fine Pomeriggio"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="activity_id" class="form-label">Seleziona attività</label>
                    </div>
                    <div class="col-6">
                        <select id="activity_id" class="form-select" v-model="activity_id">
                            <option selected value="">Selezione un'attività</option>
                            <option v-for="activity in getActivities" :key="activity.id" :value="activity.id">{{activity.type}}</option>
                        </select>
                    </div>
                </div>

                <div class="text-end">
                    <button class="btn btn-primary text-end" type="submit">
                        Inserisci Presenza
                    </button>    
                </div>

            </div>
        </form> 

    </div>  
</template>

<script>
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

export default {
    name: 'CreateAttendance',
    data() {
        return {
            date: "",
            time_start_morning: "",
            time_end_morning: "",
            time_start_afternoon: "",
            time_end_afternoon: "",
            activity_id: "",
            user_id: "",
        };
    },
    setup () {
        const store = useStore();
        return {
            getActivities: computed(() => store.getters.getActivities),
            getAllDeveloperUser: computed(() => store.getters.getAllDeveloperUser),
            getUser: computed(() => store.getters.getUser),
        }
    },
    mounted() {
        this.$store.dispatch('getActivity')
        this.$store.dispatch('getAllDeveloperUser')
    },
    methods: {
        createAttendance() {
            let payload = {
                date: this.date,
                time_start_morning: this.time_start_morning,
                time_end_morning: this.time_end_morning,
                time_start_afternoon: this.time_start_afternoon,
                time_end_afternoon: this.time_end_afternoon,
                activity_id: this.activity_id,
                user_id: this.user_id,
            };
            this.$store.dispatch('createAttendance', payload)
                .then(() => this.$router.push('/attendance'))
                .catch((error) => console.log(error.response.data.errors));
        },

        checkRole() {
            const roles = this.getUser.role;

            if (roles.includes("super-admin") || roles.includes("tutor")) {
            return true
            }

            return false
        }
    },

}
</script>

<style lang="scss" scoped>
.ls-form {
    width: 70%;
    margin: 0 auto;
    padding: 10px;
    .row {
        margin: 15px 0;
    }
}
</style>