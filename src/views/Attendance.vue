<template>
    <div class="container">
        <h1>Presenze</h1>
        <router-link to="/create-attendance" class="navbar-brand">
            <button type="button" class="btn btn-primary">Aggiungi</button>
        </router-link>

        <div class="row my-3">
            <div class="col-2">
                <select class="form-select" aria-label="Default select example" v-model="selectMonth">
                    <option selected value="">Filtra per mese</option>
                    <option v-for="(month, index) in months" :key="index" :value="index + 1">{{month}}</option>
                </select>    
            </div>
            <div class="col-2">
                <select class="form-select" aria-label="Default select example" v-model="selectYear">
                    <option selected value="">Filtra per anno</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
                </select>    
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-outline-info" @click="filterAttendace">Filtra</button>
            </div>
        </div>


        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Ora Mattina inizio</th>
                    <th scope="col">Ora Mattina fine</th>
                    <th scope="col">Ora Pomeriggio inizio</th>
                    <th scope="col">Ora Pomeriggio fine</th>
                    <th scope="col">Firma</th>
                    <th scope="col">Attività</th>
                    <th colspan="2" class="text-center">Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(attendance, index) in getAttendances" :key="index">
                    <td>{{attendance.date}}</td>
                    <td>{{attendance.time_start_morning}}</td>
                    <td>{{attendance.time_end_morning}}</td>
                    <td>{{attendance.time_start_afternoon}}</td>
                    <td>{{attendance.time_end_afternoon}}</td>
                    <td>{{attendance.signature}}</td>
                    <td>{{attendance.activity_id}}</td>
                    <td>
                        <router-link :to="{ name: 'edit-attendance', params: { id: attendance.id } }" class="navbar-brand">
                            <button type="button" class="btn btn-success">Modifica</button>
                        </router-link>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger">Elimina</button>
                    </td>
                </tr>
            </tbody>
        </table>    
    </div>
    
</template>

<script>
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

export default {
    name: "Attendance",
    data() {
        return {
            months: [
                'Gennaio',
                'Febbraio',
                'Marzo',
                'Aprile',
                'Maggio',
                'Giugno',
                'Luglio',
                'Agosto',
                'Settempre',
                'Ottobre',
                'Novembre',
                'Dicembre',
            ],
            years: [],
            selectMonth: '',
            selectYear: '',
        };
    },
    setup () {
        const store = useStore();
        return {
            getAttendances: computed(() => store.getters.getAttendances),
        }
    },
    mounted() {
        this.$store.dispatch('getAttendance');
        this.getYears();
    },
    methods: {
        getYears() {
            let year = new Date().getFullYear();
            this.years.push(year);
            for(let i=1; i<5; i++) {
                this.years.push(year - i);
            }
        },

        filterAttendace() {
            let payload = {
                month : this.selectMonth,
                year : this.selectYear
            }
            let month = this.selectMonth;
            let year = this.selectYear;
            this.$store.dispatch('getAttendance', payload);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
