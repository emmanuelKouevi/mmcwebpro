<template>
    <v-app>
        <NavigationBar/>
        <v-main>

            <v-container fluid>

                <v-card elevation="1">

                    <v-card-title class="card_title">TRANSFORMER LA SIMULATION
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogPlanFinancementChoosed" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="primary" dark v-bind="attrs" v-on="on"><v-badge :content="demandeReservationLogementTransfertModel.financementList.length" :value="demandeReservationLogementTransfertModel.financementList.length" color="green" overlap><v-icon>mdi-finance</v-icon></v-badge></v-btn>
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
                                        <v-col cols="6" v-for="(financement , f) in demandeReservationLogementTransfertModel.financementList" :key="f">
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
                    <v-stepper v-model="e6" vertical>
    
                        <v-stepper-step :complete="e6 > 1" step="1">INFORMATIONS GÉNERALE(S)
                            <small>Informations portant sur votre reservation</small>
                        </v-stepper-step>
  
                        <v-stepper-content step="1">
                            <v-card class="mb-12">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field color="teal" :error-messages="designationErrors" label="Designation de la simulation"
                                                v-model.trim="$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.$model"
                                                @input="$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.$touch()"
                                                @blur="$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.$touch()">
                                            </v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-textarea color="teal" :error-messages="descriptionErrors" label="Description"
                                                v-model.trim="$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.$model"
                                                @input="$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.$touch()"
                                                @blur="$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.$touch()">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                        </v-stepper-content>
  
                        <v-stepper-step :complete="e6 > 2" step="2">PLAN DE FINANCEMENTS</v-stepper-step>
  
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
  
                        <v-stepper-step :complete="e6 > 3" step="3">PROFIL ACQUEREUR</v-stepper-step>
  
                        <v-stepper-content step="3">
                            <v-card class="mb-12" height="300px">
                                <v-container>
                                    <v-row>
                                        <v-col v-for="valeurCaracteristiqueLogement in this.demandeReservationLogementTransfertModel.valeurCaracteristiqueList"
                                            :key="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.id">

                                            <v-select v-if="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.type.id === 'ref.element.typeValeur.ville'" 
                                                :label="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.designation"
                                                v-model="valeurCaracteristiqueLogement.valeurTexte" 
                                                :items="villesList"
                                                item-text="designation" item-value="id" >
                                            </v-select>

                                            <v-select v-if="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.type.id === 'ref.element.typeValeur.reference'" 
                                                :label="valeurCaracteristiqueLogement.caracteristiqueDemandeReservationLogement.proprieteDemandeReservation.designation"
                                                v-model="valeurCaracteristiqueLogement.valeurTexte" 
                                                :items="referenceActiviteList"
                                                item-text="designation" item-value="id" >
                                            </v-select>

                                        </v-col>
    
                                    </v-row>

                                </v-container>
                            </v-card>
                                <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="e6 > 4" step="4">DOCUMENT(S) À JOINDRE</v-stepper-step>
  
                        <v-stepper-content step="4">
                            <v-card class="mb-12" height="300px">
                                <template v-if="demandeReservationLogementTransfertModel.documentDemandeReservationList.length">
                                    <v-container>
                                        <v-row>
                                            <v-col v-for="(documentDemandeDeReservationLogement, item) in demandeReservationLogementTransfertModel.documentDemandeReservationList" :key="item">
                                                <v-row>
                                                    <v-col>
                                                        <v-file-input accept=".pdf , .jpeg , .jpg" color="deep-purple accent-4" counter
                                                            placeholder="Select your files" prepend-icon="mdi-paperclip" outlined :show-size="1000"
                                                            :id="item.toString()"
                                                            :label="returnTrueLabelForTypeDocumentDemandeReservation(documentDemandeDeReservationLogement)" @change="pickDocumentForReservation(item)">
                                                            <template v-slot:selection="{ index, text }">
                                                                <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>                               
                                                                <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">+{{ files.length - 2 }} File(s)</span>
                                                            </template>
                                                        </v-file-input>
                                                    </v-col>
                                                    <v-col><v-btn icon @click="openImageOrDocumentPdf(documentDemandeDeReservationLogement.document.contenu)"><v-icon color="primary" title="ouvrir le fichier">mdi-folder-open</v-icon></v-btn></v-col>
                                                </v-row>
                                                
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </template>
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
                                <v-col cols="5"><v-btn color="secondary"><v-icon>mdi-sync</v-icon> RETOUR</v-btn></v-col>
                                <v-col cols="5"><v-btn color="info" @click="submitDemandeReservationLogement()"><v-icon>mdi-check</v-icon> TRANSFORMER</v-btn></v-col>
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
import axios from 'axios'
import $ from 'jquery'
import { API_RECHERCHER_LOGEMENT_PAR_ID , API_REFERENCES_PAR_FAMILLE , API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER , API_OBTENIR_LISTE_TYPES_DOCUMENT_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER } from '../../globalConfig/globalConfig'
import { REF_ELEMENT_VALEUR_COMPTANT , REF_ELEMENT_VALEUR_CREDIT_BANCAIRE , } from '../../globalConfig/globalConfig'
import { API_RECHERCHER_SIMULATION_FINANCEMENT_PAR_ID , API_OBTENIR_LISTE_VILLES , API_OBTENIR_LISTE_EFIS , API_OBTENIR_FORMATS_DOCUMENTS , API_OBTENIR_LISTE_CARACTERISTIQUES_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER } from '../../globalConfig/globalConfig'


