<template>

  <div>

    <v-app>

      <v-navigation-drawer app v-model="drawer">

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">MMC</v-list-item-title>
            <v-list-item-subtitle>MA MAISON.COM</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>TABLEAU DE BORD</v-list-item-title>
          </v-list-item>

  
          <v-list-group :value="false" prepend-icon="mdi-domain">
            <template v-slot:activator>
              <v-list-item-title>BIENS IMMOBILIERS</v-list-item-title>
            </template>
            
  
            <v-list-group :value="false" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content><v-list-item-title>Programme Immobiliers</v-list-item-title></v-list-item-content>
              </template>
    
              <v-list-item v-for="([title, icon , navigation], i) in programmeImmobilierSection" :key="i" link>
                <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
                <v-list-item-icon><v-icon v-text="icon"></v-icon></v-list-item-icon>
              </v-list-item>
            </v-list-group>


            <v-list-group :value="false" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content><v-list-item-title>Produits Logements</v-list-item-title></v-list-item-content>
              </template>

    
              <v-list-item v-for="([title, icon , navigation ], i) in produitLogementSection" :key="i" link>
                <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
                <v-list-item-icon><v-icon v-text="icon"></v-icon></v-list-item-icon>
              </v-list-item>
            </v-list-group>



            <v-list-group :value="true" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content><v-list-item-title>Logements</v-list-item-title></v-list-item-content>
              </template>
    
              <v-list-item v-for="([title, icon , navigation], i) in logementSection" :key="i" link>
                <v-list-item-title v-text="title" @click="$router.push({path:navigation}).catch(() => {})"></v-list-item-title>
                <v-list-item-icon><v-icon v-text="icon"></v-icon></v-list-item-icon>
              </v-list-item>
            </v-list-group>

          </v-list-group>


          <v-list-item link>
            <v-list-item-icon><v-icon>mdi-ticket-account</v-icon></v-list-item-icon>
            <v-list-item-title>CONTRAT DE RESERVATIONS</v-list-item-title>
          </v-list-item>


          <v-list-item link>
            <v-list-item-icon><v-icon>mdi-attachment</v-icon></v-list-item-icon>           
            <v-list-item-title>ASSOCIER DES CARACTERISTIQUES</v-list-item-title>
          </v-list-item>
        </v-list>
                
      </v-navigation-drawer>


      <v-app-bar app>

        <v-app-bar-nav-icon @click="drawer= !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>SILICON WISE</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo" text dark v-bind="attrs" v-on="on">Mon profil <v-icon>mdi-menu-down</v-icon></v-btn>
          </template>
  
          <v-card>

            <v-list>

              <v-list-item>

                <v-list-item-avatar><img src="../assets/kouevi_photo.jpg"></v-list-item-avatar>

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
  
      </v-app-bar>
 
            
      <!-- Sizes your content based upon application components -->

      <v-main>

        <!-- Provides the application the proper gutter -->

        <v-container fluid>
          <router-view></router-view>
        </v-container>

      </v-main>


      <v-footer app>

        <!-- -->
                    
      </v-footer>

    </v-app>

  </div>

</template>

<script>

  export default {
        
    data(){
      return{
        drawer: null,
        menu: false,
        programmeImmobilierSection: [
          ['Nouveau', 'mdi-plus-outline' , '/CreerModifierProgrammeImmobilier'],
          ['Gérer', 'mdi-cog-outline' , '/SelectionnerProgrammeImmobilier'],
        ],
        produitLogementSection: [
          ['Nouveau', 'mdi-plus-outline' , '/CreerModifierProduitLogement'],
          ['Gérer', 'mdi-cog-outline' , '/SelectionnerProduitLogement'],
        ],
        logementSection: [
          ['Nouveau' , 'mdi-plus-outline' , '' ],
          ['Gérer' , 'mdi-cog-outline' , '/SelectionnerLogement'],
        ],
      }
    }
  }
</script>

<style scoped>


</style>