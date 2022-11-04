<template>

    <v-app>

        <v-container>

            <v-dialog v-model="dialog" scrollable max-width="300px">

                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="blue" v-bind="attrs" v-on="on" text><v-icon>mdi-plus</v-icon> NOUVEAU LOGEMENT&nbsp;</v-btn>
                </template>

                <v-card>
                    <v-card-title>Type de Creation :</v-card-title>

                    <v-divider></v-divider>

                    <v-card-text>

                        <v-radio-group v-model="typeLogementCreation" column>

                            <v-radio label="Logement Unitaire" value="logement unitaire"></v-radio>
                            <v-radio label="Logement en series" value="logement en series"></v-radio>
                            <v-radio label="Logement par liste" value="logement par liste"></v-radio>

                        </v-radio-group>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>

                        <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
                        <v-btn color="blue darken-1" text @click="creerLogementTypePage()">OK</v-btn>

                    </v-card-actions>

                </v-card>

            </v-dialog>


            <v-spacer></v-spacer>

            <v-card>
                <v-card-title>LOGEMENTS    
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>

                <v-data-table :headers="headers" :items="logementList" :search="search">
                    
                    <template v-slot:[`item.estActive`]="{ item }">
                        <v-chip v-if="item.estActive == true" color="green" text-color="white" class="mr-2"><span class="etat">Activé</span></v-chip>
                        <v-chip v-else-if="item.estActive == false" color="red" text-color="white" class="mr-2"><span class="etat">Désactivé</span></v-chip>
                        <v-chip v-else color="blue" text-color="white" class="mr-2"><span class="etat">Aucune décision</span></v-chip>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon title="editer" color="blue" small class="mr-2" @click="modifierProduitLogement(item)">mdi-pencil</v-icon>                       
                        <v-icon v-if="item.estActive == true" title="désactiver" color="secondary" small class="mr-2" @click="desactiverLogement(item)">mdi-gesture-tap</v-icon>
                        <v-icon v-if="item.estActive == false" title="activer" color="secondary" small class="mr-2" @click="activerLogement(item)">mdi-gesture-tap</v-icon>
                        <v-icon v-if="item.estActive == null" title="activer" color="secondary" small class="mr-2" @click="activerLogement(item)">mdi-gesture-tap</v-icon>
                        <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerLogement(item)">mdi-delete</v-icon>
                    </template>

                </v-data-table>
            </v-card>
        </v-container>
    </v-app>
    
</template>


<script>

    import axios from "axios";
    import $ from 'jquery'
    import { API_OBTENIR_LISTE_LOGEMENT_PAR_PROMOTEUR , API_ACTIVER_LOGEMENT, API_DESACTIVER_LOGEMENT,  API_SUPPRIMER_LOGEMENT_PAR_ID  } from '../globalConfig/globalConfig';

    export default {
        name : "SelectionnerLogement",
        data(){
            return{
                search:'',
                typeLogementCreation: null,
                dialog: false,
                headers:[
                    { text : 'Reference' , value: 'id' },
                    { text : 'Designation' , value : 'designation' },
                    { text : 'Produit Logement'  , value : 'produitLogement.designation'},
                    { text : 'Actif' , value : 'estActive' },
                    { text : 'Actions' , value : 'actions' , sortable : false }
                ],
                logementList: [],
            }
        },

        
        methods: {

            // NAVIGATION VERS LA PAGE DE CREATION D'UN LOGEMENT EN FONCTION DU TYPE CHOISI
            creerLogementTypePage(){
                if (this.typeLogementCreation == 'logement unitaire') {
                    this.$router.push({ name: 'CreerModifierLogementUnitaire'})
                }
                else if (this.typeLogementCreation == 'logement en series') {
                    this.$router.push({name: 'CreerModifierLogementEnSeries'})
                }
                else{
                    this.$router.push({name:'CreerModifierLogementParListe'})
                }

                this.dialog = false; 
            },

            //EDITER UN LOGEMENT

            /**
               @TODO : Modifier un logement en fonction de son type 
             **/ 

            modifierProduitLogement(product){
                const parsedProduct = JSON.stringify(product);
                localStorage.setItem('product', parsedProduct);
                this.$router.push({path : '/CreerModifierProduitLogement'});
            },
            

            // DESACTIVATION D'UN LOGEMENT

            desactiverLogement(logement){
                axios.put(API_DESACTIVER_LOGEMENT(logement.id)).then((response) => {
                    if (response.data.data == true) {
                        this.$swal.fire('Désactivation' , 'Désactivé' , 'success')
                        this.getLogementListParPromoteur();
                    }
                    else if (response.data.data == 204) {
                        this.$swal.fire('Désactivation' , 'Erreur dans la desactivation du logement' , 'error') 
                    }
                    else{
                        this.$swal.fire('Error','Erreur serveur','error') 
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".myAlert-bottom").fadeIn();
                    setTimeout(function(){
                        $(".myAlert-bottom").fadeOut(); 
                    }, 4000)
                })
            },
 

            // ACTIVATION D'UN LOGEMENT

            activerLogement(logement){               
                axios.put(API_ACTIVER_LOGEMENT(logement.id)).then((response) => {
                    if (response.data.data == true) {
                        this.$swal.fire('Activation' , 'Activé.' , 'success')
                        this.getLogementListParPromoteur()
                    }
                    else if (response.data.data == false) {
                        this.$swal.fire('Erreur','Erreur dans l\' activation du produit logement','error')
                    }
                })
                
            },


            // SUPPRESSION D'UN  LOGEMENT 

            supprimerLogement(logement){
                this.$swal.fire({title: 'Confirmer ?',text: "Cette action est irréversible",icon: 'warning',showCancelButton: true,
                    confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Oui ,supprimer!'
                }).then((result) => {
                    if(result.isConfirmed){        
                        axios.delete(API_SUPPRIMER_LOGEMENT_PAR_ID(logement.id))
                        .then(response => {
                            if(response.data.data == true){
                                this.$swal.fire('Supprimé!' , 'Le produit logement a bien ete supprimé.' , 'success');
                                this.getLogementListParPromoteur()
                            }
                            else{
                                this.$swal.fire(response.data.messages[0].status,response.data.messages[0].message,'error')
                            }
                        }).catch(e => {
                            this.$swal.fire({icon: 'error',title: 'Erreur...',text: e})
                        })

                    }

                })
            
            },
                        
            
            // OBTENIR LA LISTE DES PRODUITS LOGEMENTS ENREGISTRÉS PAR LE PROMOTEUR

            async getLogementListParPromoteur(){
                await axios.get(API_OBTENIR_LISTE_LOGEMENT_PAR_PROMOTEUR("promoteur01")).then((response) => {
                    this.logementList = response.data.data;
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
            this.getLogementListParPromoteur()
        },

    }
</script>


<style scoped>
    .etat{
        font-weight: bold;
    }
</style>