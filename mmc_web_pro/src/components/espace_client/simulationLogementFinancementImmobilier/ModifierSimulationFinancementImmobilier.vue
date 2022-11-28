<template>
    <v-app>
        <NavigationBar/>

        <v-main>

            <v-container fluid>

                <v-card elevation="1">

                    <v-card-title class="card_title" v-if="!isCreation">MODIFIER UNE SIMULATION DE FINANCEMENT
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogPlanFinancementChoosed" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="primary" dark v-bind="attrs" v-on="on"><v-badge :content="simulationFinancementImmobilierModel.financementList.length" :value="simulationFinancementImmobilierModel.financementList.length" color="green" overlap><v-icon>mdi-finance</v-icon></v-badge></v-btn>
                            </template>

                            <v-card>
                                <v-toolbar dark color="white">
                                    <v-btn icon @click="dialogPlanFinancementChoosed=false">
                                        <v-icon color="black">mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title class="title_color">MES PLANS DE FINANCEMENTS</v-toolbar-title>

                                    <v-spacer></v-spacer>

                                </v-toolbar>

                                <v-container>
                                    <v-row>
                                        <v-col cols="6" v-for="(financement , f) in simulationFinancementImmobilierModel.financementList" :key="f">
                                            <v-card>
                                                <v-card-title>PLAN DE FINANCEMENT N° {{ f+1 }}
                                                    <v-spacer></v-spacer>
                                                    <v-btn icon color="info" @click="deleteFinancement(f)"><v-icon>mdi-delete</v-icon></v-btn>
                                                </v-card-title>

                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle>type de financement :</v-list-item-subtitle>
                                                    </v-list-item-content>
                    
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle>{{ financement.modeFinancement.typeFinancement.designation }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>

                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle>Désignation :</v-list-item-subtitle>
                                                    </v-list-item-content>
                    
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle>{{ financement.designation }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>

                                                <div v-if="financement.modeFinancement.typeFinancement.designation == 'Comptant'">
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>Montant :</v-list-item-subtitle>
                                                        </v-list-item-content>
                    
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>{{ financement.montant }} FCFA</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </div>

                                                <div v-if="financement.modeFinancement.typeFinancement.designation == 'Credit bancaire'">
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>Montant :</v-list-item-subtitle>
                                                        </v-list-item-content>
                    
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>{{ financement.montant }} FCFA</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>

                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>Mensualité Proposé :</v-list-item-subtitle>
                                                        </v-list-item-content>
                    
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>{{ financement.mensualitePropose }}</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>

                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>Revenu Net :</v-list-item-subtitle>
                                                        </v-list-item-content>
                    
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle>{{ financement.revenuNet }} FCFA</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </div>

                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-subtitle></v-card-subtitle>
                    <v-stepper v-model="e6" vertical>
    
                        <v-stepper-step :complete="e6 > 1" step="1">INFORMATIONS GÉNERALE(S)
                            <small>Informations portant sur votre simulation</small>
                        </v-stepper-step>
  
                        <v-stepper-content step="1">
                            <v-card class="mb-12">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field color="teal" :error-messages="designationErrors" label="Designation de la simulation"
                                                v-model.trim="$v.simulationFinancementImmobilierModel.designation.$model"
                                                @input="$v.simulationFinancementImmobilierModel.designation.$touch()"
                                                @blur="$v.simulationFinancementImmobilierModel.designation.$touch()">
                                            </v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-textarea color="teal" :error-messages="descriptionErrors" label="Description"
                                                v-model.trim="$v.simulationFinancementImmobilierModel.description.$model"
                                                @input="$v.simulationFinancementImmobilierModel.description.$touch()"
                                                @blur="$v.simulationFinancementImmobilierModel.description.$touch()">
                                            </v-textarea>
                                        </v-col>
                                </v-row>
                                </v-container>
                            </v-card>
                                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                        </v-stepper-content>
  
                        <v-stepper-step :complete="e6 > 2" step="2">PLAN DE FINANCEMENTS
                        </v-stepper-step>
  
                        <v-stepper-content step="2">
                            <v-card height="50px" class="mb-12">
                                <v-container>
                                    <v-row justify="center">
                                        <v-dialog v-model="dialogFinancement" persistent max-width="600px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="primary" dark v-bind="attrs" v-on="on">CREER UN PLAN</v-btn>
                                            </template>

                                            <v-card>
                                                <v-card-title>
                                                    <span class="text-h5">PLAN DE FINANCEMENTS</span>
                                                </v-card-title>

                                                <v-card-text>

                                                    <v-container>

                                                        <v-row>

                                                            <v-col cols="6">
                                                                <v-select data-cy="caracteristiqueDemandeReservationLogement" v-model="typeFinancementId" 
                                                                    label="Financements disponibles" :items="typeFinancementList"
                                                                    item-text="typeFinancement.designation" item-value="typeFinancement.id" >
                                                                </v-select>
                                                            </v-col>

                                                        </v-row>

                                                        <v-row v-if="typeFinancementId == 'ref.element.valeur.comptant'">

                                                            <v-col cols="6">
                                                                <v-text-field label="Designation du plan"
                                                                    :error-messages="designationComptantErrors"
                                                                    v-model.trim="$v.financementTransfertComptantModel.financementComptant.designation.$model"
                                                                    @input="$v.financementTransfertComptantModel.financementComptant.designation.$touch()"
                                                                    @blur="$v.financementTransfertComptantModel.financementComptant.designation.$touch()">
                                                                </v-text-field>
                                                            </v-col>

                                                            <v-col cols="6">
                                                               <v-textarea :error-messages="descriptionComptantErrors" label="Description"
                                                                    v-model.trim="$v.financementTransfertComptantModel.financementComptant.description.$model"
                                                                    @input="$v.financementTransfertComptantModel.financementComptant.description.$touch()"
                                                                    @blur="$v.financementTransfertComptantModel.financementComptant.description.$touch()">
                                                                </v-textarea>
                                                            </v-col>

                                                            <v-col cols="6">
                                                                <v-text-field label="Montant"
                                                                    :error-messages="montantComptantErrors" 
                                                                    @input="$v.financementTransfertComptantModel.financementComptant.montant.$touch()"
                                                                    @blur="$v.financementTransfertComptantModel.financementComptant.montant.$touch()"
                                                                    v-model.trim="$v.financementTransfertComptantModel.financementComptant.montant.$model"
                                                                    suffix="FCFA">
                                                                </v-text-field>
                                                            </v-col>

                                                        </v-row>


                                                        <v-row v-if="typeFinancementId == 'ref.element.valeur.creditbancaire'">

                                                            <v-col cols="6">
                                                                <v-text-field label="Designation du plan"
                                                                    :error-messages="designationCreditBancaireErrors"
                                                                    v-model.trim="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.$model"
                                                                    @input="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.$touch()"
                                                                    @blur="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.$touch()">
                                                                </v-text-field>
                                                            </v-col>

                                                            <v-col cols="6">
                                                               <v-textarea :error-messages="descriptionCreditBancaireErrors" label="Description"
                                                                    v-model.trim="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.$model"
                                                                    @input="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.$touch()"
                                                                    @blur="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.$touch()">
                                                                </v-textarea>
                                                            </v-col>

                                                            <v-col cols="6">
                                                                <v-text-field label="Montant"
                                                                    suffix="FCFA"
                                                                    :error-messages="montantCreditBancaireErrors" 
                                                                    @input="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.montant.$touch()"
                                                                    @blur="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.montant.$touch()"
                                                                    v-model.trim="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.montant.$model">
                                                                </v-text-field>
                                                            </v-col>

                                                            <v-col cols="6">
                                                                <v-text-field label="Mensualité Proposé"
                                                                    :error-messages="mensualiteProposeCreditBancaireErrors" 
                                                                    @input="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.mensualitePropose.$touch()"
                                                                    @blur="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.mensualitePropose.$touch()"
                                                                    v-model.trim="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.mensualitePropose.$model">
                                                                </v-text-field>
                                                            </v-col>


                                                            <v-col cols="6">
                                                                <v-text-field label="Revenu NET"
                                                                    suffix="FCFA"
                                                                    :error-messages="revenuNetCreditBancaireErrors" 
                                                                    @input="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.revenuNet.$touch()"
                                                                    @blur="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.revenuNet.$touch()"
                                                                    v-model.trim="$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.revenuNet.$model">
                                                                </v-text-field>
                                                            </v-col>

                                                        </v-row>

                                                    </v-container>
                                                        
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" text @click="dialogFinancement = false">FERMER</v-btn>
                                                    <v-btn color="blue darken-1" text @click="validerPlanFinancement(financementTransfertComptantModel,financementTransfertCreditBancaireModel)"> ENREGISTRER</v-btn>
                                                </v-card-actions>

                                            </v-card>

                                        </v-dialog>

                                    </v-row>

                                </v-container>

                            </v-card>
                            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>
  
                        <v-stepper-step :complete="e6 > 3" step="3">
                            PROFIL ACQUEREUR
                        </v-stepper-step>
  
                        <v-stepper-content step="3">
                            <v-card class="mb-12" height="300px">
                                <v-container>

                                    <v-row>

                                        <v-col v-for="valeurCaracteristiqueLogement in this.simulationFinancementImmobilierModel.valeurCaracteristiqueDemandeReservationLogementList"
                                            :key="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.id">

                                            <v-select v-if="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.type.id === 'ref.element.typeValeur.ville'" 
                                                :label="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.designation"
                                                data-cy="caracteristiqueDemandeReservationLogement" v-model="valeurCaracteristiqueLogement.valeurTexte" 
                                                :items="villesList"
                                                item-text="designation" item-value="id" >
                                            </v-select>

                                            <v-select v-if="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.type.id === 'ref.element.typeValeur.reference'" 
                                                :label="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.designation"
                                                data-cy="caracteristiqueDemandeReservationLogement" v-model="valeurCaracteristiqueLogement.valeurTexte" 
                                                :items="referenceActiviteList"
                                                item-text="designation" item-value="id" >
                                            </v-select>

                                        </v-col>
    
                                    </v-row>

                                </v-container>
                            </v-card>
                                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                        </v-stepper-content>

                    </v-stepper>

                </v-card>

                <p></p>

                <v-container>
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col cols="5"><v-btn color="secondary"><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                                <v-col v-if="isCreation" cols="5"><v-btn color="info" @click="submitSimulationFinancement()"><v-icon>mdi-check</v-icon> CREER</v-btn></v-col>
                                <v-col cols="5" v-else><v-btn color="info" @click="submitSimulationFinancement()"><v-icon>mdi-check</v-icon> MODIFIER</v-btn></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>

            </v-container>
            
            
            <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
  
            <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>

            <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>

            <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>

        </v-main>

        <FooterBar/>
    </v-app>
</template>

<script>
import NavigationBar from '../../layout/navigationBar.vue'
import FooterBar from '../../layout/footerBar.vue'
import { required, minLength, maxLength , numeric } from "vuelidate/lib/validators";
import axios from "axios"
import $ from 'jquery'
import { API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER ,  API_OBTENIR_LISTE_EFIS , API_REFERENCES_PAR_FAMILLE , REF_ELEMENT_VALEUR_COMPTANT } from '../../globalConfig/globalConfig';
import { REF_ELEMENT_VALEUR_CREDIT_BANCAIRE , API_OBTENIR_LISTE_CARACTERISTIQUES_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER  } from '../../globalConfig/globalConfig';
import { API_CREER_SIMULATION_FINANCEMENT_IMMOBILIER , API_MODIFIER_SIMULATION_FINANCEMENT_IMMOBILIER } from '../../globalConfig/globalConfig';
import { API_RECHERCHER_LOGEMENT_PAR_ID , API_OBTENIR_LISTE_VILLES , API_RECHERCHER_SIMULATION_FINANCEMENT_PAR_ID} from '../../globalConfig/globalConfig';


export default {
    name : "ModifierSimulationFinancementImmobilier",
    components:{
        NavigationBar,
        FooterBar
    },
    data(){
        return{ 
            dialogPlanFinancementChoosed:false,
            successMsg : null ,
            errorMsg : null ,
            warningMsg : null ,
            overlay: false,
            myLogement : {},
            caracteristiqueDemandeReservationLogementList : [],
            referenceActiviteList : [],
            villesList : [],
            typeFinancementList : [],
            dialogFinancement : false , 
            e6 : 1,
            modeFinancementList : [],
            valeurCaracteristiqueDemandeReservationList : [],
            valeurTypeDocumentDemandeReservationList : [],
            isShowDialogAddingFinancementPlan : false ,
            periodiciteList : [] , 
            efiList : [],
            typeFinancementId : null ,

            simulationFinancementImmobilierModel : {
                id : null ,
                designation : null, 
                description : null,
                valeurCaracteristiqueDemandeReservationLogementList : [],
                financementList : [],
                user : {
                    id: 'faadc15f-2808-44e0-94cc-d0bd841bcf59'
                },
                logement : {},
                dateEtHeureExecution: null,
                version:0,
            },



            financementTransfertComptantModel : {
                typePlanFinancementId : null ,
                financementComptant : {
                    id : null ,
                    designation : null ,
                    description : null ,
                    dateEtHeure : null,
                    montant : null ,
                    modeFinancement : {
                        id : null ,
                        typeFinancement : {
                            id : null 
                        }
                    }

                }
            },


            financementTransfertCreditBancaireModel:{
                typePlanFinancementId : null,
                financementCreditImmobilier : {
                    id : null ,
                    designation : null , 
                    description : null ,
                    montant : null ,
                    mensualitePropose : null ,
                    mensualitéEffectif : null ,
                    dureeEffectif : null ,
                    revenuNet : null,
                    modeFinancement : {
                        id : null ,
                        typeFinancement : {
                            id : null 
                        }
                    }

                },

            },

            financementTransfertComptantPallierModel : {
                typePlanFinancementId : null ,
                financementComptantPallierSurSituation : {
                    id : null ,
                    description : null ,
                    designation: null ,
                    montant : null ,
                    dateEtHeure : null ,
                    pallierComptantSurSituationList : [], 
                }

            },

            financementTransfertTemperamentModel: {
                typePlanFinancementId : null ,
                financementTemperament : {
                    id : null ,
                    designation : null ,
                    description : null,
                    montant : null ,
                    dateEtHeure : null ,
                    nombrePeriodePropose : null,
                    nombrePeriodeEffectif : null ,
                    modeTemperament : {
                        id : null ,
                        apportPersonnel : null ,
                        periodicite : null , 
                        nombrePeriodeMaxi : null ,
                        dateDebut : null ,
                        delaiRelance : null ,
                        tauxAcompteMini :  null
                    },
                    echeanceFinancementTemperamentList : []

                },

            },

            echeanceFinancementTemperament : {
                id : null ,
                numeroPeriode : null,
                montant : null ,
            },

            comptantSurSituationPallierList : [], 

            messageList : [],

            pallierComptantSurSituationModel : {
                id : null ,
                designation : null
            },

            financementListToShowing: []

        }

    },

    validations:{

        simulationFinancementImmobilierModel : {

            designation : {
                required,
                minLength : minLength(6),
                maxLength : maxLength(100),
            },

            description : {
                required,
                minLength : minLength(6),
                maxLength : maxLength(500)
            }  

        },

        financementTransfertComptantModel : {
            financementComptant : {
                designation :{
                    required ,
                    minLength : minLength(4),
                    maxLength : maxLength(40)
                },
                description:{
                    required ,
                    minLength : minLength(4),
                    maxLength : maxLength(40)
                },
                montant : {
                    required,
                    numeric
                }
            },
        },


        financementTransfertCreditBancaireModel: {
            financementCreditImmobilier : {
                designation : {
                    required ,
                    minLength : minLength(4),
                    maxLength : maxLength (40)
                },
                description: {
                    required ,
                    minLength : minLength(4),
                    maxLength : maxLength (40)
                },
                montant: {
                    required ,
                    numeric
                },
                mensualitePropose : {
                    required,
                    numeric, 
                },

                revenuNet : {
                    required,
                    numeric,
                },
            },
        },


        financementTransfertComptantPallierModel : {
            financementComptantPallierSurSituation : {
                designation : {
                    required,
                    minLength : minLength(4),
                    maxLength : maxLength(20),
                },
                description : {
                    required,
                    minLength : minLength(4),
                    maxLength : maxLength(20),
                },
                montant : {
                    required ,
                }
            },
        },


        financementTransfertTemperamentModel: {
            financementTemperament : {
                designation :{
                    required ,
                    minLength : minLength(4),
                    maxLength : maxLength (20)
                },
                description :{
                    required ,
                    minLength : minLength(4),
                    maxLength : maxLength (20)
                }, 
                montant: {
                    required ,
                },
                nombrePeriodePropose : {
                    required
                },
                nombrePeriodeEffectif : {
                    required
                },

                modeTemperament : {
                    apportPersonnel : {
                        required,
                    },
                    nombrePeriodeMaxi :{
                        required
                    },
                    dateDebut : {
                        required
                    },
                    delaiRelance : {
                        required
                    },
                    tauxAcompteMini : {
                        required
                    }

                }

            },

        },


        echeanceFinancementTemperament : {
            numeroPeriode:{
                required
            },
            montant : {
                required
            }
        },

    },

    methods:{

        //ENVOI DU FORMULAIRE DE LA CREATION OU DE LA MODIFICATION DE LA SIMULATION
        submitSimulationFinancement(){
            this.$v.$touch();
            if (this.$v.simulationFinancementImmobilierModel.$invalid) {
                this.errorMsg = 'Des champs requis sont manquants'
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 3000)
            }
            else{
                this.creerModifierSimulationFinancementImmobilier()
            }
        },


        // CREATION DU SERVICE WEB POUR LA CREATION D'UNE SIMULATION

        async simulationModeCreation(){
            if (this.isCreation) {
                this.overlay = true
                await axios.post(API_CREER_SIMULATION_FINANCEMENT_IMMOBILIER, this.simulationFinancementImmobilierModel).then((response) => {
                    console.log(response)
                    if (response.status == 200) {  
                        this.successMsg = "Création de la simulation effectuée"
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 3000)
                    }
                    else if (response.status == 204) {
                        this.warningMsg = "Erreur , simulation non crée";
                        $(".alert-warning").fadeIn();
                        setTimeout(function(){
                            $(".alert-warning").fadeOut(); 
                        }, 3000)
                    }
                    else{
                        this.errorMsg = "Erreur , Impossible de créer la simulation";
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                    }
                }).catch((e) => {
                    this.errorMsg = e;
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                }).finally(() => {
                    this.overlay = false  
                })
            }
        },


        async simulationModeModification(){
            if (!this.isCreation) {
                this.overlay = true
                await axios.post(API_MODIFIER_SIMULATION_FINANCEMENT_IMMOBILIER, this.simulationFinancementImmobilierModel).then((response) => {
                    console.log(response)
                    if (response.status == 200) {  
                        this.successMsg = "Modification de la simulation effectuée"
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 3000)
                    }
                    else if (response.status == 204) {
                        this.warningMsg = "Erreur , La simulation n'a pas été modifié";
                        $(".alert-warning").fadeIn();
                        setTimeout(function(){
                            $(".alert-warning").fadeOut(); 
                        }, 3000)
                    }
                    else{
                        this.errorMsg = "Erreur , Impossible de modifier la simulation";
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 3000)
                    }
                }).catch((e) => {
                    this.errorMsg = e;
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 3000)
                }).finally(() => {
                    this.overlay = false  
                })
            }
        },



        async creerModifierSimulationFinancementImmobilier(){
            this.simulationModeCreation();
            this.simulationModeModification();
        },



        // OBTENIR INFOS LOGEMENT PAR SON ID

        async getInfoLogementFromId(){
            if(this.isCreation){
                if (this.$route.params.id != undefined || this.$route.params.id != null) {
                    await axios.get(API_RECHERCHER_LOGEMENT_PAR_ID(this.$route.params.id)).then((response)  => {
                        this.myLogement = response.data.data;
                        this.simulationFinancementImmobilierModel.logement.id = this.myLogement.id ; 
                    }).catch((error)  => {
                        console.log(error)
                    })
                }

                if (this.myLogement.produitLogement == undefined) {
                    this.$router.replace({path:'/SelectionnerSimulationFinancementImmobilier'})
                }else{
                    this.getModeFinancementListParProgramme(this.myLogement.produitLogement.programmeImmobilier.id)
                this.obtenirListtypeFinancement(this.myLogement.produitLogement.programmeImmobilier.id) ;
                this.getCaracteristiqueReservationParProgrammeImmobilier(this.myLogement.produitLogement.programmeImmobilier.id);
                }
                
            }
        },

        // RECUPRER LA LISTE DE TOUS LES TYPES DE FINANCEMENTS DISPONIBLES

        async obtenirListtypeFinancement(programmeImmobilier_id) {

            await axios.get(API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER(programmeImmobilier_id))
            .then((response) => {
                this.typeFinancementList = response.data.data
            }).catch((e) => {
                this.errorMsg = e
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)

            });
        },

        // RECUPERER LA LISTE DES MODES DE FINANCEMENT PAR PROGRAMME IMMOBILIER

        async getModeFinancementListParProgramme(programmeImmobilier_id) {

            await axios.get(API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER(programmeImmobilier_id))
            .then((response) => {
                this.modeFinancementList = response.data.data
            }).catch((e) => {
                this.errorMsg = e
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)

            });
        },

        // VERIFICATION DES FINANCEMENT

        checkModeFinancement(){

            if(this.typeFinancementId == REF_ELEMENT_VALEUR_COMPTANT){
                if(this.$v.financementTransfertComptantModel.financementComptant.$invalid) {
                    this.errorMsg = "Erreur lors de la validation de votre plan de financement: COMPTANT"
                    $(".myAlert-bottom").fadeIn();
                    setTimeout(function(){
                        $(".myAlert-bottom").fadeOut(); 
                    }, 4000) 
                }else{
                    return true
                }   
            }

            if(this.typeFinancementId == REF_ELEMENT_VALEUR_CREDIT_BANCAIRE){
                if(this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.$invalid){
                    this.errorMsg = "Erreur lors de la validation de votre plan de financement: CREDIT BANCAIRE"
                    $(".myAlert-bottom").fadeIn();
                    setTimeout(function(){
                        $(".myAlert-bottom").fadeOut(); 
                    }, 4000) 
                }else{
                    return true
                }        
            }

            if(this.typeFinancementId == null){
                this.errorMsg = 'Erreur : Au moins un plan de financement doit etre choisi !!'
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)
            }
        },


        //VALIDATION DES PLAN DE FINANCEMENTS DANS LA LISTE DES PLAN DE FINANCEMENTS

        validerPlanFinancement(planFinancementComptantTransfert , planFinancementCreditImmobilierTransfert){

            var financementComptantTransfert = {
                typePlanId: null,
                financementComptant : {
                    id : null ,
                    designation : null ,
                    description : null ,
                    dateEtHeure : null,
                    montant : null ,
                    modeFinancement :  {
                        id : null ,
                        typeFinancement : {
                            id : null ,
                        }
                    }
                }
            };


            var financementCreditTransfert = {
                typePlanId : null ,
                financementCredit : {
                    id : null ,
                    designation : null ,
                    description : null ,
                    dateEtHeure : null ,
                    montant : null ,
                    mensualitePropose : null ,
                    mensualiteEffectif : null,
                    dureeEffectif : null,
                    revenuNet : null , 
                    modeFinancement : {
                        id : null , 
                        typeFinancement : {
                            id : null
                        }
                    }
                }
            };

            var response = this.checkModeFinancement()

            if(this.typeFinancementId == REF_ELEMENT_VALEUR_COMPTANT && response == true) {

                financementComptantTransfert.typePlanId = REF_ELEMENT_VALEUR_COMPTANT
                financementComptantTransfert.financementComptant.id = planFinancementComptantTransfert.financementComptant.id
                financementComptantTransfert.financementComptant.designation = planFinancementComptantTransfert.financementComptant.designation
                financementComptantTransfert.financementComptant.description = planFinancementComptantTransfert.financementComptant.description
                financementComptantTransfert.financementComptant.dateEtHeure = planFinancementComptantTransfert.financementComptant.dateDebut
                financementComptantTransfert.financementComptant.montant = planFinancementComptantTransfert.financementComptant.montant

                for (let index = 0; index < this.modeFinancementList.length; index++) {
                    if (this.modeFinancementList[index].typeFinancement.id == REF_ELEMENT_VALEUR_COMPTANT) {
                        financementComptantTransfert.financementComptant.modeFinancement.id = this.modeFinancementList[index].id
                        financementComptantTransfert.financementComptant.modeFinancement.typeFinancement.id = this.modeFinancementList[index].typeFinancement.id
                    }
                }

                this.simulationFinancementImmobilierModel.financementList.push(financementComptantTransfert.financementComptant)
                this.financementListToShowing.push(financementComptantTransfert)
                this.typeFinancementId = null
                planFinancementComptantTransfert.financementComptant.designation = null ;
                planFinancementComptantTransfert.financementComptant.description = null ;
                planFinancementComptantTransfert.financementComptant.montant = null ;
                planFinancementComptantTransfert.financementComptant.dateDebut = null ;
                this.isShowDialogAddingFinancementPlan = false
                     
            }


            if(this.typeFinancementId == REF_ELEMENT_VALEUR_CREDIT_BANCAIRE && response == true) {

                financementCreditTransfert.typePlanId = REF_ELEMENT_VALEUR_CREDIT_BANCAIRE
                financementCreditTransfert.financementCredit.id = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.id
                financementCreditTransfert.financementCredit.designation = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.designation
                financementCreditTransfert.financementCredit.description = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.description
                financementCreditTransfert.financementCredit.dateEtHeure = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.dateEtHeure
                financementCreditTransfert.financementCredit.montant = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.montant.toString()
                financementCreditTransfert.financementCredit.mensualitePropose= planFinancementCreditImmobilierTransfert.financementCreditImmobilier.mensualitePropose
                financementCreditTransfert.financementCredit.mensualiteEffectif = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.mensualiteEffectif
                financementCreditTransfert.financementCredit.dureeEffectif = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.dureeEffectif
                financementCreditTransfert.financementCredit.revenuNet = planFinancementCreditImmobilierTransfert.financementCreditImmobilier.revenuNet

                for (let index = 0; index < this.modeFinancementList.length; index++) {
                    if (this.modeFinancementList[index].typeFinancement.id == REF_ELEMENT_VALEUR_CREDIT_BANCAIRE) {
                        financementCreditTransfert.financementCredit.modeFinancement.id = this.modeFinancementList[index].id
                        financementCreditTransfert.financementCredit.modeFinancement.typeFinancement.id = this.modeFinancementList[index].typeFinancement.id
                    }              
                }

                this.simulationFinancementImmobilierModel.financementList.push(financementCreditTransfert.financementCredit)
                this.financementListToShowing.push(financementCreditTransfert)
                this.typeFinancementId = null
                planFinancementCreditImmobilierTransfert.financementCreditImmobilier.designation = null 
                planFinancementCreditImmobilierTransfert.financementCreditImmobilier.description = null 
                planFinancementCreditImmobilierTransfert.financementCreditImmobilier.montant = null 
                planFinancementCreditImmobilierTransfert.financementCreditImmobilier.mensualitePropose = null 
                planFinancementCreditImmobilierTransfert.financementCreditImmobilier.revenuNet = null 
                this.isShowDialogAddingFinancementPlan = false 
            }

            this.dialogFinancement = false ; 

        },


        // RECUPERER LA LISTE DES EFIS DEPUIS LE MIDDLEWARE

        async obtenirEfiList() {

            await axios.get(API_OBTENIR_LISTE_EFIS).then((response) => {
                this.efiList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)

            });  
      
        },


        // RECUPERER LA LISTE DES CARACTERISTIQUES DE DEMANDE DE RESERVATIONS PAR PROGRAMME IMMOBILIER

            /**
             * On cree à partir des caractéristiques de demandes reservations provenant du middleware 
             * des valeur caracteristique de demande de reservations
             */

        async getCaracteristiqueReservationParProgrammeImmobilier(programmeImmobilier_id) {
            await axios.get(API_OBTENIR_LISTE_CARACTERISTIQUES_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER(programmeImmobilier_id)).then((response) => {
                response.data.data.forEach(element => {
                    var valeurCaracteristiqueDemandeReservationLogement = {
                        id : null ,
                        designation : null ,
                        valeurTexte : null ,
                        caracteristiqueDemandeReservationLogement: {}
                    };
                    valeurCaracteristiqueDemandeReservationLogement.caracteristiqueDemandeReservationLogement = element; 
                    this.simulationFinancementImmobilierModel.valeurCaracteristiqueDemandeReservationLogementList.push(valeurCaracteristiqueDemandeReservationLogement)
                });
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)

            });

        },

        // RECUPERER LA LISTE DES PERIODICITÉS DEPUIS LE MIDDLEWARE

        async obtenirPeriodiciteList() {

            await axios.get(API_REFERENCES_PAR_FAMILLE("ref.famille.typePeriodicite")).then((response) => {
                this.periodiciteList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)

            });

        },


        // OBTENIR LA LISTE DES REFERENCES PALLIERS DEPUIS LE MIDDLEWARE

        async obtenirPallierSurSituationList() {

            await axios.get(API_REFERENCES_PAR_FAMILLE("ref.famille.pallier")).then((response) => { 
                this.comptantSurSituationPallierList = response.data.data;
            }).catch((e) => {
                this.errorMsg = e
                $(".myAlert-bottom").fadeIn();
                setTimeout(function(){
                    $(".myAlert-bottom").fadeOut(); 
                }, 4000)
            });
        },

        
        // RECUPERER LA LISTE DES REFERENCES (ACTIVITE DE L'ACQUEREUR)
        async getReferenceListActivite() {
            await axios.get(API_REFERENCES_PAR_FAMILLE("ref.famille.activiteAcquereur")).then((response) => { 	
                this.referenceActiviteList = response.data.data
            }).catch((e) => {
                console.log(e)
            });

        },
        

        // RECUPERER LA LISTE DES VILLES DEPUIS LE MIDDLEWARE
        async obtenirListeVilles() {
            await axios.get(API_OBTENIR_LISTE_VILLES).then((response) => {
                this.villesList = response.data.data
            }).catch((e) => {
                console.log(e)
            });

        },

        //EDITION D'UNE SIMULATION DE FINANCEMENT

        async editingSimulationFinancement(){
            if (localStorage.getItem("simulation")) {
                try {
                    const simulationEditing = JSON.parse(localStorage.getItem("simulation"));
                    this.simulationFinancementImmobilierModel.id = simulationEditing.id
                    await axios.get(API_RECHERCHER_SIMULATION_FINANCEMENT_PAR_ID(simulationEditing.id)).then((response) => {
                        this.simulationFinancementImmobilierModel = response.data.data;
                    }).catch((e) => {
                        console.log(e)
                    });
                    localStorage.removeItem("simulation");
                } catch (error) {
                    localStorage.removeItem("simulation");
                }
            }else{
                this.$router.replace({path:'/SelectionnerSimulationFinancementImmobilier'})
            }
        },

    },


    computed:{
        // VERIFIER SI NOUS SOMMES EN CREATION OU EN MODIFICATION
        isCreation() {
            return this.simulationFinancementImmobilierModel.id == null;
        },

        // GESTIONS DES CONTRAINTES DES CHAMPS D'ENTREES (DESIGNATION , DESCRIPTION ) DE LA SIMULATION

        designationErrors(){
            const errors = [];
            if (!this.$v.simulationFinancementImmobilierModel.designation.$dirty) return errors
            !this.$v.simulationFinancementImmobilierModel.designation.maxLength && errors.push('La designation ne doit pas dépasser 600 caractères')
            !this.$v.simulationFinancementImmobilierModel.designation.required && errors.push('La désignation est obligatoire.')
            !this.$v.simulationFinancementImmobilierModel.designation.required && errors.push('La désignation doit avoir au minimum 8 caractères.')
            return errors
        },

        descriptionErrors(){
            const errors = [];
            if (!this.$v.simulationFinancementImmobilierModel.description.$dirty) return errors
            !this.$v.simulationFinancementImmobilierModel.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.simulationFinancementImmobilierModel.description.required && errors.push('La description est obligatoire.')
            !this.$v.simulationFinancementImmobilierModel.description.minLength && errors.push('La description doit avoir plus de 20 caractères.')
            return errors 
        },

        // CONTRAINTES FINANCEMENT COMPTANT

        designationComptantErrors(){
            const errors = [];
            if (!this.$v.financementTransfertComptantModel.financementComptant.designation.$dirty) return errors
            !this.$v.financementTransfertComptantModel.financementComptant.designation.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.financementTransfertComptantModel.financementComptant.designation.required && errors.push('La description est obligatoire.')
            !this.$v.financementTransfertComptantModel.financementComptant.designation.minLength && errors.push('La description doit avoir plus de 20 caractères.')
            return errors 
        },

        descriptionComptantErrors(){
            const errors = [];
            if (!this.$v.financementTransfertComptantModel.financementComptant.description.$dirty) return errors
            !this.$v.financementTransfertComptantModel.financementComptant.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.financementTransfertComptantModel.financementComptant.description.required && errors.push('La description est obligatoire.')
            !this.$v.financementTransfertComptantModel.financementComptant.description.minLength && errors.push('La description doit avoir plus de 20 caractères.')
            return errors 
        },

        montantComptantErrors(){
            const errors = [];
            if (!this.$v.financementTransfertComptantModel.financementComptant.montant.$dirty) return errors
            !this.$v.financementTransfertComptantModel.financementComptant.montant.required && errors.push('Le montant est obligatoire.')
            !this.$v.financementTransfertComptantModel.financementComptant.montant.numeric && errors.push('Entrer un montant correct')
            
            return errors 
        },

        //CONTRAINTES CREDIT BANCAIRES

        designationCreditBancaireErrors(){
            const errors = [];
            if (!this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.$dirty) return errors
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.required && errors.push('La description est obligatoire.')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.designation.minLength && errors.push('La description doit avoir plus de 20 caractères.')
            return errors 
        },

        descriptionCreditBancaireErrors(){
            const errors = [];
            if (!this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.$dirty) return errors
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.required && errors.push('La description est obligatoire.')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.description.minLength && errors.push('La description doit avoir plus de 20 caractères.')
            return errors 
        },

        montantCreditBancaireErrors(){
            const errors = [];
            if (!this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.montant.$dirty) return errors
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.montant.required && errors.push('Le montant est obligatoire.')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.montant.numeric && errors.push('Entrez un montant exact.')
            return errors 
        },

        mensualiteProposeCreditBancaireErrors(){
            const errors = [];
            if (!this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.mensualitePropose.$dirty) return errors
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.mensualitePropose.required && errors.push('Entrer une mensualité a proposé.')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.mensualitePropose.numeric  && errors.push('La mensualité proposé doit être un nombre.')
            return errors 
        },

        revenuNetCreditBancaireErrors(){
            const errors = [];
            if (!this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.revenuNet.$dirty) return errors
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.revenuNet.required && errors.push('Le revenu NET est obligatoire.')
            !this.$v.financementTransfertCreditBancaireModel.financementCreditImmobilier.revenuNet.numeric && errors.push('Revenu Net non exact.')
            return errors 
        },
    },

    mounted(){
        this.editingSimulationFinancement();
        this.getInfoLogementFromId();
        this.getReferenceListActivite();
        this.obtenirListeVilles();
    }
    
}
</script>

<style scoped>
    .card_title{
        color: #40407a;
        font-weight: bold;
    }

    .myalert{
        display: none;
        z-index: 1900;
    }

    .alert-success{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }

    .alert-warning{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }

</style>