<template>

    <v-app>

        <v-container> 
          
            <v-btn text color="blue" @click="creerNouveauProgrammeImmobilier"><v-icon>mdi-plus</v-icon>NOUVEAU PROGRAMME</v-btn>

            <v-spacer></v-spacer>

            <v-card>

                <v-card-title>PROGRAMMES IMMOBILIERS   
                <v-spacer></v-spacer>

                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>

                <v-data-table :headers="headers" :loading="programmeImmobilierList.length < 0" :items="programmeImmobilierList" :search="search">
                    <template v-slot:[`item.estValide`]="{ item }">
                        <v-chip v-if="item.estValide == true" color="green" text-color="white" class="mr-2">valide</v-chip>
                        <v-chip v-else-if="item.estValide == false" color="red" text-color="white" class="mr-2">Non valide</v-chip>
                        <v-chip v-else color="blue" text-color="white" class="mr-2">Aucune décision</v-chip>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon title="editer" color="blue" small class="mr-2" @click="modifierProgrammeImmobilier(item)">mdi-pencil</v-icon>
                        <v-icon title="valider" color="green" small class="mr-2" @click="validateProgrammeImmobilier(item)">mdi-sync</v-icon>
                        <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProgrammeImmobilier(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </v-app>

</template>


<script>

    import axios from "axios";
    import $ from 'jquery'
    import { API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER_PAR_PROMOTEUR, API_SUPPRIMER_PROGRAMME_IMMOBILIER } from '../globalConfig/globalConfig';

    export default {
        name : "SelectionnerProgrammeImmobilier",
        data(){

            return{
                search:'',
                dialogDelete: false,
                headers:[
                    { text : 'Code' , value: 'code' },
                    { text : 'Designation' , value : 'designation' },
                    { text : 'Ville'  , value : 'ville.designation'},
                    { text : 'Valide' , value : 'estValide' },
                    { text : 'Actions' , value : 'actions' , sortable : false }
                ],
                validateProgrammeImmobilier : true,
                programmeImmobilierList: [],

            }

        },

        
        methods: {

            // VALIDER UN PROGRAMME IMMOBILIER

            validerProgrammeImmobilier(programmeImmobilier){
                var parsedProgramme = JSON.stringify(programmeImmobilier);
                localStorage.setItem('programmeImmobilier', parsedProgramme);
                localStorage.setItem('modeValidate' , this.validateProgrammeImmobilier)
                this.$router.push({ path: '/CreerModifierProgrammeImmobilier'});
            },


            //MODIFICATION D'UN PROGRAMME IMMOBILIER

            modifierProgrammeImmobilier(programmeImmobilier) {
                const parsedProgramme = JSON.stringify(programmeImmobilier);
                localStorage.setItem("programmeImmobilier", parsedProgramme);
                this.$router.push({ path: "/CreerModifierProgrammeImmobilier" });
            },



            // SUPPRIMER UN PROGRAMME IMMOBILIER

            supprimerProgrammeImmobilier(programmeImmobilier){
                this.$swal.fire({title: 'Confirmer ?',text: "Cette action est irréversible",icon: 'warning',showCancelButton: true,
                    confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Oui ,supprimer!'
                }).then((result) =>{
                    if(result.isConfirmed){
                        axios.delete(API_SUPPRIMER_PROGRAMME_IMMOBILIER(programmeImmobilier.id))
                        .then(response => {
                            if (response.data.data == true) {
                                this.$swal.fire('Supprimé!','Le programme immobilier, a bien ete supprimé.','success')
                                this.ObtenirListeProgrammeImmobilier();
                            } else {
                                this.$swal.fire('Erreur!' , 'Echec de la suppression du programme immobilier.' , 'error')  
                            }
                    
                        }).catch(e => {
                            this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
                        })
                    }
                })
            },

            
            


            // NAVIGATION VERS LA PAGE DE CREATION D'UN NOUVEL PROGRAMME IMMOBILIER
            
            creerNouveauProgrammeImmobilier() {
                this.$router.push({ path: "/CreerModifierProgrammeImmobilier" });
            },

            
            
            // OBTENIR LA LISTE DES PROGRAMMES IMMOBILIERS PAR PROMOTEUR

            async ObtenirListeProgrammeImmobilier(){
                await axios.get(API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER_PAR_PROMOTEUR("promoteur01"))
                .then((response) => {
                    this.programmeImmobilierList = response.data.data;
                }).catch((e) => {
                    this.errorMsg = e
                    $(".myAlert-bottom").fadeIn();
                    setTimeout(function(){
                        $(".myAlert-bottom").fadeOut(); 
                    }, 4000)
                });
            }

        },



        mounted() {
            this.ObtenirListeProgrammeImmobilier()
        },

    }
</script>


<style scoped>


</style>