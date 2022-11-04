// URL UTILISER POUR ACCEDER AUX END_POINTS

export const BASE_URL = "http://10.153.103.001:8080/mmc/api/";


/* ---------CONSTATNTES CONCERNANT LES LOGEMENTS ------------------- */

// Recherche de logement par MOt clé

export const API_RECHERCHER_LOGEMENT_PAR_MOT_CLE = (mot_clé) => {

    return `${BASE_URL}logements/motcle/${mot_clé}`

}


// Creation de logement 

export const API_CREER_LOGEMENT = `${BASE_URL}logements`


// Modification d'un logement

export const API_MODIFIER_LOGEMENT = `${BASE_URL}logements`


// Activation d'un logement

export const API_ACTIVER_LOGEMENT = (logement_id) => {

    return `${BASE_URL}logements/${logement_id}/activer`

}

// Désactivation d'un logement

export const API_DESACTIVER_LOGEMENT = (logement_id) => {

    return `${BASE_URL}logements/${logement_id}/desactiver`

}

// Suppression d'un logement

export const API_SUPPRIMER_LOGEMENT_PAR_ID = (logement_id) => {

    return `${BASE_URL}logements/${logement_id}`

}

// Rechercher Logement par id (Promoteur)

export const API_OBTENIR_LISTE_LOGEMENT_PAR_PROMOTEUR = (promoteur_id) => {

    return `${BASE_URL}logements/promoteur/${promoteur_id}`

}

// Rechercher Logement par id 

export const API_RECHERCHER_LOGEMENT_PAR_ID = (logement_id) => {

    return `${BASE_URL}logements/${logement_id}`

}

/*  ------- CONSTANTES CONCERNANT LES PRODUITS LOGEMENTS ---------- */

export const API_OBTENIR_LISTE_PRODUIT_LOGEMENT_CREER = `${BASE_URL}produitlogements`

export const API_MODIFIER_CONTENU_IMAGE_CONSULTATION = `${BASE_URL}documents/updatecontent`

export const API_MODIFIER_METADATAS_IMAGE_CONSULTATION = `${BASE_URL}documents/updatemetadata`

export const API_AJOUTER_DOCUMENT = `${BASE_URL}documents/appendentitydocument`

export const API_MODIFIER_METADATAS_DOCUMENT = `${BASE_URL}documents/updatemetadata`

export const API_MODIFIER_CONTENU_DOCUMENT = `${BASE_URL}documents/updatecontent`

export const API_SUPPRIMER_DOCUMENT = `${BASE_URL}produitlogementdocuments/`

export const API_CREER_PRODUIT_LOGEMENT = `${BASE_URL}produitlogements`

export const API_MODIFIER_PRODUIT_LOGEMENT = `${BASE_URL}produitlogements`

export const API_OBTENIR_LISTE_PROPRIETES = `${BASE_URL}proprietes`

export const API_OBTENIR_LISTE_OPERATEUR_CRITERE = `${BASE_URL}operateurcriteres`

export const API_RECHERCHER_PRODUIT_LOGEMENT_PAR_CRITERELIST = `${BASE_URL}produitlogements/critereList`

export const API_VALIDER_PRODUIT_LOGEMENT = (id) => {

    return `${BASE_URL}produitlogements/${id}/valider`

}

export const API_REFERENCES_PAR_FAMILLE = (id) => {

    return `${BASE_URL}references/parfamille/${id}`

}

export const API_OBTENIR_LISTE_VILLES = `${BASE_URL}villes`

export const API_OBTENIR_LISTE_PAYS = `${BASE_URL}pays`

export const API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER = `${BASE_URL}programmeimmobiliers`

export const API_OBTENIR_FORMATS_DOCUMENTS = `${BASE_URL}documents/formats`

export const API_OBTENIR_IMAGE_CONSULTATION = (id , type) => {

    return `${BASE_URL}produitlogementdocuments/imageConsultation?idProduitLogement=${id}&typeDocument=${type}`

}

export const API_OBTENIR_METADATAS_DOCUMENT = (id , type) => {

    return `${BASE_URL}produitlogementdocuments/?idProduitLogement=${id}&typeDocument=${type}`

}

export const API_OBTENIR_CONTENU_DOCUMENT = (id) => {

    return `${BASE_URL}documents/${id}/content`

}

