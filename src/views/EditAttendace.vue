<template>
  <h1>Modifica Presenza</h1>
   <form @submit.prevent="editAttendance">

        <div class="container">
            <div class="row mb-3">
                <div class="col">
                    <input
                        v-model="getAttendance.date"
                        type="date"
                        class="form-control"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="getAttendance.time_start_morning"
                        type="time"
                        class="form-control"
                        placeholder="Inizio Mattina"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="getAttendance.time_end_morning"
                        type="time"
                        class="form-control"
                        placeholder="Fine Mattina"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="getAttendance.time_start_afternoon"
                        type="time"
                        class="form-control"
                        placeholder="Inizio Pomeriggio"
                    />
                </div>
                <div class="col">
                    <input
                        v-model="getAttendance.time_end_afternoon"
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
                    v-model="getAttendance.signature"
                    type="text"
                    class="form-control"
                    placeholder="Firma"
                />
            </div>
            <div class="col">
                <select class="form-select" aria-label="Default select example" v-model="getAttendance.activity_id">
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
    name: 'EditAttendace',
    data() {
        return {
            id: this.$route.params.id,
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
                signature: attendance.signature,
                activity_id: attendance.activity_id,
            };
            this.$store.dispatch('editAttendance', [this.id, payload])
                .then(() => this.$router.push('/attendance'))
                .catch((error) => console.log(error));
        },
    },

}
</script>

<style lang="scss" scoped>

</style>