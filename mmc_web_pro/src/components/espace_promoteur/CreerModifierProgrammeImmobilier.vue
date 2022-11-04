<template>

    <div>

        <v-form>

            <v-card elevation="5">

                <v-card-title v-if="isCreation"><span class="create_or_modify_title">CREER UN PROGRAMME IMMOBILIER</span> </v-card-title>

                <v-card-title v-else><span class="create_or_modify_title">MODIFIER UN PROGRAMME IMMOBILIER</span> </v-card-title>

                <v-card>

                    <v-row>

                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">INFORMATION(S) GÉNÉRALE(S)</span> 
                        </v-card-subtitle>

                    </v-row>


                    <v-container>

                        <v-row>

                            <v-col cols="6">
                                <v-text-field color="teal"  :counter="250" 
                                    label="Designation" :error-messages="designationErrors" 
                                    v-model.trim="$v.programmeImmobilierModel.programmeImmobilier.designation.$model" required @input="$v.programmeImmobilierModel.programmeImmobilier.designation.$touch()"
                                    @blur="$v.programmeImmobilierModel.programmeImmobilier.designation.$touch()">
                                </v-text-field>

                            </v-col>
    
                            <v-col cols="6">
                                <v-text-field color="teal" :counter="250" 
                                    label="Code" :error-messages="codeErrors" 
                                    v-model.trim="$v.programmeImmobilierModel.programmeImmobilier.code.$model" required @input="$v.programmeImmobilierModel.programmeImmobilier.code.$touch()"
                                    @blur="$v.programmeImmobilierModel.programmeImmobilier.code.$touch()">
                                </v-text-field>
                            </v-col>
    
                            <v-col cols="12">

                                <v-textarea  color="teal" :error-messages="descriptionErrors"
                                    v-model.trim="$v.programmeImmobilierModel.programmeImmobilier.description.$model" required @input="$v.programmeImmobilierModel.programmeImmobilier.description.$touch()"
                                    @blur="$v.programmeImmobilierModel.programmeImmobilier.description.$touch()">
                                    <template v-slot:label><div>Description</div></template>
                                </v-textarea>

                            </v-col>

                            <v-col cols="6">
                                <v-select color="teal" label="Localisation" required
                                    :error-messages="localisationErrors"
                                    v-model.trim="$v.programmeImmobilierModel.programmeImmobilier.ville.id.$model" 
                                    :items="villesList"
                                    item-text="designation"
                                    item-value="id"
                                    @change="$v.programmeImmobilierModel.programmeImmobilier.ville.id.$touch()"
                                    @blur="$v.programmeImmobilierModel.programmeImmobilier.ville.id.$touch()">
                                </v-select>
                            </v-col>

                        </v-row>

                    </v-container>

                </v-card>

            
                <v-card elevation="3">

                    <v-row>

                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">MODE DE FINANCEMENTS</span> 
                        </v-card-subtitle>

                    </v-row>

                    <v-row justify="center">

                        <v-btn color="primary" class="ma-2" dark  @click="modeFinancementDialog = true"><v-icon>mdi-plus</v-icon>Ajouter un mode de financements</v-btn>

                        <v-dialog v-model="modeFinancementDialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>

                            <v-card tile>

                                <v-toolbar max-height="70" dark color="primary">

                                    <v-btn icon dark @click="modeFinancementDialog = false"><v-icon>mdi-close</v-icon></v-btn>

                                    <v-toolbar-title>Mode de financements</v-toolbar-title>

                                    <v-spacer></v-spacer>

                                    <v-toolbar-items>
                                        <v-btn dark text @click="dialog = false">Valider</v-btn>
                                    </v-toolbar-items>

                                </v-toolbar>

                                <v-card-text>

                                    <v-btn color="primary" dark class="ma-2" @click="typeFinancementDialog = !typeFinancementDialog">Choix du type de financements</v-btn>

                                    <v-list three-line subheader>

                                        <v-form>
                                            
                                            <v-container>

                                                <v-row>

                                                    <v-col>

                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.designation.$model"
                                                            data-cy="designationModeFinancement"
                                                            label="Designation du mode de financement" required>
                                                        </v-text-field>

                                                    </v-col>

                                                    <v-col>

                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.description.$model"
                                                            data-cy="descriptionModeFinancement"
                                                            label="Description du mode de financement" required>
                                                        </v-text-field>

                                                    </v-col>

                                                </v-row>


                                                <v-row v-if="modeFinancementModel.typeFinancement.id == 'ref.element.valeur.creditbancaire'">

                                                    <v-col>
                                                        <v-select color="teal" label="EFI" required
                                                            :error-messages="efiErrors"
                                                            v-model.trim="$v.modeFinancementModel.creditBancaire.efi.id.$model" 
                                                            :items="efisList"
                                                            item-text="designation"
                                                            item-value="id"
                                                            @change="$v.modeFinancementModel.creditBancaire.efi.id.$touch()"
                                                            @blur="$v.modeFinancementModel.creditBancaire.efi.id.$touch()">
                                                        </v-select>
                                                    </v-col>

                                                    <v-col cols="2">

                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.creditBancaire.taux.$model"
                                                            data-cy="designationModeFinancement" suffix="%"
                                                            label="Taux" required>
                                                        </v-text-field>

                                                    </v-col>

                                                    <v-col cols="2">

                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.creditBancaire.duree.$model"
                                                            data-cy="designationModeFinancement" suffix="Ans"
                                                            :counter="10" label="Durée" required>
                                                        </v-text-field>

                                                    </v-col>

                                                </v-row>


                                                <v-row v-if="modeFinancementModel.typeFinancement.id == 'ref.element.valeur.temperament'">

                                                    <v-col cols="3">
                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.temperament.apportPersonnel.$model"
                                                            data-cy="apportPersonnel" suffix="%"
                                                            label="Apport Personnel" required>
                                                        </v-text-field>
                                                    </v-col>

                                                    <v-col cols="3">
                                                        <v-select color="teal" label="Périodicité" required
                                                            :error-messages="periodiciteErrors"
                                                            v-model.trim="$v.modeFinancementModel.temperament.periodicite.id.$model" 
                                                            :items="periodicitesList"
                                                            item-text="designation"
                                                            item-value="id"
                                                            @change="$v.modeFinancementModel.temperament.periodicite.id.$touch()"
                                                            @blur="$v.modeFinancementModel.temperament.periodicite.id.$touch()">
                                                        </v-select>
                                                    </v-col>

                                                    <v-col cols="3">
                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.temperament.nombrePeriodeMaxi.$model"
                                                            data-cy="taux"
                                                            label="Nombre de periode" required>
                                                        </v-text-field>
                                                    </v-col>

                                                    <v-col cols="3">
                                                        <v-text-field type="date" color="teal"
                                                            v-model.trim="$v.modeFinancementModel.temperament.dateDebut.$model"
                                                            data-cy=""
                                                            label="Date de debut" required>
                                                        </v-text-field>
                                                    </v-col>

                                                    <v-col cols="3">
                                                        <v-text-field color="teal"
                                                            v-model.trim="$v.modeFinancementModel.temperament.delaiRelance.$model"
                                                            data-cy="duree"
                                                            :counter="10" label="Delai relance" required>
                                                        </v-text-field>
                                                    </v-col>

                                                </v-row>



                                                <v-row v-if="modeFinancementModel.typeFinancement.id == 'ref.element.valeur.comptantsursituation'">

                                                    <v-col cols="4">
                                                        <v-select color="teal" label="Pallier" required
                                                            :error-messages="pallierErrors"
                                                            v-model.trim="$v.pallierSurSituationModel.pallier.id.$model" 
                                                            :items="pallierSurSituationList"
                                                            item-text="designation"
                                                            item-value="id"
                                                            @change="$v.pallierSurSituationModel.pallier.id.$touch()"
                                                            @blur="$v.pallierSurSituationModel.pallier.id.$touch()">
                                                        </v-select>
                                                    </v-col>

                                                    <v-col cols="4">
                                                        <v-text-field color="teal" :error-messages="tauxPallierErrors"
                                                            v-model.trim="$v.pallierSurSituationModel.taux.$model"
                                                            data-cy="taux" suffix="%"
                                                            label="taux" required>
                                                        </v-text-field>
                                                    </v-col>

                                                    <v-col cols="4">
                                                        <v-btn color="primary" @click="addPallier(pallierSurSituationModel)"><v-icon>mdi-plus</v-icon> AJOUTER UN PALLIER</v-btn>
                                                    </v-col>


                                                    <v-row v-for="(pallier , p) in modeFinancementModel.pallierComptantSurSituationList" :key="p">

                                                        <div v-for="unPallier in pallierSurSituationList" :key="unPallier.id">

                                                            <v-container>

                                                                <v-row>

         
                                                                </v-row>
                                                        
                                                            </v-container>

                                                        </div>

                                                    </v-row>

                                                    

                                                    

                                                </v-row>

                                            </v-container>
                                            
                                        </v-form>                                        


                                        <div>
                                            <v-alert :hidden="true"  class="my-alert-success" dismissible type="success">{{ successMsg }}</v-alert>
                                            <v-alert :hidden="true"  class="my-alert-error" dismissible type="error">{{ errorMsg }}</v-alert>
                                        </div>

                                    </v-list>

                                    <v-divider></v-divider>

                                </v-card-text>
    
                                <div style="flex: 1 1 auto;"></div>

                            </v-card>

                        </v-dialog>

    
                        <v-dialog v-model="typeFinancementDialog" max-width="500px">

                            <v-card>

                                <v-card-title>Type de financements</v-card-title>

                                <v-card-text>

                                    <v-select label="Liste des types de financements" 
                                        :items="typeFinancementList" item-text="designation" 
                                        item-value="id" v-model="modeFinancementModel.typeFinancement.id">
                                    </v-select>

                                </v-card-text>

                                <v-card-actions>

                                    <v-btn color="primary" text @click="typeFinancementDialog = false">Close</v-btn>

                                </v-card-actions>

                            </v-card>

                        </v-dialog>

                    </v-row>


                </v-card>

                <p></p>

                <v-card elevation="3">

                    <v-row>
                        <v-card-subtitle><v-icon>mdi-chevron-right</v-icon><span class="section">MEDIAS</span> </v-card-subtitle>
                    </v-row>

                </v-card>


            </v-card>

        </v-form>
 
    </div>

