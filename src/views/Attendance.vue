<template>
    <div class="container">
        <h1 class="mt-3 mb-5">Registro presenze</h1>

        <div class="row my-3">
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <select class="form-select" aria-label="Default select example" v-model="selectMonth">
                            <option selected value="">Filtra per mese</option>
                            <option v-for="(month, index) in months" :key="index" :value="index + 1">{{month}}</option>
                        </select>    
                    </div>
                    <div class="col">
                        <select class="form-select" aria-label="Default select example" v-model="selectYear">
                            <option selected value="">Filtra per anno</option>
                            <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
                        </select>    
                    </div>
                    <div v-if="checkRole()" class="col">
                        <input type="text" class="form-control" placeholder="Nome o Cognome" aria-label="name" v-model="searchUser" @keyup.enter="filterAttendace">    
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-outline-info" @click="filterAttendace">Filtra</button>
                    </div>        
                </div>
                
            </div>
            
            <div class="col-4">
                <div class="row">
                    <div class="col-6 offset-md-6 col-md-3">
                        <button v-if="checkExportPermission()" type="button" class="btn btn-warning" @click="ExportComponent = !ExportComponent">Esporta</button>
                    </div>
                    <div class="col-6 col-md-3">
                        <router-link :to="{ name: 'create-attendance'}" class="navbar-brand">
                            <button type="button" class="btn btn-primary">Aggiungi</button>
                        </router-link>
                    </div> 
                </div>  
            </div>

        </div>


        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-if="checkRole()" scope="col">Cognome</th>
                    <th v-if="checkRole()" scope="col">Nome</th>
                    <th scope="col">Data</th>
                    <th scope="col">Ora Mattina inizio</th>
                    <th scope="col">Ora Mattina fine</th>
                    <th scope="col">Ora Pomeriggio inizio</th>
                    <th scope="col">Ora Pomeriggio fine</th>
                    <th scope="col">Attività</th>
                    <th colspan="2" class="text-center">Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(attendance, index) in getAttendances" :key="index">
                    <td v-if="checkRole()">{{attendance.user.surname}}</td>
                    <td v-if="checkRole()">{{attendance.user.name}}</td>
                    <td>{{attendance.date}}</td>
                    <td>{{attendance.time_start_morning}}</td>
                    <td>{{attendance.time_end_morning}}</td>
                    <td>{{attendance.time_start_afternoon}}</td>
                    <td>{{attendance.time_end_afternoon}}</td>
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
    <Export v-if="ExportComponent" @ExportComponent="getValueExportComponent"/>    
</template>

<script>
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';
import Export from '../components/Export.vue'

export default {
    name: "Attendance",
    components: {
        Export,
    },
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
            searchUser: '',
            ExportComponent: false,
        };
    },
    setup () {
        const store = useStore();
        return {
            getAttendances: computed(() => store.getters.getAttendances),
            getUser: computed(() => store.getters.getUser),
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
                year : this.selectYear,
                user: this.searchUser
            }
            this.$store.dispatch('getAttendance', payload);
        },

        getValueExportComponent(value) {
            this.ExportComponent = value;
        },

        checkExportPermission() {
            const permissions = this.getUser.permission;

            if (permissions.some(e => e.name == 'export')) {
            return true
            }

            return false
        },

        checkRole() {
            const roles = this.getUser.role;

            if (roles.includes("super-admin") || roles.includes("tutor")) {
            return true
            }

            return false
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
