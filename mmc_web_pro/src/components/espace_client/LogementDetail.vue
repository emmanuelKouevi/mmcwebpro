<template>

    <v-app>

        <NavigationBar/>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <v-container fluid>
                
                <v-dialog v-model="dialog" scrollable max-width="300px">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" text>RESERVER LE LOGEMENT&nbsp; <v-icon>mdi-menu-down</v-icon></v-btn>
                    </template>

                    <v-card>
                        <v-card-title>Reservation par :</v-card-title>

                        <v-divider></v-divider>

                        <v-card-text>

                            <v-radio-group v-model="typeDemandeReservation" column>

                                <v-radio label="Nouvelle Simulation" value="nouvelle simulation"></v-radio>
                                <v-radio label="Simulation Existante" value="simulation existante"></v-radio>
                                <v-radio label="Effectuer une demande manuelle" value="demande manuelle"></v-radio>

                            </v-radio-group>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>

                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="doReservationOrDoSimulation()">OK</v-btn>

                        </v-card-actions>

                    </v-card>

                </v-dialog>

            </v-container>
 
            <v-container fluid>

                <v-card>
                    <v-carousel>
                        <v-carousel-item v-for="(item,i) in imagesListLogement" :key="i" :src="item.contenu"
                            reverse-transition="fade-transition" transition="fade-transition">
                            <v-btn text @click="isFavorite = !isFavorite">
                                <v-icon v-if="isFavorite == false" color="red">mdi-heart-outline</v-icon>
                                <v-icon v-if="isFavorite == true" color="red">mdi-heart</v-icon>
                            </v-btn>
                        </v-carousel-item>
                    </v-carousel>
                </v-card> 
                

            </v-container>

            <v-container>

                <v-row class="section">

                    <v-col>DESCRIPTION</v-col>

                </v-row>

                <v-row>

                    <v-col> {{ logementItemSelected.description }} </v-col>

                </v-row>

            </v-container>

            <v-container>

                <v-row class="section">

                    <v-col>CARACTERISITIQUES DU LOGEMENT</v-col>

                </v-row>

                <v-row>
                    
                    <v-col>

                        <v-simple-table>

                        <template v-slot:default>

                            <thead>
                                <tr>
                                    <th class="text-left">CARACTERISTIQUES</th>
                                    <th class="text-left">VALEUR</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="item in caracteristiqueLogementList" :key="item.name">
                                    <td>{{ item.proprieteProduitLogement.designation }}</td>
                                    <td>{{ returnTrueValue(item)  }}</td>
                                </tr>
                            </tbody>

                        </template>

                    </v-simple-table>

                    </v-col>
                    

                </v-row>

            </v-container>

            <v-container>

                <v-row class="section">

                    <v-col>SIMULEZ UN FINANCEMENT IMMOBILIER</v-col>

                </v-row>

                <v-row>

                    <v-col cols="1"><img src="../../assets/institution_icon.svg" alt=""></v-col>
                    
                    <v-col cols="5"><label class="font-weight-bold">Besoin de Crédit pour l'acquisition de votre bien ?</label>
                    
                        <v-row>

                            <v-col><span class="text-muted">Obtenez votre logement par emprunt auprès des Etablissements Financiers </span></v-col>

                        </v-row>

                    </v-col>

                    <v-col cols="1"><v-btn color="primary" elevation="5" @click="$router.push({ name: 'CreerSimulationFinancementImmobilier' , params:{ id : logementItemSelected.id }})">FAIRE UNE SIMULATION</v-btn></v-col>

                </v-row>

            </v-container>

        </v-main>

        <FooterBar/>

    </v-app>
    
</template>


<script>
import axios from 'axios'
import { REF_ELEMENT_TYPEVALEUR_BOOLEAN, REF_ELEMENT_TYPEVALEUR_VILLE , REF_ELEMENT_TYPEVALEUR_REFERENCE , API_OBTENIR_LISTE_VILLES , API_REFERENCES_PAR_FAMILLE  } from '../globalConfig/globalConfig'
import { API_RECHERCHER_LOGEMENT_PAR_ID , API_OBTENIR_IMAGE_CONSULTATION } from '../globalConfig/globalConfig'
import NavigationBar from '../layout/navigationBar.vue'
import FooterBar from '../layout/footerBar.vue'

