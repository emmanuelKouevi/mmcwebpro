<template>

    <v-app>

        <v-container> 
            <v-btn text color="blue" @click="creerNouveauProduitLogement"> 
                <v-icon>mdi-plus</v-icon>NOUVEAU PRODUIT LOGEMENT
            </v-btn>



            <v-spacer></v-spacer>

            <v-card>
                <v-card-title>PRODUITS LOGEMENTS    
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>

                <v-data-table :headers="headers" :items="produitLogementList" :search="search">
                    <template v-slot:[`item.estValide`]="{ item }">
                        <v-chip v-if="item.estValide == true" color="green" text-color="white" class="mr-2"><span class="etat">Valide</span></v-chip>
                        <v-chip v-else-if="item.estValide == false" color="red" text-color="white" class="mr-2"><span class="etat">Non valide</span></v-chip> 
                        <v-chip v-else color="blue" text-color="white" class="mr-2"><span class="etat">Aucune décision</span></v-chip>
                    </template>

                    <template v-slot:[`item.estActive`]="{ item }">
                        <v-chip v-if="item.estActive == true" color="green" text-color="white" class="mr-2"><span class="etat">Activé</span></v-chip>
                        <v-chip v-else-if="item.estActive == false" color="red" text-color="white" class="mr-2"><span class="etat">Désactivé</span></v-chip>
                        <v-chip v-else color="blue" text-color="white" class="mr-2"><span class="etat">Aucune décision</span></v-chip>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon title="editer" color="blue" small class="mr-2" @click="modifierProduitLogement(item)">mdi-pencil</v-icon>                       
                        <v-icon title="valider" color="green" small class="mr-2" @click="validerProduitLogement(item)">mdi-sync</v-icon>
                        <v-icon v-if="item.estActive == true" title="désactiver" color="secondary" small class="mr-2" @click="desactiverProduitLogement(item)">mdi-gesture-tap</v-icon>
                        <v-icon v-if="item.estActive == false" title="activer" color="secondary" small class="mr-2" @click="activerProduitLogement(item)">mdi-gesture-tap</v-icon>
                        <v-icon v-if="item.estActive == null" title="activer" color="secondary" small class="mr-2" @click="activerProduitLogement(item)">mdi-gesture-tap</v-icon>
                        <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                    </template>

                </v-data-table>
            </v-card>
        </v-container>
    </v-app>
    
</template>


