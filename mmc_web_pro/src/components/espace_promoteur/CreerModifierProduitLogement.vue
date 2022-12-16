<template>

    <v-app>

        <v-form @submit.prevent="submitForm">

            <v-card elevation="5">

                <v-card-title v-if="isCreation"><span class="create_or_modify_title">CREER UN PRODUIT LOGEMENT</span> </v-card-title>
                <v-card-title v-else><span class="create_or_modify_title">MODIFIER UN PRODUIT LOGEMENT</span> </v-card-title>

                <v-card>
                    <v-row>
                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">INFORMATION(S) GÉNÉRALE(S)</span> 
                        </v-card-subtitle>
                    </v-row>

                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field color="teal" :error-messages="designationProduitLogementErrors" 
                                    :counter="10" label="Designation" v-model.trim=" $v.produitLogementModel.produitLogement.designation.$model" 
                                    required>
                                </v-text-field>
                            </v-col>
    
                            <v-col cols="6">
                                <v-select color="teal" :error-messages="programmeProduitLogementErrors"
                                    :items="programmeImmobilierList" item-text="designation" item-value="id"
                                    label="Programme Immobilier" v-model="produitLogementModel.produitLogement.programmeImmobilier.id"  required>
                                </v-select>
                            </v-col>
    
                            <v-col cols="12">
                                <v-textarea  color="teal" :error-messages="descriptionProduitLogementErrors" label="Description"
                                    v-model.trim=" $v.produitLogementModel.produitLogement.description.$model">
                                    <template v-slot:label><div>Description</div></template>
                                </v-textarea>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field color="teal" :error-messages="codeProduitLogementErrors" 
                                    label="Code" v-model.trim="$v.produitLogementModel.produitLogement.code.$model" required>
                                </v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field color="teal" :error-messages="prixProduitLogementErrors" 
                                    label="Prix" suffix="FCFA" v-model.number="$v.produitLogementModel.produitLogement.prix.$model" required>
                                </v-text-field>
                            </v-col>
                            
                        </v-row>
                    </v-container>
                </v-card>

                <p></p>

                <v-card elevation="3">

                   <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-row>
                                    <span class="section"><v-icon>mdi-chevron-right</v-icon>CARACTERISTIQUES OBLIGATOIRES</span> 
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-container>
                                    <v-row>
                                        <v-col v-for="caracteristique in caracteristiqueObligatoireList" :key="caracteristique.id">
                                            <v-text-field v-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.double'" 
                                                color="teal" :label="caracteristique.proprieteProduitLogement.designation" 
                                                required v-model="caracteristique.valeurTexte">
                                            </v-text-field>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.reference'" color="teal" :error-messages="programmeProduitLogementErrors"
                                                :items="referenceList" item-text="designation" item-value="id"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.ville'" color="teal"
                                                :items="villesList" item-text="designation" item-value="id"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.integer'" color="teal"
                                                :items="getIntegerList(caracteristique)" item-text="index" item-value="index"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-checkbox dense v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.boolean'" v-model="caracteristique.valeurTexte"
                                                :label="caracteristique.proprieteProduitLogement.designation" color="teal" true-value="true" false-value="false"
                                            ></v-checkbox>
                                            <v-text-field v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.string'" 
                                                color="teal" :label="caracteristique.proprieteProduitLogement.designation" 
                                                required v-model="caracteristique.valeurTexte">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                   </v-expansion-panels>                    
                </v-card>

                <p></p>

                <v-card elevation="3">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-row>
                                    <span class="section"><v-icon>mdi-chevron-right</v-icon>CARACTERISTIQUES USUELLES</span> 
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-container>
                                    <v-row>
                                        <v-col v-for="caracteristique in caracteristiqueUsuelleList" :key="caracteristique.id">
                                            <v-text-field v-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.double'" 
                                                color="teal" :label="caracteristique.proprieteProduitLogement.designation" 
                                                required v-model="caracteristique.valeurTexte">
                                            </v-text-field>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.reference'" color="teal" :error-messages="programmeProduitLogementErrors"
                                                :items="referenceList" item-text="designation" item-value="id"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.ville'" color="teal"
                                                :items="villesList" item-text="designation" item-value="id"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.integer'" color="teal"
                                                :items="getIntegerList(caracteristique)"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-checkbox dense v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.boolean'" v-model="caracteristique.valeurTexte"
                                                :label="caracteristique.proprieteProduitLogement.designation" color="teal" true-value="true" false-value="false"
                                            ></v-checkbox>
                                            <v-text-field v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.string'" 
                                                color="teal" :label="caracteristique.proprieteProduitLogement.designation" 
                                                required v-model="caracteristique.valeurTexte">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>

                <p></p>


                <v-card elevation="3">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-row>
                                    <span class="section"><v-icon>mdi-chevron-right</v-icon>CARACTERISTIQUES OPTIONNELLES</span> 
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-container>
                                    <v-row>
                                        <v-col cols="4" v-for="caracteristique in caracteristiqueOptionelleList" :key="caracteristique.id">
                                            <v-text-field v-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.double'" 
                                                color="teal" :label="caracteristique.proprieteProduitLogement.designation" 
                                                required v-model="caracteristique.valeurTexte">
                                            </v-text-field>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.reference'" color="teal" :error-messages="programmeProduitLogementErrors"
                                                :items="referenceList" item-text="designation" item-value="id"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.ville'" color="teal"
                                                :items="villesList" item-text="designation" item-value="id"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-select v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.integer'" color="teal"
                                                :items="getIntegerList(caracteristique)"
                                                :label="caracteristique.proprieteProduitLogement.designation" v-model="caracteristique.valeurTexte"  required>
                                            </v-select>
                                            <v-checkbox dense v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.boolean'" v-model="caracteristique.valeurTexte"
                                                :label="caracteristique.proprieteProduitLogement.designation" color="teal" true-value="true" false-value="false"
                                            ></v-checkbox>
                                            <v-text-field v-else-if=" caracteristique.proprieteProduitLogement.type.id ==='ref.element.typeValeur.string'" 
                                                color="teal" :label="caracteristique.proprieteProduitLogement.designation" 
                                                required v-model="caracteristique.valeurTexte">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>

                <p></p>

                <v-card elevation="3">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-row>
                                    <span class="section"><v-icon>mdi-chevron-right</v-icon>CARACTERISTIQUES SPECIFIQUES AUX LOGEMENTS</span> 
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-container>
                                    <v-row>
                                        <v-col cols="4" v-for="caracteristique in isValeurCaracteristiqueNonDefinis" :key="caracteristique.id">
                                            <v-checkbox dense v-model="caracteristique.valeurTexte"
                                                :label="caracteristique.proprieteProduitLogement.designation" color="teal" true-value="true" false-value="false"
                                            ></v-checkbox>
                                        </v-col>

                                        <v-col cols="4" v-for="caracteristique in caracteristiqueLogementNonDefinies" :key="caracteristique.id">
                                            <v-checkbox dense v-model="caracteristique.valeurTexte"
                                                :label="caracteristique.proprieteProduitLogement.designation" color="teal" true-value="true" false-value="false"
                                            ></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>

                <p></p>

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-row>
                                <span class="section"><v-icon>mdi-chevron-right</v-icon>IMAGE DE CONSULTATION</span> 
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-card class="mx-auto" max-width="800">
                                    <v-spacer></v-spacer>
                                    <v-btn icon color="grey"><v-icon>mdi-upload</v-icon><input @change="pickFile" type="file" ref="fileInput" id="inputFile"></v-btn>
                                    <v-btn icon color="grey" @click="deleteImageConsultation(produitLogementModel.imageConsultation)"><v-icon>mdi-close</v-icon></v-btn>
                                    <v-img :src="produitLogementModel.imageConsultation.contenu" height="300px"></v-img>

                                    <v-card-subtitle>
                                        <v-text-field color="teal" v-model="produitLogementModel.imageConsultation.designation" label="designation" :disabled="produitLogementModel.imageConsultation.contenu == null"></v-text-field>
                                    </v-card-subtitle>
                                    
                                </v-card>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <br>

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-row>
                                <span class="section"><v-icon>mdi-chevron-right</v-icon>AUTRES IMAGES</span> 
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary"><v-icon>mdi-upload</v-icon><input @change="previewMultiImage" type="file" accept="image/*" multiple="multiple" id="myFile">AJOUTER DES IMAGES</v-btn>
                            <v-container>
                                <template v-if="produitLogementModel.imagesList.length">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="4" v-for="(image , i) in produitLogementModel.imagesList" :key="i">
                                                <v-card class="mx-auto" max-width="800">
                                                    <v-spacer></v-spacer>
                                                    <v-btn icon color="grey" @click="deleteImageList(i)"><v-icon>mdi-close</v-icon></v-btn>

                                                    <v-img :src="image.contenu" height="200px"></v-img>
                                    
                                                    <v-card-subtitle>
                                                        <v-text-field v-model="image.designation" label="designation" :disabled="image.contenu == null"></v-text-field>
                                                    </v-card-subtitle>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </template>
                                
                                
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <br>

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-row>
                                <span class="section"><v-icon>mdi-chevron-right</v-icon>VIDEOS</span> 
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary"><v-icon>mdi-upload</v-icon><input type="file" accept="video/*" multiple="multiple" @change="previewMultiVideo" id="myVideoFile">AJOUTER UNE VIDEO</v-btn>
                            <v-container>
                                <template v-if="produitLogementModel.videosList.length">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="6" v-for="(video , v) in produitLogementModel.videosList" :key="v">
                                                <v-card class="mx-auto" max-width="800">
                                                    <v-spacer></v-spacer>
                                                    <v-btn icon color="grey" @click="deleteVideoList(v)"><v-icon>mdi-close</v-icon></v-btn>
                                                    
                                                    <v-card-subtitle>
                                                        <v-text-field v-model="video.designation" label="designation" :disabled="video.contenu == null"></v-text-field>
                                                    </v-card-subtitle>
                                                    <video :src="video.contenu" controls width="450" height="250" autoplay loop preload="metadata"></video>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </template>
                                
                                
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

            </v-card>

            <p></p>

            <br>

            <v-row>

                <v-col cols="5"><v-btn type="button" text>REINITIALISER</v-btn></v-col>

                <v-col cols=""><v-btn type="submit" textn color="primary"><v-icon>mdi-check</v-icon> CREER</v-btn></v-col>

            </v-row>

            

        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
 
    </v-app>

</template>

<script>
import { required, minLength, maxLength , numeric  } from "vuelidate/lib/validators";
import { API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER , API_OBTENIR_LISTE_PROPRIETES , API_OBTENIR_LISTE_VILLES , API_MODIFIER_CONTENU_IMAGE_CONSULTATION } from '../globalConfig/globalConfig';
import { API_OBTENIR_FORMATS_DOCUMENTS , API_REFERENCES_PAR_FAMILLE , API_CREER_PRODUIT_LOGEMENT , API_MODIFIER_METADATAS_IMAGE_CONSULTATION } from '../globalConfig/globalConfig';
import { API_OBTENIR_IMAGE_CONSULTATION , API_OBTENIR_METADATAS_DOCUMENT , API_OBTENIR_CONTENU_DOCUMENT , API_AJOUTER_DOCUMENT , API_MODIFIER_PRODUIT_LOGEMENT  } from '../globalConfig/globalConfig';
import axios from 'axios';
import $ from 'jquery';
    export default {
        name: 'CreerModifierProduitLogement',
        data(){
            return{
                programmeImmobilierList:[],
                caracteristiqueObligatoireList: [],
                caracteristiqueUsuelleList: [],
                caracteristiqueOptionelleList: [],
                villesList:[],
                formatsList:[],
                referenceList:[],
                caracteristiqueLogementNonDefinies : [] ,

                etatImageConsultation:{
                    designation : null,
                    description : null,
                    contenu : null
                },


                successMsg : null ,
                errorMsg : null ,
                warningMsg : null,
                overlay: false,



                produitLogementModel: {
                    produitLogement: {
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
                        prix : null
                    },
                    imagesList : [],
                    videosList : [],
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
                },

                documentTransfertModel : {
                    document : {
                        id : null ,
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
                    entityName : "ref.element.type.produitLogement",
                    entityId : null
                },
            }
        },

        validations: {

            produitLogementModel: {

                produitLogement: {
                    designation: {
                        required,
                        minLength: minLength(4),
                        maxLength: maxLength(50),
                    },
                    description: {
                        required,
                        minLength: minLength(6),
                        maxLength: maxLength(650),
                    },
                    programmeImmobilier:{
                        id:{
                            required,
                        }
                    },
                    code: {
                        required,
                        minLength: minLength(4),
                        maxLength: maxLength(20),
                    },
                    prix : {
                        required,
                        numeric
                    }
                },
            },

            caracteristiqueObligatoireList:{
                required , 
                $each : {
                    valeurTexte : {
                        required
                    }
                }
            }
        },

        methods : {

            //Envoie des caractéristiques seulement renseignés vers le middleware
            sendCaracteristiqueDefinies() {
                var contains = [];
                this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList.forEach(element => {
                    if (element.valeurTexte !== null && element.valeurTexte !== "false") {
                        contains.push(element)
                    }
                });
                this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList = contains;
            },


            // DEFINIR LES CARACTERISTIQUES PRODUIT LOGEMENT NON DEFINIS
            transfertCaracteristiqNonDefini(){
                this.caracteristiqueLogementNonDefinies = this.isValeurCaracteristiqueNonDefinis;

                if (this.caracteristiqueLogementNonDefinies.length > 0 ) {
                    for (let i = 0; i < this.caracteristiqueLogementNonDefinies.length; i++) {
                        if (this.caracteristiqueLogementNonDefinies[i].valeurTexte == "valeur.nonDefinie") {
                            this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList.push(this.caracteristiqueLogementNonDefinies[i]) 
                        }
                    }
                }
            },



            // APPEL DU SERVICE WEB PERMETTANT LA CREATION D'UN PRODUIT PRODUIT LOGEMENT

            async actionCreationProduitLogement(produitLogement){
                this.overlay = true
                await axios.post(API_CREER_PRODUIT_LOGEMENT, produitLogement).then((response) => {
                    if (response.status == 200) { 
                        this.successMsg = "Création du produit logement effectué"
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)

                    } else{

                        this.errorMsg = "Erreur dans la création du produit logement"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)

                        if (response.data.messages != null) {
                            for (var i = 0; i < response.data.messages.length; i++) {
                                this.messageList.push(response.data.messages[i].status + "," + response.data.messages[i].message);
                            }
                        }
                    }

                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }).finally(() => {
                    this.overlay = false
                })
            },

            

            // ACTION DE MODIFICATION DE PRODUIT LOGEMENT

            async actionModifierProduitLogement(produitLogement){
                this.overlay = true
                await axios.put(API_MODIFIER_PRODUIT_LOGEMENT, produitLogement).then((response) => {
                    if (response.status == 200) {
                        this.successMsg = "Produit Logement modifié avec succès"
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                    } 
                    else{
                        this.errorMsg = "Erreur dans la modification du produit logement"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }).finally(() => {
                    this.overlay = false
                })
            },



            //AJOUT DE NOUVELLES IMAGES LORS DE LA MODIFICATION D'UN PRODUIT LOGEMENT 

            async ajouterImagesListProduitLogement(imagesList){
                if (imagesList.length != 0) {
                    imagesList.forEach(element => {
                        if (element.id == null) {
                            if (this.produitLogementModel.produitLogement.id != null) {

                                this.documentTransfertModel.document.designation = element.designation;
                                this.documentTransfertModel.document.description = element.description;
                                this.documentTransfertModel.document.contenu = element.contenu;
                                this.documentTransfertModel.document.format.id = element.format.id;
                                this.documentTransfertModel.document.typeDocument.id = element.typeDocument.id;
                                this.documentTransfertModel.entityId = this.produitLogementModel.produitLogement.id;
                                this.ajouterDocumentMedia(this.documentTransfertModel)
                            }
                        }
                    });
                }
            },



            // ENVOI DU FORMULAIRE DE CREATION OU MODIFICATION DE PRODUIT LOGEMENT VERS LE MIDDLEWARE

            async creerModifierProduitLogement() {
                this.transfertCaracteristiqNonDefini();
                this.sendCaracteristiqueDefinies();
                if (this.isCreation) {
                    this.actionCreationProduitLogement(this.produitLogementModel);
                }else {
                    this.actionModifierProduitLogement(this.produitLogementModel);
                    this.modifierImageConsultation();
                    this.modificationImagesList();
                    this.modificationVideosList();

                }

            },




            // AJOUT DE DOCUMENT (VIDEOS ET IMAGES)

            async ajouterDocumentMedia(documentMedia){
                await axios.post(API_AJOUTER_DOCUMENT , documentMedia ).then((response) => {
                    if (response.data.data == true) {
                        this.successMsg = "NOUVELLE IMAGE CREE AVEC SUCCES"
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                    } 
                    else{
                        this.errorMsg = "IMPOSSIBLE D'AJOUTER UNE IMAGE"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }
                })
            },



            // MODIFICATION DES IMAGES LIST DANS 
            /*modificationImagesList(){

      if(this.produitLogementModel.imagesList.length > 0){

        for (let i = 0; i < this.produitLogementModel.imagesList.length; i++) {

          for (let j = 0; j < this.previewStateImagesList.length; j++) {

            if (this.produitLogementModel.imagesList[i].id == this.previewStateImagesList[j].id) {

              if ((this.produitLogementModel.imagesList[i].designation != this.previewStateImagesList[j].designation 
                  || this.produitLogementModel.imagesList[i].description != this.previewStateImagesList[j].description)
                  
                  && this.produitLogementModel.imagesList[i].contenu != this.previewStateImagesList[j].contenu) {

                  this.$isLoading(true)
                
                  axios

                  .put(API_MODIFIER_METADATAS_DOCUMENT, this.produitLogementModel.imagesList[i])

                  .then((response) => {
                    
                    if (response.status == 200) {

                      this.produitLogementModel.imagesList[i].version = response.data.data.version

                      axios

                      .put(API_MODIFIER_CONTENU_DOCUMENT, this.produitLogementModel.imagesList[i])

                      .then((response) => {

                        if (response.status == 200) {

                          this.successMsg = "Modification du contenu et des métadatas éffectuée"

                          $(".myAlert-top").fadeIn();

                          setTimeout(function(){

                            $(".myAlert-top").fadeOut(); 

                          }, 4000)
                          
                        }

                      })

                      .catch((e) => {

                        this.errorMsg = e

                        $(".myAlert-bottom").fadeIn();

                        setTimeout(function(){

                          $(".myAlert-bottom").fadeOut(); 

                        }, 4000)

                      })
                      
                    }

                  })

                  .catch((e) => {

                    this.errorMsg = e

                    $(".myAlert-bottom").fadeIn();

                    setTimeout(function(){

                      $(".myAlert-bottom").fadeOut(); 

                    }, 4000)

                  })

                  .finally(() => {

                    this.$isLoading(false) // hide the loading screen
                        
                  })

              }

              else if (this.produitLogementModel.imagesList[i].designation != this.previewStateImagesList[j].designation
                        || this.produitLogementModel.imagesList[i].description != this.previewStateImagesList[j].description){

                  this.$isLoading(true)

                  axios

                  .put(API_MODIFIER_METADATAS_DOCUMENT, this.produitLogementModel.imagesList[i])

                  .then((response) => {

                    if (response.status == 200) {

                      this.errorMsg = "Modification des metadatas effectuée"

                      $(".myAlert-top").fadeIn();

                      setTimeout(function(){

                        $(".myAlert-top").fadeOut(); 

                      }, 4000)
                      
                    }

                  })

                  .catch((e) => {

                    this.errorMsg = e

                    $(".myAlert-bottom").fadeIn();

                    setTimeout(function(){

                      $(".myAlert-bottom").fadeOut(); 

                    }, 4000)

                  })

                  .finally(() => {

                    this.$isLoading(false) // hide the loading screen
                        
                  })
                
              }

              else if (this.produitLogementModel.imagesList[i].contenu != this.previewStateImagesList[j].contenu){

                  this.$isLoading(true)

                  axios

                  .put(API_MODIFIER_CONTENU_DOCUMENT, this.produitLogementModel.imagesList[i])

                  .then((response) => {

                    if (response.status == 200) {

                      this.successMsg = "IMAGE MODIFIÉE AVEC SUCCÈS"

                      $(".myAlert-top").fadeIn();

                      setTimeout(function(){

                        $(".myAlert-top").fadeOut(); 

                      }, 4000)
                      
                    }

                  })

                  .catch((e) => {

                    this.errorMsg = e

                    $(".myAlert-bottom").fadeIn();

                    setTimeout(function(){

                      $(".myAlert-bottom").fadeOut(); 

                    }, 4000)

                  })

                  .finally(() => {

                    this.$isLoading(false) // hide the loading screen
                        
                  })

              }

            }
            
          }

        }

        this.ajouterNewImagesList()

      }

    },*/


            // SERVICE WEB POUR L'AJOUT D'UN DOCUMENT (IMAGE DE CONSULTATION)

            async ajouterDocumentImageConsultation(documentImageConsultation){
                await axios.post(API_AJOUTER_DOCUMENT,documentImageConsultation).then((response) => {
                    if (response.data.data == true) {  
                        this.successMsg = "Nouvelle Image de consultation ajoutée"
                        $(".alert-success").fadeIn();
                        setTimeout(function(){
                            $(".alert-success").fadeOut(); 
                        }, 4000)
                    }else {
                        this.errorMsg = "Impossible d'ajouter une image"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                })
            },


            //MODIFICATION DU CONTENU D'UNE IMAGE DE CONSULTATION EN MODIFICATION 

            async modifierContenuImageConsultation(imageConsultation){
                await axios.put(API_MODIFIER_CONTENU_IMAGE_CONSULTATION,imageConsultation).then((response) => {

                    if (response.status == 200) {
                        this.successMsg = "Modification du contenu"
                        $(".alert-succes").fadeIn();
                        setTimeout(function(){
                            $(".alert-succes").fadeOut(); 
                        }, 4000)
                    }else if (response.status == 204){
                        this.errorMsg = "Pas de contenu"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }else{
                        this.errorMsg = "Modification Impossible"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)

                })
            },


            //MODIFICATION DES METADATAS D'UNE IMAGE DE CONSULTATION EN MODIFICATION 

            async modifierMetadatasImageConsultation(imageConsultation){
                await axios.put(API_MODIFIER_METADATAS_IMAGE_CONSULTATION,imageConsultation).then((response) => {

                    if (response.status == 200) {
                        this.successMsg = "Modification éffectuée"
                        $(".alert-succes").fadeIn();
                        setTimeout(function(){
                            $(".alert-succes").fadeOut(); 
                        }, 4000)
                    }else{
                        this.errorMsg = "Modification Impossible"
                        $(".alert-error").fadeIn();
                        setTimeout(function(){
                            $(".alert-error").fadeOut(); 
                        }, 4000)
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)

                })
            },




            //MODIFIER LES METADATAS ET / OU LE CONTENU D'UNE IMAGE DE CONSULTATION

            modifierImageConsultation(){

                if(this.produitLogementModel.imageConsultation != null){

                    this.ajouterNouvelleImageConsultation();
                    if(this.produitLogementModel.imageConsultation.id != null && this.produitLogementModel.imageConsultation.version != null){
                        var variable = this.returnEtatImageConsultation();

                        if (variable.contenu != this.produitLogementModel.imageConsultation.contenu) {
                            this.modifierContenuImageConsultation(this.produitLogementModel.imageConsultation)
                        }

                        if (variable.designation != this.produitLogementModel.imageConsultation.designation || variable.description != this.produitLogementModel.imageConsultation.description){
                            this.modifierMetadatasImageConsultation(this.produitLogementModel.imageConsultation)
                        }

                        if ((variable.designation != this.produitLogementModel.imageConsultation.designation || variable.description != this.produitLogementModel.imageConsultation.description)
                            && variable.contenu != this.produitLogementModel.contenu) {
                            //@TODO : //MODIFICATION DE LA VERSION APRES LA MODIFICATION DES METADATAS(VOIR MMC_WEB)
                            this.modifierMetadatasImageConsultation(this.produitLogementModel.imageConsultation);
                            this.modifierContenuImageConsultation(this.produitLogementModel.imageConsultation)
                        }
                    }
                }
            },





            // AJOUTER UNE NOUVELLE DE CONSULATION EN CAS DE MODIFICATION D'UN PRODUIT LOGEMENT

            ajouterNouvelleImageConsultation(){

                if(this.produitLogementModel.imageConsultation.id == null){

                    if (this.produitLogementModel.produitLogement.id != null && this.produitLogementModel.produitLogement.version != null) {

                        this.documentTransfertModel.document.designation = this.produitLogementModel.imageConsultation.designation
                        this.documentTransfertModel.document.description = this.produitLogementModel.imageConsultation.description
                        this.documentTransfertModel.document.contenu = this.produitLogementModel.imageConsultation.contenu
                        this.documentTransfertModel.document.format.id = this.produitLogementModel.imageConsultation.format.id
                        this.documentTransfertModel.document.typeDocument.id = this.produitLogementModel.imageConsultation.typeDocument.id
                        this.documentTransfertModel.entityId = this.produitLogementModel.produitLogement.id

                        if (this.documentTransfertModel.document.contenu != null) {
                            this.ajouterDocumentImageConsultation(this.documentTransfertModel)
                        }
                    }
                }
            },




            // SOUMISSION DU FORMULAIRE

            submitForm() {

                this.$v.$touch();
                if (this.$v.produitLogementModel.$invalid) {
                    this.errorMsg = "Enregistrement Echoué"
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
                else if(this.$v.caracteristiqueObligatoireList.$invalid){

                    this.errorMsg = "Toutes les caractéristiques obligatoires doivent être renseignées"

                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
                else{
                    this.creerModifierProduitLogement();
                }        
            },


            
            // Methodes permettant de choisir une listes de videos

            previewMultiVideo: function(event) {

                var myFile = document.getElementById('myVideoFile')
                var extension = myFile.value.split('.')[1]

                var input = event.target;
                var count = input.files.length;
                var index = 0;

                var video = {
                    id : null , 
                    designation : null , 
                    description : null , 
                    contenu : null ,
                    format : {
                        id : null , 
                        version : null
                    },
                    typeDocument:{
                        id: "ref.element.typeValeur.video"
                    },
                    version : null
                };

                for (let i = 0; i < this.formatsList.length; i++) {
                    if (extension == this.formatsList[i].designation) {
                        video.format.id = this.formatsList[i].id
                    }
                }
                video.designation = this.getFile(myFile.value)

                if (input.files) {

                    while(count --) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            video.contenu = e.target.result
                            this.produitLogementModel.videosList.push(video);
                            this.previewVideosList.push(e.target.result)
                        }
                        reader.readAsDataURL(input.files[index]);
                        index ++;
                    }
                }
            },



            //FONCTION PERMETTANT LA SELECTION DE PLUSIEURS IMAGES 

            previewMultiImage: function(event) {
                var myFile = document.getElementById('myFile')
                var extension = myFile.value.split('.')[1]
                var input = event.target;
                var count = input.files.length;
                var index = 0;

                var image = {
                    id : null , 
                    designation : null , 
                    description : null , 
                    contenu : null ,
                    format : {
                        id : null , 
                        version : null
                    },
                    typeDocument:{
                        id: "ref.element.typeValeur.image"
                    },
                    version : null
                };

                this.formatsList.forEach(element => {
                if (extension == element.designation) {
                        image.format.id = element.id
                    } 
                });

                image.designation = this.getFile(myFile.value)

                if (input.files) {

                    while(count --) {

                    var reader = new FileReader();

                    reader.onload = (e) => {
                        image.contenu = e.target.result
                        this.produitLogementModel.imagesList.push(image);
                    }
                    reader.readAsDataURL(input.files[index]);
                    index ++;

                    }
                }
            },

            //SUPPRIMER IMAGES LIST

            deleteImageList(position){
                this.produitLogementModel.imagesList.splice(position , 1);
            },

            deleteVideoList(position){
                this.produitLogementModel.videosList.splice(position , 1);
            },

            //SUPPRIMER UNE IMAGE DE CONSULTATION

            deleteImageConsultation(imageConsultation){
                if (this.isCreation){
                    imageConsultation.contenu = null
                    imageConsultation.designation = null
                    imageConsultation.description = null
                }

                /*this.$swal.fire({ title: 'Confirmer ?', text: "Cette action est irréversible", icon: 'warning',

                    showCancelButton: true, confirmButtonColor: '#3085d6',  cancelButtonColor: '#d33', cancelButtonText: 'Annuler', confirmButtonText: 'Oui ,supprimer!'
        
                }).then((result) => {

                    if (result.isConfirmed) {
                        axios.delete(API_SUPPRIMER_DOCUMENT+this.produitLogementModel.imageConsultation.id).then((response) => {
                            if (response.status == 200) {   
                                this.$swal.fire('Supprimé!','Image de consultation supprimée avec succès.','success')
                                this.produitLogementModel.imageConsultation.contenu = null
                                this.produitLogementModel.imageConsultation.designation = null
                                this.produitLogementModel.imageConsultation.designation = null

                            }

                        }).catch((e) => {
                            this.$swal.fire({ icon: 'error',  title: 'Erreur...',text: e })
                        })
                    }
                }).catch((e) => {
                    this.$swal.fire({ icon: 'error', title: 'Erreur...',  text: e })
                })*/

            },


            // fonction permettant de recuperer le format du document (images ou videos)

            getFile(filePath) {
                return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
            },

            //SELECTION DES DOCUMENTS (IMAGE DE CONSULATION , IMAGE LIST)

            pickFile () {

                let input = this.$refs.fileInput
                let file = input.files
                var inputFile = document.getElementById('inputFile')
                var extension = inputFile.value.split('.')[1]
                this.produitLogementModel.imageConsultation.designation = this.getFile(inputFile.value);

                for (let i = 0; i < this.formatsList.length; i++) {
                    if (extension == this.formatsList[i].designation) {
                        this.produitLogementModel.imageConsultation.format.id = this.formatsList[i].id
                    }
                }

                if (file && file[0]) {
                    let reader = new FileReader
                    reader.onload = e => {
                        this.produitLogementModel.imageConsultation.contenu = e.target.result
                    }

                    reader.readAsDataURL(file[0])
                    this.$emit('input', file[0])
                }
            },

            selectImage(){
                this.$refs.fileInput.click()
            },


            getIntegerList(item) {
                var min = item.proprieteProduitLogement.minValueIntegerFiltre;
                var max = item.proprieteProduitLogement.maxValueIntegerFiltre;
                var containerList = [];

                for (var i = min; i <= max; i++) {
                    var valeur = {
                        index : null
                    }
                    valeur.index = i.toString() ;
                    containerList.push(valeur);
                }
                return containerList;
            },

            
            //RECUPERER LA LISTE DES REFERENCES TYPE LOGEMENT
            async getReferenceTypeLogement() {
                await axios.get(API_REFERENCES_PAR_FAMILLE("familleTypeLogement")).then((response) => {
                    this.referenceList = response.data.data;
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                });
            },


            // RECUPERER LA LISTE DES FORMATS DE DOCUMENTS DEPUIS LE MIDDLEWARE

            async getFormatsList(){
                await axios.get(API_OBTENIR_FORMATS_DOCUMENTS).then((response) => {
                    this.formatsList = response.data.data;
                }).catch((e) => {
                    this.errorMsg = e
                    $("alert-error").fadeIn();
                    setTimeout(function(){
                        $("alert-error").fadeOut(); 
                    }, 4000)
                });
            },

            // DEPUIS LE MIDDLEWARE RECUPERER LA LISTE DES VILLES

            async getVillesList() {
                await axios.get(API_OBTENIR_LISTE_VILLES).then((response) => {
                    this.villesList = response.data.data;
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                });
            },

            // RECUPERER DEPUIS LE MIDDLEWARE LA LISTE DES PROPRIÈTÉS PRODUITS LOGEMENT POUR LA CREATION DES CRARCTERISTIQUES DU PRODUIT LOGEMENT

            async serviceWebGetProprieteProduitLogementList() {

                try {
                    const resultats = await axios.get(API_OBTENIR_LISTE_PROPRIETES);

                    for (var i = 0; i < resultats.data.data.length; i++) {

                        var caracteristiq = {
                            proprieteProduitLogement: {},
                            valeurTexte: null,
                        };

                        caracteristiq.proprieteProduitLogement = resultats.data.data[i];
                        this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList.push(caracteristiq);

                        if (resultats.data.data[i].estObligatoire == true) {
                            this.caracteristiqueObligatoireList.push(caracteristiq);
                        } else if (resultats.data.data[i].estObligatoire == false && resultats.data.data[i].estUsuelleFiltre == true) {
                            this.caracteristiqueUsuelleList.push(caracteristiq);
                        } else{
                            this.caracteristiqueOptionelleList.push(caracteristiq);
                        }
                    }

                }catch (e) {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            },




            async serviceWebGetProprieteProduitLogementList2() {

                try {
                    const resultats = await axios.get(API_OBTENIR_LISTE_PROPRIETES);

                    for (var i = 0; i < resultats.data.data.length; i++) {
                        var caracteristiq = {
                            proprieteProduitLogement: {},
                            valeurTexte: null,
                        };

                        caracteristiq.proprieteProduitLogement = resultats.data.data[i];
                        this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList.push(caracteristiq);

                        if (resultats.data.data[i].type.id == 'ref.element.typeValeur.integer') {
                            this.caracteristiqueLogementNonDefinies.push(caracteristiq);
                        }

                        if (resultats.data.data[i].type.id == 'ref.element.typeValeur.double') {
                            this.caracteristiqueLogementNonDefinies.push(caracteristiq);
                        }
                    }
                } catch (e) {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                }
            },



            //OBTENIR LA LISTE DES PROGRAMMES IMMOBILIERS

            async getProgrammeImmobilierList() {
                await axios.get(API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER).then((response) => {
                    this.programmeImmobilierList = response.data.data;
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                });
            },



            // RECUPERER L'ETAT DE L'IMAGE DE CONSULATION EN MODIFICATION

            returnEtatImageConsultation(){
                return this.etatImageConsultation
            },


            
            // RECUPERER IMAGE DE CONSULTATION D'UN PRODUIT LOGEMENT

            async recupererImageConsultation(produitLogement){

                await axios.get(API_OBTENIR_IMAGE_CONSULTATION(produitLogement.id , "ref.element.typeValeur.imageConsultation"))
                .then((response) => {
                    if(response.data == "") {
                        return
                    }
                    else if(response.data != ""){
                        this.produitLogementModel.imageConsultation = response.data.data;
                        this.etatImageConsultation.designation = response.data.data.designation;
                        this.etatImageConsultation.contenu = response.data.data.contenu;
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                    }, 4000)
                });
            },



            //RECUPERATION DES METADATAS ET DES CONTENUS DES DOCUMENTS IMAGESLIST

            recupererMetadatasEtContenuDocumentImage(produitLogement){

                axios.get(API_OBTENIR_METADATAS_DOCUMENT(produitLogement.id , "ref.element.typeValeur.image"))
                .then((response)=>{

                    if (response.data.data.length == 0) {
                        this.produitLogementModel.imagesList = []
                    }else{
                        this.produitLogementModel.imagesList = response.data.data
                    }


                    if (this.produitLogementModel.imagesList.length != 0) {
                        this.produitLogementModel.imagesList.forEach(element => {
                            axios.get(API_OBTENIR_CONTENU_DOCUMENT(element.id)).then((result) => {
                                if (result.data.data != null) {
                                    element.contenu = result.data.data
                                }
                            }).catch((e) => {
                                this.errorMsg = e
                                $(".alert-error").fadeIn();
                                setTimeout(function(){
                                    $(".alert-error").fadeOut(); 
                                }, 4000)
                            })
                        });
                    }
                    
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();

                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                })
            },



            // RECUPERATION DES METADATAS ET DES DOCUMENTS VIDEOSLIST

            async recupererMetadatasEtContenuDocumentVideo(produitLogement){

                await axios.get(API_OBTENIR_METADATAS_DOCUMENT(produitLogement.id , "ref.element.typeValeur.video"))
                .then((response)=>{

                    if (response.data.data.length == 0 || response.data.data != null) {
                        this.produitLogementModel.videosList = response.data.data
                    }

                    if (this.produitLogementModel.videosList.length != 0) {
                        this.produitLogementModel.videosList.forEach(element => {
                            axios.get(API_OBTENIR_CONTENU_DOCUMENT(element.id)).then((result) => {
                                if (result.status == 200) {
                                    element.contenu = result.data.data
                                }
                            }).catch((e) => {
                                this.errorMsg = e
                                $(".alert-error").fadeIn();
                                setTimeout(function(){
                                    $(".alert-error").fadeOut(); 
                                }, 4000)
                            })
                        });
                    }
                }).catch((e) => {
                    this.errorMsg = e
                    $(".alert-error").fadeIn();
                    setTimeout(function(){
                        $(".alert-error").fadeOut(); 
                    }, 4000)
                })
            },




            // MODIFICATION D'UN PRODUIT LOGEMENT

            editingProduitLogementMode(){

                if (localStorage.getItem("product")) {

                    try {
                        const produitLogementSelected = JSON.parse(localStorage.getItem("product"));
                        const produitLogementSelectedCaracteristiqueList = produitLogementSelected.caracteristiqueProduitLogementList;
                        this.produitLogementModel.produitLogement.id = produitLogementSelected.id;
                        this.produitLogementModel.produitLogement.designation = produitLogementSelected.designation;
                        this.produitLogementModel.produitLogement.description = produitLogementSelected.description;
                        this.produitLogementModel.produitLogement.code = produitLogementSelected.code;
                        this.produitLogementModel.produitLogement.programmeImmobilier = produitLogementSelected.programmeImmobilier;
                        this.produitLogementModel.produitLogement.estActive = produitLogementSelected.estActive;
                        this.produitLogementModel.produitLogement.estValide = produitLogementSelected.estValide;
                        this.produitLogementModel.produitLogement.prix = produitLogementSelected.prix
                        this.produitLogementModel.produitLogement.version = produitLogementSelected.version;

                        axios.get(API_OBTENIR_LISTE_PROPRIETES).then((response) => {

                            response.data.data.forEach(element => {
                                var caracteristiq = {
                                    id: null,
                                    proprieteProduitLogement: {},
                                    valeurTexte: null,
                                    version: null,
                                };
                                caracteristiq.proprieteProduitLogement = element ;
                                this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList.push(caracteristiq);

                                produitLogementSelectedCaracteristiqueList.forEach(item => {
                                    if (caracteristiq.proprieteProduitLogement.id == item.proprieteProduitLogement.id) {
                                        caracteristiq = item ;
                                    }
                                });

                                if (caracteristiq.proprieteProduitLogement.estObligatoire == true){
                                    this.caracteristiqueObligatoireList.push(caracteristiq);
                                }

                                if(caracteristiq.proprieteProduitLogement.estObligatoire == false && caracteristiq.proprieteProduitLogement.estUsuelleFiltre == true){
                                    this.caracteristiqueUsuelleList.push(caracteristiq);
                                }

                                if (caracteristiq.proprieteProduitLogement.type.id == 'ref.element.typeValeur.integer'){
                                    this.caracteristiqueLogementNonDefinies.push(caracteristiq);
                                }


                                if(caracteristiq.proprieteProduitLogement.type.id == 'ref.element.typeValeur.double'){
                                    this.caracteristiqueLogementNonDefinies.push(caracteristiq);
                                } 

                                if(caracteristiq.valeurTexte == 'valeur.nonDefinie'){
                                    this.caracteristiqueLogementNonDefinies.push(caracteristiq)
                                }

                                else{
                                    this.caracteristiqueOptionelleList.push(caracteristiq);
                                }
                            });
                        }).catch((e) => {
                            console.log(e)
                        })
                        this.recupererImageConsultation(produitLogementSelected);
                        this.recupererMetadatasEtContenuDocumentImage(produitLogementSelected);
                        this.recupererMetadatasEtContenuDocumentVideo(produitLogementSelected);

                        localStorage.removeItem("product");
                    }catch (e) {
                        localStorage.removeItem("product");
                    }

                } else {
                    this.serviceWebGetProprieteProduitLogementList();
                    this.serviceWebGetProprieteProduitLogementList2()
                }
            }
        },

        computed:{
            // VERIFIER SI NOUS SOMMES EN CREATION OU EN MODIFICATION
            isCreation() {
                return this.produitLogementModel.produitLogement.id == null;
            },

            // GESTIONS DES CONTRAINTES DES CHAMPS D'ENTREES (DESIGNATION , DESCRIPTION ) DU PRODUIT LOGEMENT

            designationProduitLogementErrors(){
                const errors = [];
                if (!this.$v.produitLogementModel.produitLogement.designation.$dirty) return errors
                !this.$v.produitLogementModel.produitLogement.designation.maxLength && errors.push('La designation ne doit pas dépasser 600 caractères')
                !this.$v.produitLogementModel.produitLogement.designation.required && errors.push('La désignation est obligatoire.')
                !this.$v.produitLogementModel.produitLogement.designation.minLength && errors.push('La désignation doit avoir au minimum 8 caractères.')
                return errors
            },

            descriptionProduitLogementErrors(){
                const errors = [];
                if (!this.$v.produitLogementModel.produitLogement.description.$dirty) return errors
                !this.$v.produitLogementModel.produitLogement.description.maxLength && errors.push('La description ne doit pas dépasser 600 caractères')
                !this.$v.produitLogementModel.produitLogement.description.required && errors.push('La description est obligatoire.')
                !this.$v.produitLogementModel.produitLogement.description.minLength && errors.push('La description doit avoir plus de 20 caractères.')
                return errors 
            },

            programmeProduitLogementErrors(){
                const errors = [];
                if (!this.$v.produitLogementModel.produitLogement.programmeImmobilier.id.$dirty) return errors
                !this.$v.produitLogementModel.produitLogement.programmeImmobilier.id.required && errors.push('Vous devez rattacher un programme immobilier.')
                return errors 
            },

            codeProduitLogementErrors(){
                const errors = [];
                if (!this.$v.produitLogementModel.produitLogement.code.$dirty) return errors
                !this.$v.produitLogementModel.produitLogement.code.maxLength && errors.push('Le code ne doit pas dépasser 600 caractères')
                !this.$v.produitLogementModel.produitLogement.code.required && errors.push('Le code est obligatoire.')
                !this.$v.produitLogementModel.produitLogement.code.minLength && errors.push('Le code doit avoir plus de 20 caractères.')
                return errors 
            },

            prixProduitLogementErrors(){
                const errors = [];
                if (!this.$v.produitLogementModel.produitLogement.prix.$dirty) return errors
                !this.$v.produitLogementModel.produitLogement.prix.required && errors.push('Le prix du produit logement est obligatoire.')
                !this.$v.produitLogementModel.produitLogement.prix.numeric && errors.push('Entrer un montant correct') 
                return errors 
            },


            isValeurCaracteristiqueNonDefinis(){
                var valeurCaracteristiqueNonDefinis = []

                if (this.caracteristiqueOptionelleList.length > 0) {

                    for (let index = 0; index < this.caracteristiqueOptionelleList.length; index++) {
                        var caracteristiq = {
                            proprieteProduitLogement : {},
                            valeurTexte : null 
                        }
                        caracteristiq.proprieteProduitLogement = this.caracteristiqueOptionelleList[index].proprieteProduitLogement
                        caracteristiq.valeurTexte = this.caracteristiqueOptionelleList[index].valeurTexte
                    
                        if (caracteristiq.valeurTexte == null || caracteristiq.valeurTexte == "false") {
                            valeurCaracteristiqueNonDefinis.push(caracteristiq)
                        } 
                    }
                }
                return valeurCaracteristiqueNonDefinis ;
            }

        },

        mounted(){
            this.getProgrammeImmobilierList();
            this.getReferenceTypeLogement();
            this.getVillesList();
            this.getFormatsList();
            this.editingProduitLogementMode()
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


    .create_or_modify_title{
        color: #3867d6;
    }

    .section{
        font-weight: bold;
    }

    input[type=file]{
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        cursor: inherit;
        display: block;
    }

</style>