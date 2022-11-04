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
                                <v-text-field color="teal" :counter="10" label="Designation" required></v-text-field>
                            </v-col>
    
                            <v-col cols="6">
                                <v-text-field color="teal" :counter="10" label="Code" required></v-text-field>
                            </v-col>
    
                            <v-col cols="12">
                                <v-textarea  color="teal">
                                    <template v-slot:label><div>Description</div></template>
                                </v-textarea>
                            </v-col>

                            <v-col cols="6">
                                <v-select color="teal" label="Localisation" required></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>

                <p></p>

                <v-card elevation="3">
                    <v-row>
                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">CARACTERISTIQUES OBLIGATOIRES</span> 
                        </v-card-subtitle>
                    </v-row>
                </v-card>


                <v-card elevation="3">
                    <v-row>
                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">CARACTERISTIQUES USUELLES</span> 
                        </v-card-subtitle>
                    </v-row>
                </v-card>


                <v-card elevation="3">
                    <v-row>
                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">CARACTERISTIQUES OPTIONNELLES</span> 
                        </v-card-subtitle>
                    </v-row>

                </v-card>

                <v-card elevation="3">
                    <v-row>
                        <v-card-subtitle>
                            <v-icon>mdi-chevron-right</v-icon><span class="section">IMAGE DE CONSULTATION</span> 
                        </v-card-subtitle>
                    </v-row>
                </v-card>




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
 
    </v-app>

</template>

<script>
    export default {
        name: 'CreerModifierProduitLogement'
    }
</script>


<style scoped>

    .create_or_modify_title{
        color: #3867d6;
    }

    .section{
        font-weight: bold;
    }

</style>