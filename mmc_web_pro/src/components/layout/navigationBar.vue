<template>
    
    <div>

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
                        
                            <v-list-item link @click="$router.push({name : 'SelectionnerSimulationFinancementImmobilier'})">

                                <v-list-item-icon><v-icon>mdi-view-list</v-icon></v-list-item-icon>

                                <v-list-item-content><v-list-item-subtitle>MES SIMULATIONS </v-list-item-subtitle>

                                </v-list-item-content>

                            </v-list-item>

                            <v-list-item link @click="$router.push({name : 'SelectionnerDemandeReservationLogement'})">

                                <v-list-item-icon><v-icon>mdi-ticket</v-icon></v-list-item-icon>

                                <v-list-item-content><v-list-item-subtitle>MES RESERVATIONS LOGEMENTS</v-list-item-subtitle>

                                </v-list-item-content>

                            </v-list-item>

                            <v-list-item>

                                <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>

                                <v-btn text>Déconnexion</v-btn>

                            </v-list-item>

                        </v-list>

                    </v-card>

                </v-menu>

            </v-col>

        </v-app-bar>

    </div>

</template>

<script>
export default {
    name:"NavigationBar",
    data(){
        return{
            menu: false,
        }
    }
}
</script>