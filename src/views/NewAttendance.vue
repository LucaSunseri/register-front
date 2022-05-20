<template>
    <div class="container">
        
        <h1>Inserisci una nuova presenza</h1>
        <form @submit.prevent="newAttendance">
            <div class="ls-form">
                <div class="row">
                    <div class="col-4">
                        <label for="date" class="form-label">Data</label>
                    </div>
                    <div class="col-8">
                        <input
                            v-model="date"
                            id="date"
                            type="date"
                            class="form-control"
                        />    
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label for="time_start_morning" class="form-label">Ora inizio Mattina</label>
                    </div>
                    <div class="col-8">
                        <input
                            v-model="time_start_morning"
                            id="time_start_morning"
                            type="time"
                            class="form-control"
                        />  
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label for="time_end_morning" class="form-label">Ora fine Mattina</label>
                    </div>
                    <div class="col-8">
                        <input
                            v-model="time_end_morning"
                            id="time_end_morning"
                            type="time"
                            class="form-control"
                        /> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label for="time_start_afternoon" class="form-label">Ora inizio Pomeriggio</label>
                    </div>
                    <div class="col-8">
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
                    <div class="col-4">
                        <label for="time_end_afternoon" class="form-label">Ora fine Pomeriggio</label>
                    </div>
                    <div class="col-8">
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
                    <div class="col-4">
                        <label for="activity_id" class="form-label">Seleziona attività</label>
                    </div>
                    <div class="col-8">
                        <select id="activity_id" class="form-select" aria-label="Default select example" v-model="activity_id">
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
    name: 'NewAttendance',
    data() {
        return {
            date: "",
            time_start_morning: "",
            time_end_morning: "",
            time_start_afternoon: "",
            time_end_afternoon: "",
            activity_id: "",
        };
    },
    setup () {
        const store = useStore();
        return {
            getActivities: computed(() => store.getters.getActivities),
        }
    },
    mounted() {
        this.$store.dispatch('getActivity')
    },
    methods: {
        newAttendance() {
            let payload = {
                date: this.date,
                time_start_morning: this.time_start_morning,
                time_end_morning: this.time_end_morning,
                time_start_afternoon: this.time_start_afternoon,
                time_end_afternoon: this.time_end_afternoon,
                activity_id: this.activity_id,
            };
            this.$store.dispatch('createAttendance', payload)
                .then(() => this.$router.push('/attendance'))
                .catch((error) => console.log(error));
        },
    },

}
</script>

<style lang="scss" scoped>
.ls-form {
    width: 60%;
    margin: 0 auto;
    padding: 10px;
    .row {
        margin: 15px 0;
    }
}
</style>