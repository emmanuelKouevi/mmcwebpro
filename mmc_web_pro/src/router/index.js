import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomePromoteur from '../views/HomePromoteur'

import CreerModifierProgrammeImmobilier from '../components/espace_promoteur/CreerModifierProgrammeImmobilier.vue'
import SelectionnerProgrammeImmobilier from '../components/espace_promoteur/SelectionnerProgrammeImmobilier.vue'
import SelectionnerProduitLogement from '../components/espace_promoteur/SelectionnerProduitLogement.vue'
import CreerModifierProduitLogement from '../components/espace_promoteur/CreerModifierProduitLogement'
import SelectionnerLogement from '../components/espace_promoteur/SelectionnerLogement'
import CreerModifierLogementUnitaire from '../components/espace_promoteur/CreerModifierLogementUnitaire'
import CreerModifierLogementEnSeries from '../components/espace_promoteur/CreerModifierLogementEnSeries'
import CreerModifierLogementListDiscrete from '../components/espace_promoteur/CreerModifierLogementListDiscrete'


import EspaceClient from '../components/espace_client/EspaceClient' 
import LogementDetail from '../components/espace_client/LogementDetail'
import CreerSimulationFinancementImmobilier from '../components/espace_client/simulationLogementFinancementImmobilier/CreerSimulationFinancementImmobilier'
import ModifierSimulationFinancementImmobilier from '../components/espace_client/simulationLogementFinancementImmobilier/ModifierSimulationFinancementImmobilier'
import SelectionnerSimulationFinancementImmobilier from '../components/espace_client/simulationLogementFinancementImmobilier/SelectionnerSimulationFinancementImmobilier'
import CreerModifierDemandeReservationLogement from '../components/espace_client/demandeReservationLogement/CreerModifierDemandeReservationLogement'
import SelectionnerDemandeReservationLogement from '../components/espace_client/demandeReservationLogement/SelectionnerDemandeReservationLogement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/HomePromoteur',
    name: 'HomePromoteur',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomePromoteur, 
    
    children : [

      {
        path: '/CreerModifierProgrammeImmobilier',
        name: 'CreerModifierProgrammeImmobilier',
        component: CreerModifierProgrammeImmobilier
      },

      {
        path: '/CreerModifierProduitLogement', 
        name: 'CreerModifierProduitLogement',
        component:CreerModifierProduitLogement
      },

      {
        path: '/SelectionnerProgrammeImmobilier', 
        name: 'SelectionnerProgrammeImmobilier',
        component:SelectionnerProgrammeImmobilier
      },

      {
        path: '/SelectionnerProduitLogement', 
        name: 'SelectionnerProduitLogement',
        component:SelectionnerProduitLogement
      },
      {
        path:'/SelectionnerLogement',
        name:'SelectionnerLogement',
        component: SelectionnerLogement
      },

    ]

    
  },


  {
    path:'/EspaceClient',
    name: 'EspaceClient',
    component:EspaceClient,

  },

  {
    path:'/LogementDetail/:id',
    name:'LogementDetail',
    component:LogementDetail,
  },

  {
    path:'/CreerSimulationFinancementImmobilier/:id',
    name:'CreerSimulationFinancementImmobilier',
    component:CreerSimulationFinancementImmobilier
  },
  {
    path:'/ModifierSimulationFinancementImmobilier',
    name:'ModifierSimulationFinancementImmobilier',
    component:ModifierSimulationFinancementImmobilier
  },

  {
    path:'/CreerModifierDemandeReservationLogement/:id',
    name:'CreerModifierDemandeReservationLogement',
    component:CreerModifierDemandeReservationLogement
  },

  {
    path: '/SelectionnerSimulationFinancementImmobilier',
    name: 'SelectionnerSimulationFinancementImmobilier',
    component: SelectionnerSimulationFinancementImmobilier
  },
  {
    path: '/SelectionnerDemandeReservationLogement',
    name: 'SelectionnerDemandeReservationLogement',
    component: SelectionnerDemandeReservationLogement
  },
  {
    path: '/CreerModifierLogementUnitaire',
    name: 'CreerModifierLogementUnitaire',
    component:CreerModifierLogementUnitaire
  },
  {
    path: '/CreerModifierLogementEnSeries',
    name: 'CreerModifierLogementEnSeries',
    component:CreerModifierLogementEnSeries,
  },
  {
    path: '/CreerModifierLogementListDiscrete',
    name: 'CreerModifierLogementListDiscrete',
    component: CreerModifierLogementListDiscrete 
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