export default {
    name:'TransformerSimulationFinancement',
    components:{
        NavigationBar,
        FooterBar
    },
    data(){
        return{
            successMsg : null ,
            errorMsg : null ,
            warningMsg : null ,
            overlay: false,
            dialogFinancement : false ,
            dialogPlanFinancementChoosed:false,
            e6 : 1,
            
            
            myLogement : {},
            caracteristiqueDemandeReservationLogementList : [],
            referenceActiviteList : [],
            villesList : [],
            typeFinancementList : [],
            formatList : [],
            modeFinancementList : [],
            valeurCaracteristiqueDemandeReservationList : [],
            valeurTypeDocumentDemandeReservationList : [],
            isShowDialogAddingFinancementPlan : false ,
            periodiciteList : [] , 
            efiList : [],
            typeFinancementId : null ,
            familleTypeDocumentReservationList : [],
            typeDocumentDemandeReservationList : [],



            demandeReservationLogementTransfertModel : {
                demandeReservationLogement : {
                    id : null , 
                    designation : null ,
                    description : null ,
                    estValideParPromoteur : null ,
                    estValideParEfi : null ,
                    motifRefusParPromoteur : null ,
                    motifRefusParEfi : null ,
                    //coutReservation : null ,
                    user : {
                        id : 'faadc15f-2808-44e0-94cc-d0bd841bcf59', 
                    },
                    logement : {} , 
                    etapeList : [] , 
                    etapeEnCours : {}
                },
                financementList : [],
                valeurCaracteristiqueList: [],
                documentDemandeReservationList: [],
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
        demandeReservationLogementTransfertModel:{
            demandeReservationLogement : {
                designation : {
                    required,
                    minLength : minLength(6),
                    maxLength : maxLength(300),
                },

                description : {
                    required,
                    minLength : minLength(6),
                    maxLength : maxLength(600)
                }   
            },

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

        //TRANSFORMER UNE SIMULATION DE FINANCEMENT IMMOBILIER EN DEMANDE DE RESERVATION

        async transformerSimulationEnDemendeReservation(){

        },

        // SELECTION DE DOCUMENTS INPUT
    
        pickDocumentForReservation(position){
            for (let i = 0; i < this.demandeReservationLogementTransfertModel.documentDemandeReservationList.length; i++) {
                if (i == position) {
                    var reader = new FileReader()
                    var extension = document.getElementById(position).files[0].name.split('.')[1]
                    reader.readAsDataURL(document.getElementById(position).files[0])
                    reader.onload = e => {
                        this.demandeReservationLogementTransfertModel.documentDemandeReservationList[position].document.contenu = e.target.result;
                        this.formatList.forEach(element => {
                            if(element.extension.split('.')[1] == extension) {
                                this.demandeReservationLogementTransfertModel.documentDemandeReservationList[position].document.format = element   
                            }
                        });
                    } 
                }   
            }
        },


        //OBTENIR LISTE DES CARACTERISTIQUES ET TYPES DOCUMENTS RESERVATION PAR LOGEMENT
        async obtenirCaracteristiqEtTypeDocument(logement){
            if (logement != null) {
                this.getModeFinancementListParProgramme(logement.produitLogement.programmeImmobilier.id)
                this.obtenirListtypeFinancement(logement.produitLogement.programmeImmobilier.id) ;
                this.getCaracteristiqueReservationParProgrammeImmobilier(logement.produitLogement.programmeImmobilier.id);
                this.getTypeDocumentDemandeReservationListByProgrammeImmobilier(logement.produitLogement.programmeImmobilier.id);
            }
        },


        // OBTENIR INFOS LOGEMENT PAR SON ID

        async getInfoLogementFromId(){
            if (this.$route.params.id != undefined || this.$route.params.id != null) {
                await axios.get(API_RECHERCHER_LOGEMENT_PAR_ID(this.$route.params.id)).then((response)  => {
                    this.myLogement = response.data.data;
                    this.demandeReservationLogementTransfertModel.demandeReservationLogement.logement.id = this.myLogement.id ; 
                }).catch((error)  => {
                    console.log(error)
                })
            }
            this.getModeFinancementListParProgramme(this.myLogement.produitLogement.programmeImmobilier.id)
            this.obtenirListtypeFinancement(this.myLogement.produitLogement.programmeImmobilier.id) ;
            this.getCaracteristiqueReservationParProgrammeImmobilier(this.myLogement.produitLogement.programmeImmobilier.id);
            this.getTypeDocumentDemandeReservationListByProgrammeImmobilier(this.myLogement.produitLogement.programmeImmobilier.id);
        },


        // OBTENIR LA LISTE DES TYPES DE DOCUMENTS DE DEMANDE DE RESERVATION PAR PROGRAMME IMMOBILIER

        async getTypeDocumentDemandeReservationListByProgrammeImmobilier(programmeImmobilier_id){
            axios.get(API_OBTENIR_LISTE_TYPES_DOCUMENT_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER(programmeImmobilier_id)).then((response) => {
                this.typeDocumentDemandeReservationList = response.data.data;
                this.typeDocumentDemandeReservationList.forEach(element => {
                    var documentDemandeDeReservationLogement = {
                        id : null ,
                        document : {
                            id :null ,
                            designation : null ,
                            description : null ,
                            contenu : null ,
                            path : null ,
                            format : {
                                id: null,
                                version: null,
                            },
                            typeDocument:{
                                id: null
                            },
                        },
                        /*typeDocumentDemandeReservationLogement : {
                            id : null , 
                            typeDocument : {},
                            programmeImmobilier : {
                                id : null , 
                            },
                            estOblogatoire : null,
                        }*/
                    };
                    documentDemandeDeReservationLogement.document.typeDocument = element.typeDocument;
                    //documentDemandeDeReservationLogement.typeDocumentDemandeReservationLogement.typeDocument = element.typeDocument;
                    //documentDemandeDeReservationLogement.typeDocumentDemandeReservationLogement.programmeImmobilier.id = element.programmeImmobilier.id;
                    this.demandeReservationLogementTransfertModel.documentDemandeReservationList.push(documentDemandeDeReservationLogement);
                });
            }).catch((e) => {
                console.log(e)
            });
        },

        // OUVERTURE D'UN DOCUMENT DANS UN AUTRE ONGLET
        openImageOrDocumentPdf(source){
            window.open(source); 
        },



        // RECUPERER LA LISTE DES REFERENCE FAMILLES DE TYPE DOCUMENT

        async getReferenceFamilleTypeDocument(){
            await axios.get(API_REFERENCES_PAR_FAMILLE("ref.famille.demandeReservation.typeDocument")).then((response) => {
                this.familleTypeDocumentReservationList = response.data.data
            }).catch((e) => {
                console.log(e)
            });

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

                this.demandeReservationLogementTransfertModel.financementList.push(financementComptantTransfert.financementComptant)
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

                this.demandeReservationLogementTransfertModel.financementList.push(financementCreditTransfert.financementCredit)
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

        returnTrueLabelForTypeDocumentDemandeReservation(documentDemandeReservationLogement){
            var designation ;
            // On fait d'abord une recherche du document
            for (let index = 0; index < this.typeDocumentDemandeReservationList.length; index++) {
                if (this.typeDocumentDemandeReservationList[index].typeDocument.id == documentDemandeReservationLogement.document.typeDocument.id) {
                    for (let count = 0; count < this.familleTypeDocumentReservationList.length; count++) {
                        if(this.typeDocumentDemandeReservationList[index].typeDocument.id == this.familleTypeDocumentReservationList[count].id){
                            designation = this.familleTypeDocumentReservationList[count].designation
                        }         
                    }
                }          
            }
            return designation ; 
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
                    this.demandeReservationLogementTransfertModel.valeurCaracteristiqueList.push(valeurCaracteristiqueDemandeReservationLogement)
                });
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

        // RECUPERER DEPUIS LE MIDDLEWARE LA LISTE DES FORMATS DISPONIBLES
        async getFormatListAvailable() {
            await axios.get(API_OBTENIR_FORMATS_DOCUMENTS).then((response) => {
                this.formatList = response.data.data; 
            }).catch((e) => {
                console.log(e)
            });

        },

        //RECUPERER LES INFORMATIONS DE LA SIMULATION DE FINANCEMENT SELECTIONNÉE

        async editingSimulationForTransformation(){
            if (localStorage.getItem("simulation")) {
                try {
                    const simulationEditing = JSON.parse(localStorage.getItem("simulation"));
                    const simulationFinancementId = simulationEditing.id
                    await axios.get(API_RECHERCHER_SIMULATION_FINANCEMENT_PAR_ID(simulationFinancementId)).then((response) => {
                        this.demandeReservationLogementTransfertModel.demandeReservationLogement.designation = response.data.data.designation;
                        this.demandeReservationLogementTransfertModel.demandeReservationLogement.description = response.data.data.description;
                        this.demandeReservationLogementTransfertModel.demandeReservationLogement.logement = response.data.data.logement;
                        this.demandeReservationLogementTransfertModel.financementList = response.data.data.financementList;
                        this.obtenirCaracteristiqEtTypeDocument(this.demandeReservationLogementTransfertModel.demandeReservationLogement.logement)
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
        // GESTIONS DES CONTRAINTES DES CHAMPS D'ENTREES (DESIGNATION , DESCRIPTION ) DE LA DEMANDE DE RESERVATION

        designationErrors(){
            const errors = [];
            if (!this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.$dirty) return errors
            !this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.maxLength && errors.push('La designation ne doit pas dépasser 600 caractères')
            !this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.required && errors.push('La désignation est obligatoire.')
            !this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.designation.required && errors.push('La désignation doit avoir au minimum 8 caractères.')
            return errors
        },

        descriptionErrors(){
            const errors = [];
            if (!this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.$dirty) return errors
            !this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
            !this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.required && errors.push('La description est obligatoire.')
            !this.$v.demandeReservationLogementTransfertModel.demandeReservationLogement.description.minLength && errors.push('La description doit avoir plus de 20 caractères.')
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
        this.editingSimulationForTransformation()
    }

}
</script>


<style scoped>
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