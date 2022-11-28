<template>
    <v-app>
        <NavigationBar/>
        <v-main>
            <v-container>
                <p></p>
                <v-row><p class="title">VOS DEMANDES DE RESERVATIONS</p></v-row>
            </v-container>

            <v-container>
                <v-row>
                    <v-col cols="12" v-for="(demandeReservation , d) in demandeReservationListSavingByUser" :key="d">
                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="title_simulation"> DEMANDE DE RESERVATION {{ d + 1 }}</v-list-item-title>
                                        <v-list-item-subtitle>Numéro de reference :&nbsp;&nbsp;  ...{{ demandeReservation.id.slice(-10) }}</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-action>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                            </template>
  
                                            <v-list>
                                                <v-list-item link>
                                                    <v-list-item-action><v-icon>mdi-pencil</v-icon></v-list-item-action>                         
                                                    <v-list-item-subtitle>Editer</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link @click="annulerDemandeReservationLogement(demandeReservation)">
                                                    <v-list-item-action><v-icon>mdi-cog-sync</v-icon></v-list-item-action>                          
                                                    <v-list-item-subtitle>Annuler</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link @click="soumettreDemandeReservationLogement(demandeReservation)">    
                                                    <v-list-item-action><v-icon>mdi-sync</v-icon></v-list-item-action>                      
                                                    <v-list-item-subtitle>Soumettre</v-list-item-subtitle>
                                                </v-list-item>

                                                <v-list-item link @click="deleteDemandeReservationLogement(demandeReservation)">  
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
                                        <v-list-item-subtitle>{{ demandeReservation.designation }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>Description :</v-list-item-subtitle>
                                    </v-list-item-content>
                    
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ demandeReservation.description }}</v-list-item-subtitle>
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
import { API_OBTENIR_LISTE_DEMANDE_RESERVATION_PAR_USER , API_SOUMETTRE_DEMANDE_RESERVATION } from '../../globalConfig/globalConfig'
import { API_ANNULER_DEMANDE_RESERVATION , API_SUPPRIMER_DEMANDE_RESERVATION_PAR_ID } from '../../globalConfig/globalConfig'

export default {
    name : "SelectionnerDemandeReservationLogement",
    components:{
        NavigationBar,
        FooterBar
    },
    data(){
        return{
            demandeReservationListSavingByUser : [],
        }
    },

    methods:{
        
        // RECUPERER LA LISTE DE TOUTES LES DEMANDES DE RESERVATIONS ENREGISTRÉES PAR L'UTILISATEUR
        async getDemandeReservationListSavingByUser(){
            await axios.get(API_OBTENIR_LISTE_DEMANDE_RESERVATION_PAR_USER("faadc15f-2808-44e0-94cc-d0bd841bcf59")).then((response) => {
                this.demandeReservationListSavingByUser = response.data.data ;
            }).catch((e) => {
                console.log(e)
            });
        },


        // SUPPRIMER UNE DEMANDE DE RESERVATION
        async deleteDemandeReservationLogement(demandeReservation){
            this.$swal.fire({title: 'Confirmer ?',text: "Cette action est irréversible",icon: 'warning',showCancelButton: true,
                confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Oui ,supprimer!'
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.delete(API_SUPPRIMER_DEMANDE_RESERVATION_PAR_ID(demandeReservation.id)).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Supprimé!' , 'La demande a bien été supprimé.' , 'success')
                            this.getDemandeReservationListSavingByUser();
                        } else {
                            this.$swal.fire('Erreur!' , 'Echec de la suppression.' , 'error')  
                        }
                    }).catch(e => {
                        this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
                    })
                }
            }).catch(e => {
                this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
            })
        },


        //SOUMETTRE UNE DEMANDE DE RESERVATION
        async soumettreDemandeReservationLogement(demandeReservation_id){
            this.$swal.fire({title: 'Confirmer !',text: "Voulez vous soumettre cette demande ?",icon: 'warning',showCancelButton: true,
                confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Transformer!'
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.put(API_SOUMETTRE_DEMANDE_RESERVATION(demandeReservation_id)).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Transformé!' , 'Votre demande a bien été soumis.' , 'success')
                        } else {
                            this.$swal.fire('Erreur!' , 'Echec de la soumission de la demande.' , 'error')  
                        }                  
                    }).catch(e => {
                        this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
                    })
                }
            }).catch(e => {
                this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
            })
        },

        async annulerDemandeReservationLogement(demandeReservation_id){
            this.$swal.fire({title: 'Confirmer !',text: "Voulez vous annuler cette demande ?",icon: 'warning',showCancelButton: true,
                confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Transformer!'
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.put(API_ANNULER_DEMANDE_RESERVATION(demandeReservation_id)).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Annulation!' , 'Votre demande a bien été annulée.' , 'success')
                        } else {
                            this.$swal.fire('Erreur!' , 'Echec de l\'annulation de la demande.' , 'error')  
                        }                  
                    }).catch(e => {
                        this.$swal.fire({ icon: 'error', title: 'Erreur...', text: e})
                    })
                }
            })
        },

    },

    mounted(){
        this.getDemandeReservationListSavingByUser();
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