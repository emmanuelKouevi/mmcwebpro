<template>

    <v-app>

        <v-app-bar app max-height="150px" fixed>

            <v-col cols="4"><v-toolbar-title class="toolbar_title">MA MAISON.COM</v-toolbar-title></v-col>

            <v-col cols="6" class="mt-7">

                <v-row>

                    <v-col><v-text-field label="Rechercher un logement ..." placeholder="Rechercher un logement ..." solo></v-text-field></v-col>

                    <v-col class="mt-2"><v-btn color="success"><v-icon>mdi-magnify</v-icon> Rechercher</v-btn></v-col>

                </v-row>
                
            </v-col>  

            <v-col>

                <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>

                    <template v-slot:activator="{ on, attrs }">

                        <v-btn color="indigo" text dark v-bind="attrs" v-on="on">Mon profil <v-icon>mdi-menu-down</v-icon></v-btn>

                    </template>
  
                    <v-card>

                        <v-list>

                        <v-list-item>

                            <v-list-item-avatar><img src="../../assets/kouevi_photo.jpg"></v-list-item-avatar>
            
                            <v-list-item-content><v-list-item-title>Emmanuel Herve Kouevi</v-list-item-title>

                            <v-list-item-subtitle>SICOGI</v-list-item-subtitle>

                            </v-list-item-content>
            
                            <v-list-item-action>

                            <v-btn icon><v-icon>mdi-account-edit</v-icon></v-btn>

                            </v-list-item-action>

                        </v-list-item>

                        </v-list>

            
                        <v-divider></v-divider>

            
                        <v-list>
                        
                        <v-list-item>

                            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>

                            <v-btn text>Déconnexion</v-btn>

                        </v-list-item>

                        </v-list>

                    </v-card>

                </v-menu>

            </v-col>

        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->

            <v-container fluid>

                <v-row>

                    <v-col><v-btn text color="info"><v-icon>mdi-bell</v-icon> CREER UNE RÊQUETE</v-btn></v-col>

                </v-row>

                <v-row>

                    <v-col cols="3">
                        
                        <v-card elevation="3"><span class="text-muted ml-3 font-weight-bold">FILTRER PAR CRITERES</span> 

                            <v-divider></v-divider>

                            <div class="critere_section">

                                <v-card-subtitle>Prix (Francs CFA)</v-card-subtitle>

                                <v-container class="choice_critere">

                                    <v-row class="price">

                                        <v-col><v-text-field  type="number" label="min"></v-text-field></v-col>

                                        <v-col><v-text-field type="number" label="max"></v-text-field></v-col>

                                    </v-row>

                                </v-container>

                            </div>

                            <v-divider></v-divider>

                            <div class="critere_section" v-for="critere in critereRechercheProduitLogementList" :key="critere.id">

                                <div v-if="critere.proprieteProduitLogement != null">

                                    <div v-if="critere.proprieteProduitLogement.type.id == 'ref.element.typeValeur.reference'">

                                        <v-card-subtitle>{{ critere.proprieteProduitLogement.designation }}</v-card-subtitle>

                                        <v-container class="choice_critere">

                                            <v-row v-for="(reference) in referenceList" :key="reference.id">

                                                <v-col cols="12" sm="2" md="4">

                                                    <v-row>
                                                    
                                                        <v-col><v-checkbox class="checkboxes" :value="reference.id" :id="reference.id" v-model="critere.valeurCritere.valeurTexte" :label="reference.designation"></v-checkbox></v-col>

                                                    </v-row>
        
                                                </v-col>

                                            </v-row>

                                        </v-container>

                                        <v-divider></v-divider>
                                        
                                    </div>

                                    <div v-if="critere.proprieteProduitLogement.type.id == 'ref.element.typeValeur.ville'">

                                        <v-card-subtitle>{{ critere.proprieteProduitLogement.designation }}</v-card-subtitle>

                                        <v-container class="choice_critere">

                                            <v-row v-for="(ville) in villesList" :key="ville.id">

                                                <v-col>

                                                    <v-row>
                                                    
                                                        <v-col><v-checkbox class="checkboxes" :value="ville.id" :id="ville.id" v-model="critere.valeurCritere.valeurTexte" :label="ville.designation"></v-checkbox></v-col>

                                                    </v-row>
        
                                                </v-col>

                                            </v-row>

                                        </v-container>

                                        <v-divider></v-divider>

                                    </div>


                                    <div v-if="critere.proprieteProduitLogement.type.id == 'ref.element.typeValeur.double'">
                                        
                                        <div v-if="critere.proprieteProduitLogement.designation == 'Superficie'">

                                            <v-card-subtitle>{{ critere.proprieteProduitLogement.designation }} (en m²)</v-card-subtitle>

                                            <v-container class="choice_critere">

                                                <v-row>

                                                    <v-col><v-text-field :value="getFirstValue(critere)" type="number" label="min"></v-text-field></v-col>

                                                    <v-col><v-text-field :value="getSecondValue(critere)" type="number" label="max"></v-text-field></v-col>

                                                </v-row>

                                            </v-container>

                                        </div>


                                    </div>

                                </div>

                            </div>

                        </v-card>
                        
                    </v-col>

                    <v-col cols="9">

                        <v-container>

                            <v-row>

                                <v-col cols="6" v-for="(logement) in logementsAvecImage" :key="logement.id">

                                    <v-card>
                                        
                                        <v-img :src="logement.imageConsultation.contenu" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">

                                            <v-card-title v-text="logement.designation"></v-card-title>

                                        </v-img>

                                        <v-card-subtitle>{{ logement.description }}</v-card-subtitle>

                                        <v-container class="ml-1">

                                            <v-row>

                                                <v-col><small>Prix du logement :</small></v-col>

                                                <v-col><small>{{ logement.produitLogement.prix }} FCFA</small></v-col>

                                            </v-row>

                                        </v-container>


                                        <v-divider></v-divider>


                                        <v-container class="mt-1">

                                            <v-row>

                                                <v-col v-for="caracteristiqueInList in logement.produitLogement.caracteristiqueProduitLogementList" :key="caracteristiqueInList.id">

                                                    <div v-if="caracteristiqueInList.proprieteProduitLogement.estDansListe == true">

                                                        <v-chip active text-color="orange"  v-if="caracteristiqueInList.proprieteProduitLogement.designation === 'Nombre de Pieces'">

                                                            <small>{{ returnTrueValue(caracteristiqueInList) }} Pièce(s)</small>

                                                        </v-chip>

                                                        <v-chip text-color="orange" v-if="caracteristiqueInList.proprieteProduitLogement.designation === 'Type de Logement'">

                                                            <small>{{ returnTrueValue(caracteristiqueInList) }}</small>

                                                        </v-chip>

                                                    </div>

                                                </v-col>

                                            </v-row>
                                            
                                        </v-container>
  
                                        <v-card-actions>

                                            <v-btn text color="orange" @click="consulterLogementDetail(logement)">VOIR PLUS</v-btn>

                                            <v-spacer></v-spacer>
  
                                            <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>

                                        </v-card-actions>

                                    </v-card>
                                    
                                </v-col>

                            </v-row>

                        </v-container>

                    </v-col>

                </v-row>

                <router-view></router-view>

            </v-container>

        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
    
