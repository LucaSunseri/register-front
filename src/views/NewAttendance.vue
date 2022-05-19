<template>
  <h1>Nuova Presenza</h1>
   <form @submit.prevent="newAttendance">

        <div class="container">
            <div class="row mb-3">
                <div class="col">
                    <input
                        v-model="date"
                        type="date"
                        class="form-control"
                        placeholder="Data"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="time_start_morning"
                        type="time"
                        class="form-control"
                        placeholder="Inizio Mattina"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="time_end_morning"
                        type="time"
                        class="form-control"
                        placeholder="Fine Mattina"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="time_start_afternoon"
                        type="time"
                        class="form-control"
                        placeholder="Inizio Pomeriggio"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="time_end_afternoon"
                        type="time"
                        class="form-control"
                        placeholder="Fine Pomeriggio"
                    />
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <input
                    v-model="signature"
                    type="text"
                    class="form-control"
                    placeholder="Firma"
                />
            </div>
            <div class="col">
                <select class="form-select" aria-label="Default select example" v-model="activity_id">
                    <option selected value="">Selezione un'attività</option>
                    <option v-for="activity in getActivities" :key="activity.id" :value="activity.id">{{activity.type}}</option>
                </select>
            </div>
        </div>


        <button class="w-20 btn btn-lg btn-primary" type="submit">
            Submit
        </button>
    </form>
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
            signature: "",
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
                signature: this.signature,
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

</style>