export const API_ACTIVER_PRODUIT_LOGEMENT = (id) => {

    return `${BASE_URL}produitlogements/${id}/activer`

}

export const API_DESACTIVER_PRODUIT_LOGEMENT = (id) => {

    return `${BASE_URL}produitlogements/${id}/desactiver`

}

export const API_SUPPRIMER_PRODUIT_LOGEMENT_PAR_ID = (id) => {

    return `${BASE_URL}produitlogements/${id}`

}

export const API_OBTENIR_PRODUIT_LOGEMENT_PAR_ID = (id) => {

    return `${BASE_URL}produitlogements/${id}`

}

export const API_OBTENIR_LISTE_PRODUIT_LOGEMENT_PAR_PROMOTEUR = (promoteur_id) => {

    return `${BASE_URL}produitlogements/promoteur/${promoteur_id}`

}



/* Les types Reference */

export const REF_ELEMENT_TYPEVALEUR_STRING = "ref.element.typeValeur.string"

export const REF_ELEMENT_TYPEVALEUR_TIME = "ref.element.typeValeur.time"

export const REF_ELEMENT_TYPEVALEUR_DATE = "ref.element.typeValeur.date"

export const REF_ELEMENT_TYPEVALEUR_DATETIME = "ref.element.typeValeur.datetime"

export const REF_ELEMENT_TYPEVALEUR_REFERENCE = "ref.element.typeValeur.reference"

export const REF_ELEMENT_TYPEVALEUR_VILLE = "ref.element.typeValeur.ville"

export const REF_ELEMENT_TYPEVALEUR_DOUBLE = "ref.element.typeValeur.double"

export const REF_ELEMENT_TYPEVALEUR_FLOAT = "ref.element.typeValeur.double"

export const REF_ELEMENT_TYPEVALEUR_INTEGER = "ref.element.typeValeur.integer"

export const REF_ELEMENT_TYPEVALEUR_BOOLEAN = "ref.element.typeValeur.boolean"


/* Les ID (operateur critere) */
  
export const REF_CRITERE_OPERATEUR_BETWEEN = "ref.critere.operateur.Between" ;

export  const REF_CRITERE_OPERATEUR_IN = "ref.critere.operateur.In" ;

export  const REF_CRITERE_OPERATEUR_SUPERIEUR = "ref.critere.operateur.Superieur" ;

export  const REF_CRITERE_OPERATEUR_INFERIEUR = "ref.critere.operateur.Inferieur" ;

export  const REF_CRITERE_OPERATEUR_INFERIEUR_EGALE = "ref.critere.operateur.InferieurEgale" ;

export  const REF_CRITERE_OPERATEUR_SUPERIEUR_EGALE = "ref.critere.operateur.SuperieurEgale" ;

export  const REF_CRITERE_OPERATEUR_EGALE = "ref.critere.operateur.Egale" ;





/* ------------- CONSTANTES CONCERNANT LES PROGRAMMES IMMOBILIERS ----------------- */

export const API_CREER_PROGRAMME_IMMOBILIER = `${BASE_URL}programmeimmobiliers`

export const API_MODIFIER_PROGRAMME_IMMOBILIER = API_CREER_PROGRAMME_IMMOBILIER

export const API_OBTENIR_TYPE_FINANCEMENT = `${BASE_URL}typeFinancements`

export const API_OBTENIR_LISTE_EFIS = `${BASE_URL}efis`

export const API_OBTENIR_LISTE_TIERS_COLLECTEURS= `${BASE_URL}tierscollecteurs`


// Valider un programme immobilier par id

export const API_VALIDER_PROGRAMME_IMMOBILIER = (programme_id) => {

    return `${BASE_URL}programmeimmobiliers/${programme_id}/valider`

}

// Récupérer un programme immobilier par id

export const API_RECUPERER_PROGRAMME_IMMOBILIER_PAR_ID = (programme_id) => {

    return `${BASE_URL}programmeimmobiliers/${programme_id}`

}



export const API_SUPPRIMER_PROGRAMME_IMMOBILIER_DOCUMENT = (document_id) => {

    return `${BASE_URL}programmeImmobilierDocuments/${document_id}`

}