</template>


<script>

import axios from 'axios'
import { API_OBTENIR_LISTE_LOGEMENT_PAR_PROMOTEUR , API_OBTENIR_IMAGE_CONSULTATION , API_OBTENIR_LISTE_PROPRIETES , API_OBTENIR_LISTE_OPERATEUR_CRITERE , REF_CRITERE_OPERATEUR_BETWEEN ,REF_CRITERE_OPERATEUR_IN , API_OBTENIR_LISTE_VILLES , API_REFERENCES_PAR_FAMILLE/*REF_CRITERE_OPERATEUR_SUPERIEUR*/ } from '../globalConfig/globalConfig'
import { /*API_RECHERCHER_LOGEMENT_PAR_MOT_CLE ,/*REF_CRITERE_OPERATEUR_INFERIEUR ,*/ /*REF_CRITERE_OPERATEUR_INFERIEUR_EGALE , REF_CRITERE_OPERATEUR_SUPERIEUR_EGALE , REF_CRITERE_OPERATEUR_EGALE ,*/ REF_ELEMENT_TYPEVALEUR_TIME  } from '../globalConfig/globalConfig'
import { /*REF_ELEMENT_TYPEVALEUR_STRING ,*/ REF_ELEMENT_TYPEVALEUR_DATE , REF_ELEMENT_TYPEVALEUR_DATETIME , REF_ELEMENT_TYPEVALEUR_REFERENCE , REF_ELEMENT_TYPEVALEUR_FLOAT } from '../globalConfig/globalConfig'
import { REF_ELEMENT_TYPEVALEUR_VILLE , REF_ELEMENT_TYPEVALEUR_DOUBLE , REF_ELEMENT_TYPEVALEUR_INTEGER , REF_ELEMENT_TYPEVALEUR_BOOLEAN , API_RECHERCHER_PRODUIT_LOGEMENT_PAR_CRITERELIST } from '../globalConfig/globalConfig'

    export default {

        name:"RechercheLogement",

        data(){

            return{
                menu: false,
                logementList : [],
                tousLesLogements : [],
                logementsAvecImage : [],
                proprieteProduitLogementList : [],
                operateursCritereList : [],
                critereRechercheProduitLogementList : [],
                villesList : [],
                referenceList : [],
                nbreLimitInteger : 6,
                lowerValue : 0   ,
                upperValue : 0,
            }

        },

        methods:{

            async chargerCritereLogementList(){

                // TODO : Creer une fonction pour l'affection des opérateurs

                await this.getProprieteProduitLogementList()
                await this.getOperateurCritereList()

                if(this.proprieteProduitLogementList != null && this.proprieteProduitLogementList.length > 0){
                    for (let index = 0; index < this.proprieteProduitLogementList.length; index++) {
                        
                        var critereRechercheProduitLogement = {
                            id : null ,
                            designation : null ,
                            description : null ,
                            proprieteProduitLogement : {
                                id : null ,
                                designation : null ,
                                description : null ,
                                estUsuelleFiltre : null,
                                estChoixMultipleFiltre : null,
                                maxValueIntegerFiltre : null ,
                                minValueIntegerFiltre : null,
                                maxValueFloatFiltre : null , //Type Float
                                minValueFloatFiltre :null , //Type Float
                                maxValueDoubleFiltre : null ,
                                minValueDoubleFiltre : null ,
                                maxValueDateFilter : null ,
                                minValueDateFilter : null ,
                                familleSiTypeReference : {
                                    id : null ,
                                    designation : null , 
                                    description : null
                                },

                                type : {
                                    id : null , 
                                    code : null ,
                                    designation : null,
                                },

                                familleProprieteProduitLogement : {
                                    id : null,
                                    designation : null 
                                },

                                icone: {
                                    id : null ,
                                    designation : null ,
                                    description : null ,
                                    contenu : null ,
                                    path : null ,
                                    format : {
                                        id : null ,
                                    },
                                    typeDocument : {
                                        id : null 
                                    },
                                    version : null
                                },
                                estObligatoire : null ,
                                estDansListe : null 
                            },
                            operateurCritere : {
                                id : null ,
                                code : null,
                                designation : null
                            },
                            valeurCritere : {
                                id : null,
                                designation : null ,
                                description : null ,
                                valeurTexte : []
                            }
                        }
                        critereRechercheProduitLogement.proprieteProduitLogement = this.proprieteProduitLogementList[index]

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_REFERENCE){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_VILLE){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }
                        
                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_FLOAT){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_BETWEEN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_BOOLEAN){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_DATETIME){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_DATE){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_TIME){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }

                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_INTEGER){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_IN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }

                        if (critereRechercheProduitLogement.proprieteProduitLogement != null && critereRechercheProduitLogement.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_DOUBLE){
                            for (let index = 0; index < this.operateursCritereList.length; index++) {
                                if (this.operateursCritereList[index].id == REF_CRITERE_OPERATEUR_BETWEEN) {
                                    critereRechercheProduitLogement.operateurCritere = this.operateursCritereList[index]
                                }
                            }
                        }
                        this.critereRechercheProduitLogementList.push(critereRechercheProduitLogement);
                    }
                }
            },


            //OBTENIR LA LISTE DES PROPRIETES PRODUITS LOGEMENTS

            async getProprieteProduitLogementList(){

                await axios.get(API_OBTENIR_LISTE_PROPRIETES)
                .then((response)  => {
                    this.proprieteProduitLogementList = response.data.data
                }).catch((error)  => {
                    console.log(error)
                })
            },




            // OBTENIR LA LISTE DES REFERENCES PAR FAMILLES TYPES LOGEMENTS 

            async getReferenceList(){

                await axios.get(API_REFERENCES_PAR_FAMILLE('familleTypeLogement'))
                .then((response)  => {
                    this.referenceList = response.data.data
                }).catch((error)  => {
                    console.log(error)
                })
            },



            // OBTENIR LA LISTE DES VILLES 

            async getVillesList(){

                await axios.get(API_OBTENIR_LISTE_VILLES)
                .then((response)  => {
                    this.villesList = response.data.data
                }).catch((error)  => {
                    console.log(error)
                })
            },




            // OBTENIR LA LISTE DES OPERATEURS CRITERES

            async getOperateurCritereList(){

                await axios.get(API_OBTENIR_LISTE_OPERATEUR_CRITERE)
                .then((response)  => {
                    this.operateursCritereList = response.data.data
                }).catch((error)  => {
                    console.log(error)
                })
            },



            async chargerLogementCompletClient(){

                await this.obtenirTousLesLogementCrees()

                if (this.tousLesLogements.length > 0) {
                    for (let index = 0; index < this.tousLesLogements.length; index++) {
                            
                        var logementComplet = {
                            id : null ,
                            designation : null ,
                            description : null ,
                            estActive : null , 
                            optionLogementList : [],
                            produitLogement : {},
                            imageConsultation: {
                                id: null,
                                designation: null,
                                description: null,
                                contenu: null,
                                format: {
                                    id: null,
                                    version: null,
                                },
                                typeDocument:{
                                    id: "ref.element.typeValeur.imageConsultation"
                                },
                                version : null
                            },
                        }

                        logementComplet.id = this.tousLesLogements[index].id
                        logementComplet.designation = this.tousLesLogements[index].designation
                        logementComplet.description = this.tousLesLogements[index].description
                        logementComplet.estActive = this.tousLesLogements[index].estActive
                        logementComplet.produitLogement = this.tousLesLogements[index].produitLogement
                        this.logementsAvecImage.push(logementComplet)
                    
                    }    
                                            
                }

                if (this.logementsAvecImage.length > 0) {
                    for (let count = 0; count < this.logementsAvecImage.length; count++) {

                        var image = {
                            id: null,
                            designation: null,
                            description: null,
                            contenu: null,
                            format: {
                                id: null,
                                version: null,
                            },
                            typeDocument:{
                                id: "ref.element.typeValeur.imageConsultation"
                            },
                            version : null
                        }

                        // On charge ici l'image de consultation
                        await axios.get(API_OBTENIR_IMAGE_CONSULTATION(this.logementsAvecImage[count].produitLogement.id ,"ref.element.typeValeur.imageConsultation"))
                        .then((response) => {
                            if (response.data == "") {
                                return ;
                            }
                            else {
                                image = response.data.data;
                            }
                                this.logementsAvecImage[count].imageConsultation = image
                        })
                            
                    }
                }

            },


            //OBTENIR LA LISTE DES LOGEMENTS PAR PROMOTEURS
            async obtenirTousLesLogementCrees() {
                await axios.get(API_OBTENIR_LISTE_LOGEMENT_PAR_PROMOTEUR('promoteur01'))
                .then((response) => {
                    for (let index = 0; index < response.data.data.length; index++) {                   
                        this.tousLesLogements.push(response.data.data[index])       
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },



            // RECHERCHE DE LOGEMENTS PAR UNE LISTE DE CRITERES (CRITERES SELECTIONNÉS PAR LE PROSPECT)

            async rechercheParCriteresList(critereList){

                for (let run = 0; run < critereList.length; run++) {
                    if(critereList[run].proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_INTEGER){
                        for (let runner = 0; runner < critereList[run].valeurCritere.valeurTexte.length; runner++) {
                            if (critereList[run].valeurCritere.valeurTexte[runner] == "5 et plus") {
                                critereList[run].valeurCritere.valeurTexte = this.modifyValeurTexte(critereList[run])
                            }  
                        }
                    }   
                }

                await axios.post(API_RECHERCHER_PRODUIT_LOGEMENT_PAR_CRITERELIST , critereList)
                .then((response) => {
                    this.logementsAvecImage = []
                    if (response.data.data.length > 0) {
                        for (let index = 0; index < response.data.data.length; index++) {

                            var image ;
                            var logementComplet = {
                                produitLogement : {
                                    id: null,
                                    designation: null,
                                    description: null,
                                    code: null,
                                    programmeImmobilier: {  
                                        id: null,
                                        version: null,
                                    },
                                    caracteristiqueProduitLogementList: [],
                                    version: null,
                                    estValide: null,
                                    estActive : null,
                                },
                                imageConsultation: {
                                    id: null,
                                    designation: null,
                                    description: null,
                                    contenu: null,
                                    format: {
                                        id: null,
                                        version: null,
                                    },
                                    typeDocument:{
                                        id: "ref.element.typeValeur.imageConsultation"
                                    },
                                    version : null
                                },
                            }

                            logementComplet.produitLogement = response.data.data[index]
                            this.logementsAvecImage.push(logementComplet)    

                            /*Ici , on recupere les documents liés à un produit logement tels que:
                            image de consultation , listes des images , listes des videos*/

                            
                            axios.get(API_OBTENIR_IMAGE_CONSULTATION(this.logementsAvecImage[index].produitLogement.id ,"ref.element.typeValeur.imageConsultation"))
                            .then((resultat) => {
                                if (resultat.data == "") {    
                                    return ;       
                                }
                                else {
                                    image = resultat.data.data;
                                }
                                this.logementsAvecImage[index].imageConsultation = image
                            })
                        }
                    }
                }).catch((error)=> {
                    console.log(error)
                })

                this.cleanAllValeurTexte(critereList);

            },



            // Avec cette methode , on videra la liste des valeurTexte de tous les criteres de recherche

            cleanAllValeurTexte(critereList){
                for (let index = 0; index < critereList.length; index++) {
                    critereList[index].valeurCritere.valeurTexte = []
                }
            },




            modifyValeurTexte(critere){

                var valeurMin = critere.proprieteProduitLogement.minValueIntegerFiltre
                var valeurMax = critere.proprieteProduitLogement.maxValueIntegerFiltre
                var valeurCompriseMinEtMax = [];
                var cinqPremierValeurs = [] ;
                var valeurPlus = [];
                var compteur = 1

                while(compteur <= 5 && valeurMin <= valeurMax){
                    cinqPremierValeurs.push(valeurMin++)
                    compteur++
                }

                for (let index = valeurMin; index <= valeurMax; index++) {
                    valeurCompriseMinEtMax.push(index)
                }

                for (var i = cinqPremierValeurs.at(-1); i <= valeurMax; i++) {
                    valeurPlus.push(i.toString());
                }

                for (let count = 0; count < critere.valeurCritere.valeurTexte.length; count++) {
                    if (critere.valeurCritere.valeurTexte[count] == "5 et plus") {
                        for (let counter = 0; counter < valeurPlus.length; counter++) {
                            if (critere.valeurCritere.valeurTexte[count] == valeurPlus[counter]) {
                                critere.valeurCritere.valeurTexte.splice(count , 0)
                            }  
                        }
                        Array.prototype.splice.apply(critere.valeurCritere.valeurTexte, [count, valeurPlus.length].concat(valeurPlus));
                    }
                }
                return critere.valeurCritere.valeurTexte
            },




            returnListOfInteger(){
                var cinqPremierValeurs = [1 , 2 , 3 , 4 , "5 et plus"]
                return cinqPremierValeurs;
            },



            returnValueOfCritereTypeInteger(nbre){
                var rtn ;                       
                if (nbre.toString() === "5 et plus") {
                    rtn = nbre.toString()        
                } 
                if (nbre.toString() !== "5 et plus") {
                    rtn = nbre.toString()     
                }
                return rtn; 
            },



            //Cette fonction convertira notre valeur en boolean true/false selon si l'option est selectionné

            getValueTrueOrFalse(item){
                var responseTrueOrFalse
                if(item == "" || item == null){
                    responseTrueOrFalse = "false"   
                }
                else {
                    responseTrueOrFalse = "true"
                }
                return responseTrueOrFalse
            },



            //Cette methode permettra de retourner la véritable valeur (ValeurTexte) des caracteristiques


            returnTrueValue(caracteristique){

                var trueValue;

                if(caracteristique == null) return null; 

                if(caracteristique.proprieteProduitLogement.type.id == REF_ELEMENT_TYPEVALEUR_REFERENCE){
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
                        trueValue = ""
                    }
                }
                else {
                    trueValue = caracteristique.valeurTexte
                }

                return trueValue;

            },



            // Fonction pour récuperer la premiere valeur du slider "prix d'acquisition"

            getFirstValue(critere){
                var rtn; 

                if (this.lowerValue == 0) {
                    rtn = critere.proprieteProduitLogement.minValueDoubleFiltre
                } else {
                    rtn = this.lowerValue
                } 

                critere.valeurCritere.valeurTexte[0] = rtn
                return rtn
            },



            // Fonction pour récuperer la seconde valeur du slider "prix d'acquisition"

            getSecondValue(critere){
                var rtn; 
                if (this.upperValue == 0) {
                    rtn = critere.proprieteProduitLogement.maxValueDoubleFiltre
                } else {
                    rtn = this.upperValue
                }
                critere.valeurCritere.valeurTexte[1] = rtn;
                return rtn;
            },



            //Page de consulation du logement sélectionné
            consulterLogementDetail(logement){
                const parsedLogement = JSON.stringify(logement)
                localStorage.setItem('logement' , parsedLogement)
                this.$router.push({name : 'LogementDetail' , params: { id :logement.id  } })
            },



            // Page de simulation de financement immobilier d'un logement
            simulationFinancementLogement(){
                this.$router.push( { path:"/CreerModifierSimulationFinancementImmobilier" } )
            },


        },


    

        computed : {

            /* Grâce à cette méthode, nous allons générer la liste necessaire a la recherche d'un produit logement.
            C'est à dire , envoyer au serveur seulement les criteres qui dont des "valeurTexte" renseignés*/

            getCritereListForSearch(){
                var critereList = [];
                for (let index = 0; index < this.critereRechercheProduitLogementList.length; index++) {
                    if (this.critereRechercheProduitLogementList[index].valeurCritere.valeurTexte != ""
                        && this.critereRechercheProduitLogementList[index].valeurCritere.valeurTexte != null) {
                        critereList.push(this.critereRechercheProduitLogementList[index])
                    }
                }
                return critereList ;
            },


            getListOfCritereRechercheOptional(){
                var critereRechercheOptionalList = [];
                if (this.critereRechercheProduitLogementList.length > 0) {
                    for (let index = 0; index < this.critereRechercheProduitLogementList.length; index++) {
                        if(this.critereRechercheProduitLogementList[index].proprieteProduitLogement.type.id == 'ref.element.typeValeur.boolean'){
                            critereRechercheOptionalList.push(this.critereRechercheProduitLogementList[index])
                        }
                    }                   
                }
                return critereRechercheOptionalList;
            }
        },


        mounted(){
            this.chargerLogementCompletClient();
            this.chargerCritereLogementList();
            this.getVillesList();
            this.getReferenceList();
        }
        
    }
</script>


<style scoped>

    .toolbar_title{
        font-weight: bold;
        color: #5f27cd;
    }

    .price{
        margin-top: 0;
    }

    .checkboxes{
        margin-top: -10px;
    }

</style>