<template>

    <v-app>

        <v-form>

            <v-card elevation="5">

                <v-card-title><span class="create_or_modify_title">CREER UN PRODUIT LOGEMENT</span> </v-card-title>

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
                                    <v-btn icon color="grey" @click="deleteImageConsultation"><v-icon>mdi-close</v-icon></v-btn>
                                    <v-img :src="produitLogementModel.imageConsultation.contenu" height="300px"></v-img>

                                    <v-card-subtitle>
                                        <v-text-field v-model="produitLogementModel.imageConsultation.designation" label="designation" :disabled="produitLogementModel.imageConsultation.contenu == null"></v-text-field>
                                    </v-card-subtitle>
                                    
                                </v-card>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>




                <v-card elevation="3">
                    <v-row>
                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">AUTRES IMAGES</span> 
                        </v-card-subtitle>
                    </v-row>
                </v-card>


                <v-card elevation="3">
                    <v-row>
                        <v-card-subtitle><v-icon>mdi-chevron-right</v-icon><span class="section">VIDÉOS</span> </v-card-subtitle>
                    </v-row>
                </v-card>

            </v-card>
        </v-form>

        <v-alert class="myalert alert-success" type="success" width="350px" dismissible>{{ successMsg }}</v-alert>
        <v-alert class="myalert alert-warning" type="warning" width="350px" dismissible>{{ warningMsg }}</v-alert>
        <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        <v-overlay :value="overlay"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
 
    </v-app>

</template>

<script>
import { required, minLength, maxLength , numeric  } from "vuelidate/lib/validators";
import { API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER , API_OBTENIR_LISTE_PROPRIETES , API_OBTENIR_LISTE_VILLES } from '../globalConfig/globalConfig';
import { API_OBTENIR_FORMATS_DOCUMENTS , API_REFERENCES_PAR_FAMILLE } from '../globalConfig/globalConfig';
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

            //SUPPRIMER UNE IMAGE DE CONSULTATION

            deleteImageConsultation(){

                if (this.isCreation) {
                    this.produitLogementModel.imageConsultation.contenu = null
                    this.produitLogementModel.imageConsultation.designation = null
                    this.produitLogementModel.imageConsultation.designation = null
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
                    containerList.push(i);
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

            async getProprieteProduitLogementList() {
                try {
                    const resultats = await axios.get(API_OBTENIR_LISTE_PROPRIETES);
                    for (var i = 0; i < resultats.data.data.length; i++) {

                        var caracteristiq = {
                            proprieteProduitLogement: {},
                            valeurTexte: null,
                        };

                        caracteristiq.proprieteProduitLogement = resultats.data.data[i];
                        this.produitLogementModel.produitLogement.caracteristiqueProduitLogementList.push(caracteristiq);
                        
                        if (resultats.data.data[i].type.id == 'ref.element.typeValeur.integer' || resultats.data.data[i].type.id == 'ref.element.typeValeur.double') {
                            this.caracteristiqueLogementNonDefinies.push(caracteristiq);
                        }

                        if (resultats.data.data[i].estObligatoire == true) {
                            this.caracteristiqueObligatoireList.push(caracteristiq);
                        } else if (resultats.data.data[i].estObligatoire == false && resultats.data.data[i].estUsuelleFiltre == true) {
                            this.caracteristiqueUsuelleList.push(caracteristiq);
                        }else{
                            this.caracteristiqueOptionelleList.push(caracteristiq);
                        }
                    }

                }catch (e) {
                    this.errorMsg = e
                    $("alert-error").fadeIn();
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
            this.getProprieteProduitLogementList();
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