export const API_SUPPRIMER_PROGRAMME_IMMOBILIER_MODE_FINANCEMENT = (mode_id) => {

    return `${BASE_URL}modefinancements/${mode_id}`

}

export const API_OBTENIR_MODE_FINANCEMENT_PAR_PROGRAMME_IMMOBILIER = (programme_immobilier_id) => {

    return `${BASE_URL}modefinancements/programmeImmobilier/${programme_immobilier_id}`

}

export const API_OBTENIR_METADATAS_DOCUMENT_PROGRAMME_IMMOBILIER = (programme_immobilier_id , type) => {

    return `${BASE_URL}programmeImmobilierDocuments/?idProgrammeImmobilier=${programme_immobilier_id}&typeDocument=${type}`

}

export const API_OBTENIR_CONTENU_DOCUMENT_PROGRAMME_IMMOBILIER = (document_id) => {

    return `${BASE_URL}documents/${document_id}/content`

}

export const API_SUPPRIMER_PROGRAMME_IMMOBILIER = (programme_id) => {

    return `${BASE_URL}programmeimmobiliers/${programme_id}`

}

export const API_OBTENIR_LISTE_PROGRAMME_IMMOBILIER_PAR_PROMOTEUR = (promoteur_id) => {

    return `${BASE_URL}programmeimmobiliers/promoteur/${promoteur_id}`

}



/* Les Types */

export const REF_ELEMENT_VALEUR_COMPTANT = "ref.element.valeur.comptant"

export const REF_ELEMENT_VALEUR_COMPTANT_SUR_SITUATION = "ref.element.valeur.comptantsursituation"

export const REF_ELEMENT_VALEUR_CREDIT_BANCAIRE = "ref.element.valeur.creditbancaire"

export const REF_ELEMENT_VALEUR_TIERS_COLLECTEUR = "ref.element.valeur.tierscollecteur"

export const REF_ELEMENT_VALEUR_TEMPERAMENT = "ref.element.valeur.temperament"


/* ------------- CONSTANTES CONCERNANT LES MODES DE FINANCEMENT (CREDIT BANCAIRE) ----------------- */

export const API_CREER_MODE_FINANCEMENT = `${BASE_URL}modefinancements`

export const API_MODIFIER_MODE_FINANCEMENT = API_CREER_MODE_FINANCEMENT

export const API_VALIDER_CREDIT_BANCAIRE = (credit_bancaire_id) => {

    return `${BASE_URL}creditbancaires/${credit_bancaire_id}/valider`

}

export const API_OBTENIR_LISTE_CREDIT_BANCAIRE_PAR_EFI = (efi_id) => {

    return `${BASE_URL}modefinancements/${efi_id}/efi`

}

/* ------------- CONSTANTES POUR LES OUVERTURES DE COMPTES ----------------- */

export const API_CREER_MODIFIER_COMPTE_UTILISATEUR = `${BASE_URL}users`


// API pour la verification de l'email de l'utilisateur voulant créer son compte

export const API_ENVOYER_CODE_CONFIRMATION = (code_confirmation) => {
   
    return `${BASE_URL}users/${code_confirmation}/confirmer`

}

// API pour la creation du compte organisateur promoteur / Efi enclancher par le gestionnaire de la plateforme


export const API_CREER_COMPTE_ORGANISATION_PROMOTEUR = `${BASE_URL}promoteurs`

export const API_CREER_COMPTE_ORGANISATION_EFI = `${BASE_URL}efis`



/* ------------- CONSTANTES CONCERNANT LES TIERS FOURNISSEURS (FACEBOOK , GMAIL) ET LES AUTHENTIFICATIONS ----------------- */

export const API_AUTHENTIFICATION_FACEBOOK = `${BASE_URL}fournisseurs/loginFaceBook`

export const API_AUTHENTIFICATION_GOOGLE = `${BASE_URL}fournisseurs/loginGoogle`

export const API_SESSION_LOGIN_PARAMS_CONNEXION = `${BASE_URL}session/login`


// API pour la regeneration d'un mot de passe (mot de passe oublié)

export const API_REGENERER_MOT_DE_PASSE = (email) => {
   
    return `${BASE_URL}users/${email}/genererMotDePasse`

}

// API pour le changement de mot de passe

export const API_CHANGER_MOT_DE_PASSE = (current_password , new_password) => {

    return `${BASE_URL}users/modifierMotDePasseCompteUser/?currentPassWord=${current_password}&newPassWord=${new_password}`

}