<script>

    import axios from "axios";
    import $ from 'jquery'
    import { API_ACTIVER_PRODUIT_LOGEMENT, API_DESACTIVER_PRODUIT_LOGEMENT, API_OBTENIR_LISTE_PRODUIT_LOGEMENT_PAR_PROMOTEUR, API_OBTENIR_PRODUIT_LOGEMENT_PAR_ID, API_SUPPRIMER_PRODUIT_LOGEMENT_PAR_ID , BASE_URL } from '../globalConfig/globalConfig';

    export default {
        name : "SelectionnerProduitLogement",
        data(){
            return{
                search:'',
                dialogDelete: false,
                headers:[
                    { text : 'Code' , value: 'code' },
                    { text : 'Designation' , value : 'designation' },
                    { text : 'Programme Immobilier'  , value : 'programmeImmobilier.designation'},
                    { text : 'Valide' , value : 'estValide' },
                    { text : 'Actif' , value : 'estActive' },
                    { text : 'Actions' , value : 'actions' , sortable : false }
                ],
                modeValidationProduitLogement : true,
                produitLogementList: [],
            }
        },

        
        methods: {

            //EDITER UN PRODUIT LOGEMENT

            modifierProduitLogement(product){
                const parsedProduct = JSON.stringify(product);
                localStorage.setItem('product', parsedProduct);
                this.$router.push({path : '/CreerModifierProduitLogement'});
            },
            

            // DÉSACTIVATION D'UN PRODUIT LOGEMENT

            desactiverProduitLogement(product){
                axios.put(API_DESACTIVER_PRODUIT_LOGEMENT(product.id))
                .then((response) => {
                    if (response.data.data == true) {
                        this.$swal.fire('Désactivation','Désactivé','success')

                        axios.get(API_OBTENIR_PRODUIT_LOGEMENT_PAR_ID(product.id)).then((result) => {
                            if (result.status == 200) {
                                product = result.data.data    
                            }
                        }).catch((e) => {
                            this.errorMsg = e
                            $(".myAlert-bottom").fadeIn();
                            setTimeout(function(){
                                $(".myAlert-bottom").fadeOut(); 
                            }, 4000)
                        })
                        product.estActive = false
                    }
                    else if (response.data.data == 204) {
                        this.$swal.fire('Désactivation','Erreur dans la desactivation du produit logement','error') 
                    }
                    else{
                        this.$swal.fire('Error','Erreur liée au serveur','error') 
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".myAlert-bottom").fadeIn();
                    setTimeout(function(){
                        $(".myAlert-bottom").fadeOut(); 
                    }, 4000)
                })
            },


            // ACTIVATION D'UN PRODUIT LOGEMENT 

            activerProduitLogement(product){
                if (product.estValide == true) {
                    axios.put(API_ACTIVER_PRODUIT_LOGEMENT(product.id)).then((response) => {
                        if (response.data.data == true) {
                            this.$swal.fire('Activation','Activé.','success')
                            axios.get(`${BASE_URL}produitlogements/${product.id}`).then((resultat) => {
                                if (resultat.status == 200) {
                                    product = resultat.data.data
                                }
                            }).catch((e) => {
                                this.errorMsg = e
                                $(".myAlert-bottom").fadeIn();
                                setTimeout(function(){
                                    $(".myAlert-bottom").fadeOut(); 
                                }, 4000)
                            })
                                product.estActive = true
                            }
                            else if (response.data.data == false) {
                                this.$swal.fire('Erreur','Erreur dans l\' activation du produit logement','error')
                            }
                        })
                    }

                else{
                    this.$swal.fire('Erreur','Le produit Logement doit être validé !','error')
                }

            },


            validerProduitLogement(product){
                var parsedProduct = JSON.stringify(product);
                localStorage.setItem('product', parsedProduct);
                localStorage.setItem('modeValidate' , this.modeValidationProduitLogement)
                this.$router.push({name : '/CreerModifierProduitLogement'});
            },



            // SUPPRESSION D'UN PRODUIT LOGEMENT 

            supprimerProduitLogement(product){
                this.$swal.fire({title: 'Confirmer ?',text: "Cette action est irréversible",icon: 'warning',showCancelButton: true,
                    confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',cancelButtonText: 'Annuler',confirmButtonText: 'Oui ,supprimer!'
                }).then((result) => {
                    if(result.isConfirmed){        
                        axios.delete(API_SUPPRIMER_PRODUIT_LOGEMENT_PAR_ID(product.id))
                        .then(response => {
                            if(response.data.data == true){
                                this.$swal.fire('Supprimé!','Le produit logement a bien ete supprimé.','success');
                                this.getProduitLogementList();
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


            //NAVIGUER VERS LA PAGE DE CRÉATION D'UN PROGRAMME IMMOBILIER

            creerNouveauProduitLogement(){
                this.$router.push({path : '/CreerModifierProduitLogement'});
            },

                        
            
            // OBTENIR LA LISTE DES PRODUITS LOGEMENTS ENREGISTRÉS PAR LE PROMOTEUR

            async ObtenirListeProduitLogement(){
                await axios.get(API_OBTENIR_LISTE_PRODUIT_LOGEMENT_PAR_PROMOTEUR("promoteur01")).then((response) => {
                    const listProduitLogement = response.data.data;
                    this.produitLogementList = listProduitLogement
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
            this.ObtenirListeProduitLogement()
        },

    }
</script>


<style scoped>
    .etat{
        font-weight: bold;
    }
</style>