</template>

<script>

import axios from "axios";
import $ from 'jquery'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import {  API_OBTENIR_CONTENU_DOCUMENT_PROGRAMME_IMMOBILIER, API_OBTENIR_LISTE_VILLES ,} from '../globalConfig/globalConfig';
import { API_OBTENIR_TYPE_FINANCEMENT , API_OBTENIR_METADATAS_DOCUMENT_PROGRAMME_IMMOBILIER,  } from '../globalConfig/globalConfig'
import { API_OBTENIR_LISTE_EFIS , API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER} from "../globalConfig/globalConfig";
import { API_REFERENCES_PAR_FAMILLE} from "../globalConfig/globalConfig";


export default {

    name: 'CreerModifierProgrammeImmobilier',

    data(){

        return{
            errorMsg : null ,
            successMsg : null , 
            alertSuccess : true , 
            villesList: [],
            typeFinancementList:[],
            efisList : [],
            periodicitesList : [],
            periodiciteList : [] , 
            tiersCollecteursList : [], 
            pallierSurSituationList : [],

            programmeImmobilierModel: {
                programmeImmobilier : {
                    id: null,
                    designation: null,
                    description: null,
                    code: null,
                    promoteur : {
                        id: "promoteur01", 
                        identifiantLegal : "siwise" ,
                    },
                    ville: {
                        id: null,
                        version: null,
                    },
                    estValide : null ,
                },
                videosList : [],
                modeFinancementList: [],
            },


            modeFinancementModel : {
                id : null ,
                designation : null ,
                description : null ,
                estValide : null , 

                compteSequestre : {
                    id : null ,
                    designation : null , 
                    description : null ,
                    version : null
                },

                creditBancaire : {                   
                    id : null ,
                    duree : null , 
                    taux : null ,

                    efi : {
                        id : null , 
                        designation : null , 
                        description : null,
                        email : null
                    },

                    lettreConfort: {
                        id: null,
                        designation: null,
                        description: null,
                        contenu: null,
                        format: {
                            id: null,
                            version: null,
                        },
                        typeDocument:{
                            id: "ref.element.typeValeur.lettreConfort"
                        },
                        version : null
                    }
                },

                pallierComptantSurSituationList :[],

                tierscollecteur : {
                    id : null , 
                    tiers : {
                        id : null , 
                        designation : null , 
                        description : null , 
                        email : null 
                    }
                }, 

                temperament : {
                    id : null , 
                    apportPersonnel : null , 
                    periodicite : {
                        id : null ,
                        designation : null ,
                        description : null
                    }, 
                    nombrePeriodeMaxi : null , 
                    dateDebut : null , 
                    delaiRelance : null 

                },

                typeFinancement : {
                    id : null , 
                    designation: null , 
                    description : null , 
                    estvalideParEfi : null , 
                    code : null , 
                    version : null ,
                }
            },

            pallierSurSituationModel : {
                id : null , 
                pallier : {
                    id : null , 
                    designation :  null ,
                    description : null,
                },
                taux : null ,
            },

            modeFinancementDialog: false,
            typeFinancementDialog: false,

        }

    },

    validations : {

        // GESTION DES CONTRAINTES DES CHAMPS DE PROGRAMME IMMOBILIER

        programmeImmobilierModel: {
            programmeImmobilier :{
                designation: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(70),
                },
      

                description: {
                    required,
                    minLength: minLength(20),
                    maxLength: maxLength(600),
                },

                code: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(20),
                },

                ville:{
                    id:{
                        required
                    },
                }

            }

        },

        //GESTION DES CONTRAINTES PORTANT SUR LE MODE DE FINANCEMENTS

        modeFinancementModel : {

            designation : {
                required ,
                minLength: minLength(4),
            }, 

            description : {
                required ,
                minLength: minLength(4), 
            },

            creditBancaire : {
                duree : {
                    required,
                } ,
                taux : {
                    required
                },

                efi : {
                    id : {
                        required
                    },
                },
            }, 

            temperament : {
                apportPersonnel : {
                    required
                },
                periodicite : {
                    id:{
                        required
                    }
                },
                nombrePeriodeMaxi : {
                    required
                },
                dateDebut : {
                    required
                },
                delaiRelance : {
                    required
                },
            },

            tierscollecteur : {
                tiers : {
                    required
                }
            },

            typeFinancement : {
                id : {
                    required
                }
            },

        },

        pallierSurSituationModel : { 
            pallier : {
                id : {
                    required
                }
            },

            taux :{
                required
            }
        }

    },

    methods : {

        // AJOUT D'UN PALLIER

        addPallier(pallier){

            var unPallier = {
                id : null , 
                pallier : {
                    id : null , 
                    designation :  null ,
                    description : null,
                },
                taux : null ,
            };
    
            var isDuplicated = false

            if(this.modeFinancementModel.pallierComptantSurSituationList.length > 0){

                for (var i = 0; i < this.modeFinancementModel.pallierComptantSurSituationList.length; i++) {
                    if(this.modeFinancementModel.pallierComptantSurSituationList[i].pallier.id == pallier.pallier.id){ 
                        isDuplicated = true
                    }
                }
            }

            if (isDuplicated) {
                this.errorMsg = "Le pallier existe déja"
                $(".my-alert-error").fadeIn()
                setTimeout(function(){
                  $(".my-alert-error").fadeOut(); 
                }, 4000)
            }

            else if(this.$v.pallierSurSituationModel.$invalid){

                this.errorMsg = "Toutes les informations sont requises"
                $(".my-alert-error").fadeIn()
                setTimeout(function(){
                  $(".my-alert-error").fadeOut(); 
                }, 4000)
            }
      
            else {

                unPallier.id = pallier.id
                unPallier.pallier.id = pallier.pallier.id
                unPallier.pallier.designation = pallier.pallier.designation
                unPallier.pallier.description = pallier.pallier.description
                unPallier.taux = pallier.taux
                this.modeFinancementModel.pallierComptantSurSituationList.push(unPallier)
            }
        },

        //MODE MODIFICATION D'UN PROGRAMME IMMOBILIER

        modeModificationProgrammeImmobilier(){

            if (localStorage.getItem("programmeImmobilier")) {

                try {

                    const programmeImmobilierSelected = JSON.parse(localStorage.getItem("programmeImmobilier"));
                    this.programmeImmobilierModel.programmeImmobilier.id = programmeImmobilierSelected.id;
                    this.programmeImmobilierModel.programmeImmobilier.designation = programmeImmobilierSelected.designation;
                    this.programmeImmobilierModel.programmeImmobilier.description = programmeImmobilierSelected.description;
                    this.programmeImmobilierModel.programmeImmobilier.code = programmeImmobilierSelected.code;
                    this.programmeImmobilierModel.programmeImmobilier.ville = programmeImmobilierSelected.ville;
                    this.programmeImmobilierModel.programmeImmobilier.version = programmeImmobilierSelected.version;

    
                    axios.get(API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER(programmeImmobilierSelected.id))
                    .then((response) => {
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.programmeImmobilierModel.modeFinancementList.push(response.data.data[i])
                        }
                    }).catch((e) => {
                        this.errorMsg = e
                        $(".myAlert-bottom").fadeIn();
                        setTimeout(function(){
                            $(".myAlert-bottom").fadeOut(); 
                        }, 4000)
                    });
                    axios.get(API_OBTENIR_METADATAS_DOCUMENT_PROGRAMME_IMMOBILIER(programmeImmobilierSelected.id , "ref.element.typeValeur.video"))
                    .then((response)  => {

                        this.programmeImmobilierModel.videosList = response.data.data

                        for (let i = 0; i < response.data.data.length; i++) {

                            var video = {
                                id : null , 
                                designation : null , 
                                description : null , 
                                contenu : null 
                            };

                            video.id = response.data.data[i].id
                            video.designation = response.data.data[i].designation
                            video.description = response.data.data[i].description
                            video.contenu = response.data.data[i].contenu
                            this.previewStateVideosList.push(video)

                        }

                        for (let i = 0; i < this.programmeImmobilierModel.videosList.length; i++) {        

                            axios.get(API_OBTENIR_CONTENU_DOCUMENT_PROGRAMME_IMMOBILIER(this.programmeImmobilierModel.videosList[i].id))

                            .then((result) => {
                                this.programmeImmobilierModel.videosList[i].contenu = result.data.data
                                this.previewVideosList.push(result.data.data)
                            }).catch((e) => {

                                this.errorMsg = e
                                $(".myAlert-bottom").fadeIn();
                                setTimeout(function(){
                                    $(".myAlert-bottom").fadeOut(); 
                                }, 4000)

                            })

                        }

                        for (let i = 0; i < this.previewStateVideosList.length; i++) {
                        
                            axios.get(API_OBTENIR_CONTENU_DOCUMENT_PROGRAMME_IMMOBILIER(this.previewStateVideosList[i].id))
                            .then((result) => {
                                this.previewStateVideosList[i].contenu = result.data.data
                            }).catch((e) => {
                                this.errorMsg = e
                                $(".myAlert-bottom").fadeIn();
                                setTimeout(function(){
                                    $(".myAlert-bottom").fadeOut(); 
                                }, 4000)
                            })    
                        }

                    }).catch((e) => {

                        this.errorMsg = e
                        $(".myAlert-bottom").fadeIn();
                        setTimeout(function(){
                            $(".myAlert-bottom").fadeOut(); 
                        }, 4000)

                    })

                    localStorage.removeItem("programmeImmobilier");

                }catch (e) {
                    localStorage.removeItem("programmeImmobilier");
                }
            }
        },


        //OBTENIR LA LISTE DES PERIODICITÉS

        async obtenirListeDesPeriodicitesAPI() {

            await axios.get(API_REFERENCES_PAR_FAMILLE("ref.famille.typePeriodicite"))
            .then((response) => {
                this.periodicitesList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)

            });
        
        },

        // OBTENIR LA LISTE DES TYPES DE FINANCEMENTS

        async obtenirListeTypeFinancementAPI() {

            await axios.get(API_OBTENIR_TYPE_FINANCEMENT)
            .then((response) => {
                this.typeFinancementList = response.data.data;
            }).catch((e) => {

                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)

            });

        },

        
        //OBTENIR LA LISTE DES ETABLISSEMENTS FINANCEMENTS (EFI) DEPUIS LE MIDDLEWARE

        async obtenirListeDesEfisAPI() {
            await axios.get(API_OBTENIR_LISTE_EFIS)
            .then((response) => {
                this.efisList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)
            });
        },



        //OBTENIR LA LISTE DES PALLIERS COMPTANTS SUR SITUATION

        async obtenirListDesPalliersAPI() {

            await axios.get(API_REFERENCES_PAR_FAMILLE("ref.famille.pallier"))
            .then((response) => {
                this.pallierSurSituationList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)
            });
        
        },
        

        // RECUPERER LA LISTE DES VILLES DEPUIS LE MIDDLEWARE

        async obtenirListeVillesAPI() {
            await axios.get(API_OBTENIR_LISTE_VILLES).then((response) => {
                this.villesList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)
            });
        },

    },

    computed : {

        //MODE CREATION OU MODIFICATION D'UN PROGRAMME IMMOBILIER

        isCreation() {
            return this.programmeImmobilierModel.programmeImmobilier.id == null;
        },


        // GESTIONS DES CONTRAINTES DES CHAMPS D'ENTREES (DESIGANTION , DESCRIPTION , CODE , VILLE) DU PROGRAMME IMMOBILIER

        designationErrors(){
            const errors = [];
            if (!this.$v.programmeImmobilierModel.programmeImmobilier.designation.$dirty) return errors
            !this.$v.programmeImmobilierModel.programmeImmobilier.designation.maxLength && errors.push('La designation ne doit pas dépasser 600 caractères')
            !this.$v.programmeImmobilierModel.programmeImmobilier.designation.required && errors.push('La désignation est obligatoire.')
            !this.$v.programmeImmobilierModel.programmeImmobilier.designation.required && errors.push('La désignation doit avoir au minimum 8 caractères.')
            return errors
        },

        descriptionErrors(){
            const errors = [];
            if (!this.$v.programmeImmobilierModel.programmeImmobilier.description.$dirty) return errors
            !this.$v.programmeImmobilierModel.programmeImmobilier.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.programmeImmobilierModel.programmeImmobilier.description.required && errors.push('La description est obligatoire.')
            !this.$v.programmeImmobilierModel.programmeImmobilier.description.minLength && errors.push('La description doit avoir plus de 20 caractères.')
            return errors 
        },

        localisationErrors(){
            const errors = [];
            if (!this.$v.programmeImmobilierModel.programmeImmobilier.ville.id.$dirty) return errors
            !this.$v.programmeImmobilierModel.programmeImmobilier.ville.id.required && errors.push('La ville est obligatoire.')
            return errors 
        },


        codeErrors(){
            const errors = [];
            if (!this.$v.programmeImmobilierModel.programmeImmobilier.code.$dirty) return errors
            !this.$v.programmeImmobilierModel.programmeImmobilier.code.maxLength && errors.push('Le code ne doit pas dépasser 20 caractères')
            !this.$v.programmeImmobilierModel.programmeImmobilier.code.required && errors.push('Le Code est obligatoire.')
            !this.$v.programmeImmobilierModel.programmeImmobilier.code.required && errors.push('Le Code est obligatoire.')
            return errors 
        },


        prixErrors(){
            const errors = [];
            if (!this.$v.programmeImmobilierModel.programmeImmobilier.designation.$dirty) return errors
            !this.$v.programmeImmobilierModel.programmeImmobilier.designation.maxLength && errors.push('Name must be at most 10 characters long')
            !this.$v.programmeImmobilierModel.programmeImmobilier.designation.required && errors.push('La Désignation est obligatoire.')
            return errors 
        },


        // GESTIONS DES CONTRAINTES DES CHAMPS D'ENTREES POUR LES MODES DE FINANCEMENT PALLIER COMPTANT SUR SITUATION
        
        pallierErrors(){
            const errors = [];
            if (!this.$v.pallierSurSituationModel.pallier.id.$dirty) return errors
            !this.$v.pallierSurSituationModel.pallier.id.required && errors.push('Choisissez un pallier')
            return errors  
        },

        tauxPallierErrors(){
            const errors = [];
            if (!this.$v.pallierSurSituationModel.taux.$dirty) return errors
            !this.$v.pallierSurSituationModel.taux.required && errors.push('Le taux est Obligatoire')
            return errors 
        }

    },

    mounted(){

       this.obtenirListeVillesAPI()
       this.modeModificationProgrammeImmobilier()
       this.obtenirListeTypeFinancementAPI()
       this.obtenirListeDesEfisAPI()
       this.obtenirListeDesPeriodicitesAPI()
       this.obtenirListDesPalliersAPI()

    }
        
}
</script>

<style scoped>

    .create_or_modify_title{
        color: #3867d6;
        font-weight: bold;
    }

    .section{
        font-weight: bold;
    }

    .my-alert-success {
        position: fixed;
        top: 25px;
        right:2%;
        width: 30%;
        display: none;
    }

    .my-alert-error {
        position: fixed;
        top: 25px;
        right:2%;
        width: 30%;
        display: none;
    }

</style>