/* -------------------------CONSTANTES CONCERNANT LES ORGANISATIONS --------------------------- */


// API pour récupérer la liste des promoteurs

export const API_OBTENIR_LISTE_DES_PROMOTEURS = `${BASE_URL}promoteurs`


// API pour la modification d'un compte organisation promoteur (modification du compte faite par le promoteur)

export const API_MODIFIER_COMPTE_ORGANISATION_PROMOTEUR = `${BASE_URL}promoteurs`


// API pour la modification d'un compte organisation promoteur (modification du compte faite par le gestionnaire de la plateforme)

export const API_MODIFIER_COMPTE_ORGANISATION_PROMOTEUR_ADMIN = `${BASE_URL}promoteurs/modifierUnComptePromoteur`


// API pour la modification d'un compte organisation efi (modification du compte faite par l'efi)

export const API_MODIFIER_COMPTE_ORGANISATION_EFI = `${BASE_URL}efis`


// API pour la modification d'un compte organisation promoteur (modification du compte faite par le gestionnaire de la plateforme)

export const API_MODIFIER_COMPTE_ORGANISATION_EFI_ADMIN = `${BASE_URL}promoteurs/modifierUnCompteEfi`


// API pour récupérer la liste des Efis

export const API_OBTENIR_LISTE_DES_EFIS = `${BASE_URL}efis`

// API pour l'activation d'un compte organisation Efi

export const API_ACTIVER_COMPTE_ORGANISATION_EFI = (efi_organisation_id) => {
   
    return `${BASE_URL}efis/${efi_organisation_id}/activer`

}

// API pour la desactivation d'un compte organisation Efi

export const API_DESACTIVER_COMPTE_ORGANISATION_EFI = (efi_organisation_id) => {
   
    return `${BASE_URL}efis/${efi_organisation_id}/desactiver`

}

// API pour la suppression d'un compte organisation Efi (Opération faite par l'administrateur de la plateforme)

export const API_SUPPRIMER_COMPTE_ORGANISATION_EFI = (efi_organisation_id) => {
   
    return `${BASE_URL}efis/${efi_organisation_id}`

}

// API pour l'activation d'un compte organisation Promoteur

export const API_ACTIVER_COMPTE_ORGANISATION_PROMOTEUR = (promoteur_organisation_id) => {
   
    return `${BASE_URL}promoteurs/${promoteur_organisation_id}/activer`

}

// API pour la desactivation d'un compte organisation Promoteur

export const API_DESACTIVER_COMPTE_ORGANISATION_PROMOTEUR = (promoteur_organisation_id) => {
   
    return `${BASE_URL}promoteurs/${promoteur_organisation_id}/desactiver`

}

// API pour la suppression d'un compte organisation promoteur

export const API_SUPPRIMER_COMPTE_ORGANISATION_PROMOTEUR = (promoteur_organisation_id) => {
   
    return `${BASE_URL}promoteurs/${promoteur_organisation_id}`

}


/* -------------------------CONSTANTES CONCERNANT LES CARACTERISTIQUES DE DEMANDES DE RESERVATIONS --------------------------- */

// Associer des caracteristiques de demande de reservation logement à un programme immobilier

export const API_ASSOCIER_CARACTERISTIQUE_DEMANDE_RESERVATION_LOGEMENT = `${BASE_URL}associercaracteristiquesdemandereservationlogement`

export const API_MODIFICATION_CARACTERISTIQUE_DEMANDE_RESERVATION_LOGEMENT = `${BASE_URL}associercaracteristiquesdemandereservationlogement`


// Associer des documents de demande de reservation logement à un programme immobilier 

export const API_ASSOCIER_DOCUMENT_DEMANDE_RESERVATION_LOGEMENT = `${BASE_URL}associertypesdocumentsdemandereservationlogement`

export const API_MODIFICATION_DOCUMENT_DEMANDE_RESERVATION_LOGEMENT = `${BASE_URL}associertypesdocumentsdemandereservationlogement`


// API pour obtenir la liste des caractéristiques de demande de reservation par programme immobilier

export const API_OBTENIR_LISTE_CARACTERISTIQUES_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER = (programme_immobilier_code) => {
   
    return `${BASE_URL}caracteristiquesdemandereservationlogement/${programme_immobilier_code}`

}

