<template>
    <div class="ls-export">
        <div class="ls-export__content">
            <h6 class="mb-3">Selziona Mese e Anno</h6>
            <select class="form-select" aria-label="Default select example" v-model="selectMonth">
                <option selected value="">Filtra per mese</option>
                <option v-for="(month, index) in months" :key="index" :value="index + 1">{{month}}</option>
            </select>  
            <select class="form-select my-4" aria-label="Default select example" v-model="selectYear">
                <option selected value="">Filtra per anno</option>
                <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
            </select> 
            <button type="button" class="btn btn-danger" @click="ExportAttendace">Esporta</button>   
        </div>
    </div>
</template>

<script>
export default {
    name: 'Export',
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
    mounted() {
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

        ExportAttendace() {
            let payload = {
                month : this.selectMonth,
                year : this.selectYear
            }
            if(payload.month && payload.year) {
                this.$store.dispatch('exportWord', payload);
            }   
        }
    }
}
</script>

<style lang="scss" scoped>
.ls-export {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 250px;
    border: 1px solid black;
    border-radius: 25px;
    background-color: white;
    .ls-export__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 100%;
        margin: 0 auto;;
    }
}
</style>