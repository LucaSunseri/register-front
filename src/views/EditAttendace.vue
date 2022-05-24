<template>
    <div class="container">
        <form @submit.prevent="editAttendance">
            <div class="ls-form">

                <h2 class="mt-3 mb-4">Modifica presenza</h2>
                <div v-if="errorA" class="alert alert-danger" role="alert">
                    {{errorA}}
                </div>
                
                <div class="row">
                    <div class="col-6">
                        <label for="date" class="form-label">Data</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="getAttendance.date"
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
                            v-model="getAttendance.time_start_morning"
                            id="time_start_morning"
                            type="time"
                            class="form-control"
                            placeholder="Inizio Mattina"
                        />  
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="time_end_morning" class="form-label">Ora fine Mattina</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="getAttendance.time_end_morning"
                            id="time_end_morning"
                            type="time"
                            class="form-control"
                            placeholder="Fine Mattina"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="time_start_afternoon" class="form-label">Ora inizio Pomeriggio</label>
                    </div>
                    <div class="col-6">
                        <input
                            v-model="getAttendance.time_start_afternoon"
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
                            v-model="getAttendance.time_end_afternoon"
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
                        <select id="activity_id" class="form-select" v-model="getAttendance.activity_id">
                            <option v-for="activity in getActivities" :key="activity.id" :value="activity.id">{{activity.type}}</option>
                        </select>
                    </div>
                </div>

                <div class="text-end">
                    <button class="btn btn-primary text-end" type="submit">
                        Modifica Presenza
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
    name: 'EditAttendace',
    data() {
        return {
            id: this.$route.params.id,
            errorA: null
        };
    },
    setup () {
        const store = useStore();
        return {
            getActivities: computed(() => store.getters.getActivities),
            getAttendance: computed(() => store.getters.getAttendance),
        }
    },
    mounted() {
        this.$store.dispatch('getActivity');
        this.$store.dispatch('showAttendance', this.id);
    },
    methods: {
        editAttendance() {
            const attendance = this.getAttendance;
            const payload = {
                date: attendance.date,
                time_start_morning: attendance.time_start_morning,
                time_end_morning: attendance.time_end_morning,
                time_start_afternoon: attendance.time_start_afternoon,
                time_end_afternoon: attendance.time_end_afternoon,
                activity_id: attendance.activity_id,
            };
            this.$store.dispatch('editAttendance', [this.id, payload])
                .then(() => this.$router.push('/attendance'))
                .catch((error) => this.errorA = error.response.data);
        },
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