// API pour obtenir la liste des types de documents de demande de reservation par programme immobilier

export const API_OBTENIR_LISTE_TYPES_DOCUMENT_DEMANDE_RESERVATION_PAR_PROGRAMME_IMMOBILIER = (programme_immobilier_code) => {
   
    return `${BASE_URL}typesdocumentsdemandereservationlogement/${programme_immobilier_code}`

}

/* -------------------------CONSTANTES CONCERNANT LES SIMULATIONS DE FINANCEMENTS --------------------------- */


export const API_CREER_SIMULATION_FINANCEMENT_IMMOBILIER = `${BASE_URL}simulationfinancementimmobiliers`

export const API_MODIFIER_SIMULATION_FINANCEMENT_IMMOBILIER = `${BASE_URL}simulationfinancementimmobiliers`


//Rechercher Simulation par id
export const API_RECHERCHER_SIMULATION_FINANCEMENT_PAR_ID = (simulation_id) => {
    return `${BASE_URL}simulationfinancementimmobiliers/${simulation_id}`
}

//Obtenir la liste des simulations par utilisateur
export const API_OBTENIR_LISTE_SIMULATION_FINANCEMENT_PAR_USER = (user_id) => {
    return `${BASE_URL}simulationfinancementimmobiliers/user/${user_id}`
}

//Supprimer une simulation de financement
export const API_SUPPRIMER_SIMULATION_FINANCEMENT_PAR_ID = (simulation_id) => {
    return `${BASE_URL}simulationfinancementimmobiliers/${simulation_id}`
}

// Executer une simulation 
export const API_EXECUTER_SIMULATION_FINANCEMENT_PAR_ID = (simulation_id) => {
    return `${BASE_URL}simulationfinancementimmobiliers/${simulation_id}/executer`
}


// Transformer une simulation en demande reservation
export const API_TRANSFORMER_SIMULATION_EN_DEMANDE = (simulation_id) => {
    return `${BASE_URL}demandereservationlogements/simulation/${simulation_id}`
}



/* -------------------------CONSTANTES CONCERNANT LES DEMANDES DE RESERVATIONS --------------------------- */

export const API_CREER_DEMANDE_RESERVATION_LOGEMENT = `${BASE_URL}demandereservationlogements`

export const API_MODIFIER_DEMANDE_RESERVATION_LOGEMENT = `${BASE_URL}demandereservationlogements`

//Obtenir la liste des demandes de reservations par utilisateur
export const API_OBTENIR_LISTE_DEMANDE_RESERVATION_PAR_USER = (user_id) => {
    return `${BASE_URL}demandereservationlogements/user/${user_id}`
}

//Rechercher une demande de reservation par id
export const API_RECHERCHER_DEMANDE_RESERVATION_PAR_ID= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/${demandeReservation_id}`
}

//Obtenir supprimer une demande de reservation par id
export const API_SUPPRIMER_DEMANDE_RESERVATION_PAR_ID= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/${demandeReservation_id}`
}


//Acceptation d'une demande de reservation par promoteur
export const API_ACCEPTER_DEMANDE_RESERVATION_PROMOTEUR_PAR_ID= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/accepterpromoteur/${demandeReservation_id}`
}

//Refus d'une demande de reservation par promoteur
export const API_REFUSER_DEMANDE_RESERVATION_PROMOTEUR_PAR_ID= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/refuserpromoteur/${demandeReservation_id}`
}

//Acceptation d'une demande de reservation par promoteur
export const API_ACCEPTER_DEMANDE_RESERVATION_EFI_PAR_ID= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/accepterefi/${demandeReservation_id}`
}

//Refus d'une demande de reservation par promoteur
export const API_REFUSER_DEMANDE_RESERVATION_EFI_PAR_ID= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/refuserefi/${demandeReservation_id}`
}

//Soumission d'une demande de reservation
export const API_SOUMETTRE_DEMANDE_RESERVATION= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/soumettre/${demandeReservation_id}`
}

//Annulation d'une demande de reservation
export const API_ANNULER_DEMANDE_RESERVATION= (demandeReservation_id) => {
    return `${BASE_URL}demandereservationlogements/annuler/${demandeReservation_id}`
}