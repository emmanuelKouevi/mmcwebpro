<template>
    <v-app>
        <NavigationBar/>

        <v-main>

            <v-container>
                <p></p>
                <v-row><p class="title">VOS SIMULATIONS ENREGISTRÉES</p></v-row>
            </v-container>

            <v-container>
                <v-row>
                    <v-col cols="12" v-for="(simulation , s) in simulationSavingsByUserList" :key="s">
                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="title_simulation"> SIMULATION {{ s + 1 }}</v-list-item-title>
                                        <v-list-item-subtitle>Numéro de reference :&nbsp;&nbsp;  ...{{ simulation.id.slice(-10) }}</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-action>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                            </template>
  
                                            <v-list>
                                                <v-list-item link @click="editSimulationFinancement(simulation)">
                                                    <v-list-item-action><v-icon>mdi-pencil</v-icon></v-list-item-action>                         
                                                    <v-list-item-subtitle>Editer</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link>
                                                    <v-list-item-action><v-icon>mdi-cog-sync</v-icon></v-list-item-action>                          
                                                    <v-list-item-subtitle>Exécuter</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link @click="transformerSimulationEnDemandeReservation(simulation)">    
                                                    <v-list-item-action><v-icon>mdi-sync</v-icon></v-list-item-action>                      
                                                    <v-list-item-subtitle>Transformer</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link @click="deleteSimulationImmobilier(simulation)">  
                                                    <v-list-item-action><v-icon>mdi-delete</v-icon></v-list-item-action>                        
                                                    <v-list-item-subtitle>Supprimer</v-list-item-subtitle>
                                                </v-list-item>

                                            </v-list>
                                        </v-menu>
                                    </v-list-item-action>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Designation :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ simulation.designation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Description :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ simulation.description }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                
                            </v-list>
                            
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

        </v-main>

        <FooterBar/>
    </v-app>
</template>

<script>
import NavigationBar from '../../layout/navigationBar.vue'
import FooterBar from '../../layout/footerBar.vue'
import axios from "axios"
import {  API_OBTENIR_LISTE_SIMULATION_FINANCEMENT_PAR_USER , API_SUPPRIMER_SIMULATION_FINANCEMENT_PAR_ID , /* API_TRANSFORMER_SIMULATION_EN_DEMANDE */  } from '../../globalConfig/globalConfig';
export default {
    name : "SelectionnerSimulationFinancementImmobilier",
    components:{
        NavigationBar,
        FooterBar
    },
    data(){
        return{
            simulationSavingsByUserList : [],
        }
    },

    methods:{

        // RECUPERER LA LISTE DES SIMULATIONS ENREGISTRÉS PAR UTILISATEUR

        async getSimulationSavingsByUserList(){
            await axios.get(API_OBTENIR_LISTE_SIMULATION_FINANCEMENT_PAR_USER("faadc15f-2808-44e0-94cc-d0bd841bcf59"))
            .then((response) => {
                this.simulationSavingsByUserList = response.data.data
            }).catch((e) => {
                console.log(e)
            });
        },

        
        // TRANSFORMER UNE SIMULATION EN DEMANDE DE RESERVATION

        async transformerSimulationEnDemandeReservation(simulation){
            /*this.$swal.fire({title: 'Confirmer !',text: "Voulez vous transformer cette simulation ?",icon: 'warning',showCancelButton: true,
                confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Transformer!'
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.post(API_TRANSFORMER_SIMULATION_EN_DEMANDE(simulation.id)).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Transformé!' , 'La simulation a bien été transformé.' , 'success')
                        } else {
                            this.$swal.fire('Erreur!' , 'Echec de la transformation de la simulation.' , 'error')  
                        }
                    
                    }).catch(e => {
                        console.log(e)
                        this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
                    })
                }
            }).catch(e => {
                console.log(e)
                this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
            })*/ 
            const parsedSimulation = JSON.stringify(simulation);
            localStorage.setItem('simulation', parsedSimulation);
            this.$router.push({path: "/TransformerSimulationFinancement" });
        },

        //MODIFIER UNE SIMULATION
        editSimulationFinancement(simulation){
            const parsedSimulation = JSON.stringify(simulation);
            localStorage.setItem('simulation', parsedSimulation);
            this.$router.push({path: "/ModifierSimulationFinancementImmobilier" });
        },


        //EXECUTER UNE SIMULATION DE FINANCEMENT

        /*async executerSimulationFinancement(simulation){

        },*/

        // SUPPRIMER UNE SIMULATION DE FINANCEMENT IMMOBILIER
        deleteSimulationImmobilier(simulation){
            this.$swal.fire({title: 'Confirmer ?',text: "Cette action est irréversible",icon: 'warning',showCancelButton: true,
                confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Oui ,supprimer!'
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.delete(API_SUPPRIMER_SIMULATION_FINANCEMENT_PAR_ID(simulation.id)).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Supprimé!' , 'La simulation a bien été supprimé.' , 'success')
                            this.getSimulationSavingsByUserList();
                        } else {
                            this.$swal.fire('Erreur!' , 'Echec de la suppression de la simulation.' , 'error')  
                        }
                    
                    }).catch(e => {
                        this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
                    })
                }
            }).catch(e => {
                this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
            })
        },

    },

    mounted(){
        this.getSimulationSavingsByUserList();
    }
}
</script>

<style scoped>
    .title{
        font-weight: bold;
        color: #1B1464;
    }

    .title_simulation{
        font-weight: bold;
    }
</style>