export default {
    name:"LogementDetail.vue",
    components : {
        NavigationBar,
        FooterBar
    },
    
    data(){

        return {
            dialog: false,
            isFavorite: false, 
            typeDemandeReservation : null,
            logementItemSelected : {},
            referenceList : [],
            villesList : [],
            successMsg :  null ,
            errorMsg : null,
            imagesListLogement : [],
            caracteristiqueLogementList : [],
        }

    }, 


    methods : {

        /**
         * @TODO - Gerer aussi les images list des logements
         */

        // RETOURNE LA DESIGNATION DE LA CARACTERISTIQUE AU CAS ELLE EST DE TYPE REFERENCE

        returnTrueValue(caracteristique){

            var trueValue;

            if(caracteristique == null) return null; 

            else if(caracteristique.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_REFERENCE){
                for (let index = 0; index < this.referenceList.length; index++) {
                    if (this.referenceList[index].id == caracteristique.valeurTexte) {  
                        trueValue = this.referenceList[index].designation
                    }
                }
            }

            else if(caracteristique.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_VILLE){
                for (let index = 0; index < this.villesList.length; index++) {
                    if (this.villesList[index].id == caracteristique.valeurTexte) {    
                        trueValue = this.villesList[index].designation
                    }
                }
            }

            else if(caracteristique.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_BOOLEAN){
                if (caracteristique.valeurTexte == "true") {     
                    trueValue = "Le logement possède un(e)" + ' ' + caracteristique.proprieteProduitLogement.designation
                }
            }

            else {
                trueValue = caracteristique.valeurTexte
            }

            return trueValue;

        },

        // NAVIGATION POUR LES OPERATIONS DE DEMANDE DE RESERVATIONS
        doReservationOrDoSimulation(){
            if (this.typeDemandeReservation == 'nouvelle simulation') {
                this.$router.push({ name: 'CreerSimulationFinancementImmobilier' , params:{ id : this.logementItemSelected.id }})
            }
            else if (this.typeDemandeReservation == 'simulation existante') {
                this.$router.push({name: 'SelectionnerSimulationFinancementImmobilier'})
            }
            else{
                this.$router.push({name:'CreerModifierDemandeReservationLogement'})
            }
            this.dialog = false; 
        },


        // RECUPERER DEPUIS LE MIDDLEWARE LA LISTE DE REFERENCES DE LA FAMILLE TYPE LOGEMENT

        async getReferenceList(){

            await axios.get(API_REFERENCES_PAR_FAMILLE('familleTypeLogement'))
            .then((response)  => {
                this.referenceList = response.data.data
            }).catch((error)  => {
                console.log(error)
            })
        },




        //OBTENIR LES INFORMATIONS DU LOGEMENT DEPUIS SON ID

        async getInfoLogementFromId(){
            if (this.$route.params.id != undefined || this.$route.params.id != null) {
                await axios.get(API_RECHERCHER_LOGEMENT_PAR_ID(this.$route.params.id)).then((response)  => {
                    this.logementItemSelected = response.data.data;
                    this.logementItemSelected.produitLogement.caracteristiqueProduitLogementList.forEach(element => {
                        this.caracteristiqueLogementList.push(element)
                    });
                }).catch((error)  => {
                    console.log(error)
                })
            }
            this.getImageConsultationAndImagesList();
        },


        // RECUPERER L'ENSEMBLE DES DOCUMENTS DU LOGEMENTS POUR AFFICHAGE

        async getImageConsultationAndImagesList(){
            if (this.logementItemSelected.produitLogement != null || this.logementItemSelected.produitLogement.id) {
               await axios.get(API_OBTENIR_IMAGE_CONSULTATION(this.logementItemSelected.produitLogement.id , 'ref.element.typeValeur.imageConsultation'))
               .then((response)  => {
                    this.imagesListLogement.push(response.data.data)
                }).catch((error)  => {
                    console.log(error)
                })
            }
        },


        // OBTENIR LA LISTE DES VILLES DEPUIS LE MIDDLEWARE

        async getVillesList(){
            await axios.get(API_OBTENIR_LISTE_VILLES)
            .then((response)  => {
                this.villesList = response.data.data
            }).catch((error)  => {
                console.log(error)
            })
        },

    },


    mounted(){
      this.getReferenceList();
      this.getVillesList();
      this.getInfoLogementFromId();
    },

}

</script>


<style scoped>
    .section{
        font-weight: bold;
        font-size: 30px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #353b48;
    }
</style>