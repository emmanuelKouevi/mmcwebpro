<template>

  <div>

    <v-app-bar app color="transparent" elevation="0" dark>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>

      <v-container>

        <v-row>

          <v-col>

            <v-card elevation="2" class="mx-auto">

              <v-card-title>ESPACE CLIENT</v-card-title>

              <v-card-subtitle> Espace Client</v-card-subtitle>

              <v-card-subtitle>

                Vous recherchez ou souhaiter acquerir un logement de qualité avec des offres exceptionnelles  .

              </v-card-subtitle>

              <v-card-actions>

                <v-btn color="primary lighten-2" text @click="$router.push({path:'/EspaceClient'})"> 
                  
                  ACCÉDER <v-icon right>mdi-arrow-right</v-icon>  
                  
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

          <v-col>

            <v-card elevation="2" class="mx-auto">

              <v-card-title>ADMINISTRATEUR</v-card-title>

              <v-card-subtitle> Espace Administrateur</v-card-subtitle>

              <v-card-subtitle>

                Spécifiquement pour l'Administrateur de la plateforme.

              </v-card-subtitle>

              <v-card-actions>

                <v-btn color="primary lighten-2" text> 
                  
                  ACCÉDER <v-icon right>mdi-arrow-right</v-icon>  
                  
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

          <v-col>

            <v-card elevation="2" class="mx-auto">

              <v-card-title>ESPACE EFI</v-card-title>

              <v-card-subtitle> Etablissement Financier</v-card-subtitle>

              <v-card-subtitle>

                Vous êtes un établissement financier et vous aimerez soutenir des promoteurs ou des

                acquereurs de biens par des operations bancaires.

              </v-card-subtitle>

              <v-card-actions>

                <v-btn color="primary lighten-2" text> 
                  
                  ACCÉDER <v-icon right>mdi-arrow-right</v-icon>  
                  
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

          <v-col>

            <v-card elevation="2">

              <v-card-title>ESPACE PROMOTEUR</v-card-title>

              <v-card-subtitle> Espace Promoteur</v-card-subtitle>

              <v-card-subtitle>

                Vous êtes un promoteur et vous souhaitez créer des propriétés immobiliers (logements) 
                
                et les poster au grand public.

              </v-card-subtitle>

              <v-card-actions>

                <v-btn color="primary lighten-2" text @click="$router.push({path:'/HomePromoteur'})"> 
                  
                  ACCÉDER
                  
                  <v-icon right>mdi-arrow-right</v-icon>
                    
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

      </v-container>

    </v-main>

  </div>

</template>

<script>


export default {

  name: 'Home',

}
</script>
