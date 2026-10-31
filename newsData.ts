import { NewsArticle } from './types';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '19',
    title: 'Nouveautés LPPR & Grand Changement (Septembre 2026) : INVACARE devient DHCARE !',
    date: '08 Septembre 2026',
    content: 'Découvrez les actualités majeures de la rentrée : l\'ajout de nouveaux fauteuils et scooters au remboursement CPAM (Otto Bock, Sunrise Medical, Pride, Sungo) et l\'évolution historique du distributeur Invacare Poirier France qui devient DHCARE.',
    fullContent: `
      <div class="space-y-4">
        <p>Le mois de Septembre 2026 est marqué par une actualité industrielle majeure ainsi que par l'enrichissement de la Liste des Produits et Prestations Remboursables (LPPR) avec de nouvelles références de poids.</p>
        
        <h4 class="font-bold text-slate-900">Événement distributeur : Invacare Poirier devient DHCARE</h4>
        <p>C'est le changement marquant de cette rentrée : l'historique distributeur <strong>INVACARE POIRIER FRANCE</strong> fait évoluer son identité et devient officiellement <strong>DHCARE</strong>. Une nouvelle étape pour ce grand nom du matériel médical, assurant la continuité des gammes et des services.</p>
        
        <h4 class="font-bold text-slate-900">Nouveaux dispositifs pris en charge par la CPAM :</h4>
        
        <p class="font-semibold text-slate-800 mb-1">Fauteuils Roulants Manuels Confort & Actifs (Catégorie FRMC) :</p>
        <ul class="list-disc pl-5 space-y-1 mb-3">
          <li><strong>OTTO BOCK FRANCE :</strong> Entrée au remboursement du modèle pédiatrique/adolescent <strong>Avantgarde Teen 2</strong> ainsi que de sa déclinaison <strong>Avantgarde Teen 2 VR</strong> (Code LPPR 4594077).</li>
          <li><strong>SUNRISE MEDICAL FRANCE :</strong> Prise en charge officielle du nouveau fauteuil actif pliant ultra-léger <strong>QS3 X</strong> (Code LPPR 4594077).</li>
        </ul>
        
        <p class="font-semibold text-slate-800 mb-1">Scooters Modulaires - Classe C (Catégorie SCO-C) :</p>
        <ul class="list-disc pl-5 space-y-1 mb-3">
          <li><strong>PRIDE MOBILITY PRODUCTS FRANCE :</strong> Le scooter d'extérieur compact <strong>Colt Plus</strong> rejoint la liste des dispositifs remboursés (Code LPPR 4568000).</li>
        </ul>
        
        <p class="font-semibold text-slate-800 mb-1">Fauteuils Roulants Électriques (Catégories FRE-A) :</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>SUNGO EUROPE / WISETON INDUSTRIES :</strong> Le modèle <strong>Wizemed C100</strong>, désormais pris en charge en classe A (Code LPPR 4544777).</li>
        </ul>
        
        <p class="italic text-sm text-slate-600 mt-4">Retrouvez l'ensemble de ces nouvelles fiches techniques et codes LPPR à jour directement sur Assistant-Ergo.</p>
      </div>
    `,
    imageUrl: 'https://wizemed.com/uploads/image/20260403/pic42_1775202619.jpg',
    hashtags: ['DHCARE', 'Invacare', 'LPPR', 'CPAM', 'OttoBock', 'SunriseMedical', 'PrideMobility', 'Wizemed'],
    linkedinUrl: 'https://www.linkedin.com/company/wizemed-medical/posts/?feedView=all',
    internalLink: {
      type: 'MODEL',
      id: 'nouveautes-septembre-2026',
      label: 'Voir les nouveautés de Septembre 2026',
      categoryId: 'electrique',
      subCategoryId: 'FRE',
      brandId: 'sungo europe'
    }
},
  {
    id: '18',
    title: 'Mises à jour LPPR (Août) : Prise en charge CPAM pour le scooter Eon et la poussette Corzino !',
    date: '18 Août 2026',
    content: 'Découvrez les nouveautés de l’été inscrites à la prise en charge Assurance Maladie : la poussette-canne Corzino de PATRON BOHEMIA (distribuée par CREE) et le scooter modulaire Eon de VERMEIREN.',
    fullContent: `
      <div class="space-y-4">
        <p>Le mois d'Août apporte de nouvelles opportunités de prise en charge pour les utilisateurs et les professionnels de santé. Deux catégories clés voient arriver des produits reconnus pour leur qualité et leur praticité.</p>
        
        <h4 class="font-bold text-slate-900">Poussettes Standards (Catégorie POU_S) :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>PATRON BOHEMIA – Corzino (Distribuée par CREE FRANCE) :</strong> Cette poussette à châssis pliant (type canne), fabriquée en République Tchèque, rejoint la catégorie POU_S. Conçue pour les enfants et adolescents à besoins spécifiques, la gamme Corzino se distingue par sa grande robustesse (capacité jusqu'à 75 kg selon les tailles), son pliage ergonomique et son dossier inclinable. Elle constitue une réponse idéale pour les déplacements quotidiens.</li>
        </ul>
        
        <h4 class="font-bold text-slate-900">Scooters Modulaires - Classe B (Catégorie SCO) :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>NV VERMEIREN GROUP – Eon (Distribué par VERMEIREN FRANCE) :</strong> Le nouveau scooter modulaire Eon fait son entrée officielle dans la liste des dispositifs pris en charge. Récompensé pour son design moderne et épuré, l'Eon offre un excellent compromis entre autonomie, sécurité (éclairage LED complet) et maniabilité pour une utilisation urbaine et péri-urbaine.</li>
        </ul>
        
        <p>Ces ajouts à la liste des Produits et Prestations Remboursables (LPPR) permettent d'élargir le choix pour les prescriptions pédiatriques et les besoins de mobilité extérieure pris en charge.</p>
        
        <p class="italic text-sm text-slate-600">Retrouvez les fiches techniques complètes de ces deux dispositifs sur Assistant-Ergo.</p>
      </div>
    `,
    imageUrl: 'https://www.vyv-equipement-medical.fr/media/catalog/product/p/o/poussette_corzino_cree_8a07.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=547&width=547&canvas=547:547&format=jpeg',
    hashtags: ['LPPR', 'CPAM', 'Remboursement', 'PoussettePMI', 'ScooterElectrique', 'Cree', 'Vermeiren'],
    
},
  {
    id: '17',
    title: 'Nouveautés de Juillet : Ajouts dans les catégories FRMA et POU_MRE !',
    date: '05 Juillet 2026',
    content: 'Découvrez les deux nouveaux dispositifs intégrés au guide ce mois-ci : le fauteuil manuel actif SPEEDY A1 de Pro Activ (distribué par E. PGH) en catégorie FRMA et la poussette évolutive Stingray de chez CREE France en catégorie POU_MRE.',
    fullContent: `
      <div class="space-y-4">
        <p>Le catalogue du guide s'enrichit en ce mois de Juillet avec l'intégration de deux nouveaux dispositifs majeurs au sein des catégories <strong>FRMA</strong> (Fauteuils roulants modulaires à propulsion manuelle actifs) et <strong>POU_MRE</strong> (Poussettes multiréglables et évolutives).</p>

        <div class="my-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
          <img src="https://proactiv-gmbh.eu/media/image/dc/31/44/SpeedyA1-schw-Gesamtansicht-IMG_1912-800px_600x600.jpg" alt="Fauteuil roulant SPEEDY A1 - Pro Activ" class="w-full md:w-56 h-48 object-contain rounded-xl bg-white p-2 shadow-sm border border-slate-100" />
          <div class="space-y-2 flex-1">
            <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">À la une — Catégorie FRMA</span>
            <h4 class="text-lg font-bold text-slate-900">SPEEDY A1 (Pro Activ)</h4>
            <p class="text-sm text-slate-600 leading-relaxed">Distribué par <strong>E. PGH - Pro Activ Services Partner</strong>, le SPEEDY A1 est un fauteuil roulant manuel actif à cadre rigide reconnu pour sa grande adaptabilité, sa légèreté et la précision de ses réglages. Un choix d'excellence pour la dynamique de conduite au quotidien.</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-900 text-base">Résumé des 2 ajouts du mois de Juillet :</h4>
        <ul class="list-disc pl-5 space-y-3">
          <li>
            <strong>Catégorie FRMA — Fauteuils roulants modulaires à propulsion manuelle actifs :</strong>
            <br/>
            <span class="text-slate-800">• <strong>SPEEDY A1</strong> | Distributeur : <em>E. PGH - Pro Activ Services Partner</em></span>
            <p class="text-xs text-slate-500 mt-1">Fauteuil rigide en aluminium haute résistance combinant légèreté, robustesse et personnalisation posturale complète.</p>
          </li>
          <li>
            <strong>Catégorie POU_MRE — Poussettes multiréglables et évolutives :</strong>
            <br/>
            <span class="text-slate-800">• <strong>Poussette Stingray</strong> | Distributeur : <em>N/C CREE FRANCE</em></span>
            <p class="text-xs text-slate-500 mt-1">Poussette pédiatrique de rééducation avec rotation de l'assise à 180° et châssis carbone léger et ultra-résistant.</p>
          </li>
        </ul>

        <p class="pt-2">Accédez directement à la fiche descriptive du <strong>SPEEDY A1</strong> via le bouton ci-dessous pour consulter l'ensemble de ses caractéristiques techniques, photos et options.</p>
      </div>
    `,
    imageUrl: 'https://proactiv-gmbh.eu/media/image/dc/31/44/SpeedyA1-schw-Gesamtansicht-IMG_1912-800px_600x600.jpg',
    hashtags: ['Juillet2026', 'FRMA', 'POUMRE', 'SpeedyA1', 'ProActiv', 'Stingray', 'CreeFrance'],
    linkedinUrl: '',
    internalLink: {
      type: 'MODEL',
      id: 'PROACTIV-SPEEDY-A1',
      label: 'Voir la fiche descriptive du SPEEDY A1',
      categoryId: 'manuel',
      subCategoryId: 'FRMA',
      brandId: 'pro activ'
    }
  },
  {
    id: '16',
    title: 'Sécurité : Évitez les chutes en arrière avec le système Wabsy d\'Osmoso Handicap !',
    date: '18 Juin 2026',
    content: 'Découvrez le Wabsy, un système de frein auto-bloquant anti-recul innovant pour fauteuils roulants manuels. Conçu pour sécuriser les transferts et les montées, il empêche le fauteuil de reculer involontairement.',
    fullContent: `
      <div class="space-y-4">
        <p>Le <strong>Wabsy</strong>, proposé par <strong>Osmoso Handicap</strong>, est une innovation indispensable pour la sécurité et la sérénité des utilisateurs de fauteuils roulants manuels. Il s'attaque à une source majeure d'anxiété et de chutes : le recul accidentel du fauteuil lors des phases critiques du quotidien.</p>
        
        <h4 class="font-bold text-slate-900">Un système anti-recul intelligent et automatique :</h4>
        <p>Le fonctionnement du Wabsy est purement mécanique et d'une grande efficacité. Une fois activé, il laisse les roues tourner librement vers l'avant, mais <strong>bloque instantanément tout mouvement vers l'arrière</strong>. L'utilisateur peut ainsi s'arrêter au milieu d'une pente ou d'une rampe d'accès sans craindre de basculer ou de reculer.</p>
        
        <h4 class="font-bold text-slate-900">Les bénéfices majeurs pour l'autonomie :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Transferts ultra-sécurisés :</strong> En verrouillant le recul, il stabilise parfaitement le fauteuil lorsque l'utilisateur se lève ou s'assied, supprimant le risque de voir le fauteuil "fuir" vers l'arrière.</li>
          <li><strong>Sérénité en pente :</strong> Idéal pour franchir des rampes de voiture ou des trottoirs inclinés. Plus besoin de maintenir une force constante sur les mains courantes pour ne pas reculer.</li>
          <li><strong>Débrayable facilement :</strong> Le système s'active et se désactive d'un simple geste pour permettre les manoeuvres de recul volontaires lorsque la situation est sécurisée.</li>
          <li><strong>Universalité :</strong> Il s'installe discrètement sur la majorité des fauteuils roulants manuels du marché sans entraver leur utilisation classique.</li>
        </ul>
        
        <p>Pour les ergothérapeutes, le Wabsy est un allié précieux dans la prévention des chutes, en particulier pour les personnes ayant une baisse de force musculaire ou des troubles de l'équilibre. Pour découvrir le dispositif en vidéo et en détails, visitez la page officielle : <a href="https://www.osmosohandicap.com/produit/le-wabsy/" class="text-blue-600 underline">www.osmosohandicap.com</a>.</p>
      </div>
    `,
    imageUrl: 'https://www.osmosohandicap.com/wp-content/uploads/2020/04/wabsy-demo.png',
    hashtags: ['OsmosoHandicap', 'Wabsy', 'Sécurité', 'AntiRecul', 'PréventionDesChutes', 'Ergothérapie'],
    linkedinUrl: 'https://www.linkedin.com/company/mooviatec/',
    internalLink: {
      type: 'EXTERNAL',
      id: 'osmoso-wabsy',
      label: 'Découvrir le Wabsy sur osmosohandicap.com',
      url: 'https://www.osmosohandicap.com/produit/le-wabsy/',
      categoryId: 'ACCESSOIRE',
      subCategoryId: 'SYSTEME_FREINAGE_SECURITE',
      brandId: 'osmoso-handicap'
    }
},
  {
    id: '15',
    title: 'Mise à jour LPPR : 4 nouveaux fauteuils et 2 bases désormais remboursés !',
    date: '14 Mai 2026',
    content: 'La liste des dispositifs pris en charge par la CPAM s\'allonge. Découvrez les nouveaux entrants : du Hector de HMS-Vilgo à l\'Icon 60 de Rehasense, ainsi que de nouvelles solutions pédiatriques et de positionnement.',
    fullContent: `
      <div class="space-y-4">
        <p>Le paysage de la mobilité évolue avec l'intégration de nouvelles références au titre de la Liste des Produits et Prestations Remboursables (LPPR). Voici un tour d'horizon des derniers dispositifs désormais accessibles à la prise en charge.</p>
        
        <h4 class="font-bold text-slate-900">Évolutions et nouveaux entrants :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>HMS-VILGO – Hector (Catégorie FRM) :</strong> Déjà bien connu en version FMP, le modèle Hector rejoint officiellement la catégorie des Fauteuils Roulants Manuels (FRM), offrant ainsi plus de flexibilité pour la prescription.</li>
          <li><strong>REHASENSE – Icon 60 (Catégorie FRMC) :</strong> Une évolution majeure pour ce modèle. Déjà présent en catégorie FRMA, l'Icon 60 voit sa reconnaissance étendue à la catégorie <strong>FRMC</strong> (Fauteuil Roulant Manuel Actif/Confort), soulignant ses capacités de réglages supérieurs.</li>
          <li><strong>PRIDE MOBILITY – Enzo de Leggero LLC (Catégorie FRMP) :</strong> Ce nouveau venu dans la gamme pédiatrique/multi-position offre une solution robuste et évolutive pour les besoins de positionnement complexes.</li>
          <li><strong>ALU REHAB/MEYRA NETTI – Bases (Catégorie BASE) :</strong> Deux châssis de référence font leur entrée pour supporter les systèmes d'assise spécifiques : la <strong>Netti V Base</strong> et la <strong>Netti 4U Base</strong>.</li>
        </ul>
        
        <p>Ces ajouts permettent aux ergothérapeutes et aux utilisateurs de disposer d'un éventail de solutions plus large, tout en garantissant un reste à charge maîtrisé grâce au remboursement de l'Assurance Maladie.</p>
        
        <p class="italic text-sm text-slate-600">Retrouvez dès à présent les fiches techniques mises à jour pour chacun de ces modèles sur notre plateforme.</p>
      </div>
    `,
    imageUrl: 'https://www.my-netti.com/app/uploads/2024/09/Netti-V-Base_new.png',
    hashtags: ['LPPR', 'CPAM', 'Remboursement', 'Rehasense', 'HMSVilgo', 'PrideMobility', 'MeyraNetti'],
    linkedinUrl: '',
    internalLink: {
      type: '',
      id: '',
      label: '',
      categoryId: '',
      subCategoryId: '',
      brandId: ''
    }
},
  {
    id: '14',
    title: 'Focus Transfert : Sécurisez vos mouvements avec le S-Kit de Trustis',
    date: '06 Mai 2026',
    content: 'Simplifiez vos transferts latéraux avec le S-Kit. Ce système ingénieux permet d’abaisser la roue de votre fauteuil manuel pour libérer l’espace de transfert, offrant ainsi plus d’autonomie et de sécurité.',
    fullContent: `
      <div class="space-y-4">
        <p>Le <strong>S-Kit</strong>, conçu par <strong>Trustis</strong>, est une innovation majeure pour l'autonomie au quotidien. Il répond à l'une des problématiques les plus complexes pour les utilisateurs de fauteuils roulants manuels : l'obstacle physique de la roue lors des transferts latéraux.</p>
        
        <h4 class="font-bold text-slate-900">Une technologie au service du transfert :</h4>
        <p>Grâce à un mécanisme breveté, le S-Kit permet de faire pivoter ou d'abaisser la roue vers l'arrière d'un simple geste. Le résultat ? Un espace totalement dégagé entre l'assise du fauteuil et la surface de destination (lit, siège auto, canapé).</p>
        
        <h4 class="font-bold text-slate-900">Les avantages du S-Kit :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Sécurité maximale :</strong> Réduit considérablement les risques de chute en supprimant le besoin de "passer par-dessus" la roue.</li>
          <li><strong>Préservation des épaules :</strong> Moins d'efforts de soulèvement nécessaires, limitant ainsi les douleurs articulaires sur le long terme.</li>
          <li><strong>Adaptabilité :</strong> Le système est conçu pour s'intégrer sur de nombreux modèles de fauteuils manuels du marché.</li>
          <li><strong>Autonomie retrouvée :</strong> Permet à de nombreux utilisateurs de réaliser leurs transferts seuls, là où une aide humaine était auparavant nécessaire.</li>
        </ul>
        
        <p>Ce dispositif change la donne pour l'ergonomie du logement et de la voiture. Pour voir le système en action et comprendre son fonctionnement, rendez-vous sur le site officiel : <a href="https://www.trustis.eu/" class="text-blue-600 underline">www.trustis.eu</a>.</p>
        
        <p class="italic text-sm text-slate-600">Conseil d'ergo : Le S-Kit est particulièrement pertinent pour les utilisateurs ayant une force limitée dans les membres supérieurs ou souhaitant optimiser leurs transferts en voiture.</p>
      </div>
    `,
    imageUrl: 'https://static.wixstatic.com/media/f4020e_066a88b3d3ce4bc2ae914d620a9ff235~mv2.gif',
    hashtags: ['Trustis', 'SKit', 'Transfert', 'Autonomie', 'Ergonomie', 'Ergothérapie'],
    linkedinUrl: 'https://www.linkedin.com/company/skit-trustis-eu/posts/?feedView=all',
   
  },
  {
    id: '13',
    title: 'Événement : Le salon Handica / Autonomic Lyon arrive bientôt !',
    date: '04 Mai 2026',
    content: 'Le salon Handica Lyon, véritable référence pour l’autonomie et le handicap, s’installe à Eurexpo les 3 et 4 juin prochains. Un rendez-vous immanquable pour découvrir les dernières solutions de mobilité et d’accessibilité.',
    fullContent: `
      <div class="space-y-4">
        <p>Le salon <strong>Handica</strong> (réseau Autonomic) est de retour à <strong>Lyon Eurexpo</strong> les <strong>3 et 4 juin 2026</strong>. Cet événement majeur rassemble tous les acteurs du handicap, du Grand Âge et du maintien à domicile pour deux journées d'échanges, de découvertes et d'innovations.</p>
        
        <h4 class="font-bold text-slate-900">Pourquoi visiter Handica Lyon ?</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Une offre complète :</strong> Plus de 200 exposants couvrant tous les besoins : aides techniques, véhicules adaptés, habitat, tourisme, loisirs et emploi.</li>
          <li><strong>Essais en conditions réelles :</strong> Profitez des zones d'essais pour tester les derniers fauteuils roulants, motorisations et systèmes de freinage présentés sur Assistant-Ergo.</li>
          <li><strong>Parcours thématiques :</strong> Des espaces dédiés au sport adapté, aux enfants et aux solutions numériques innovantes.</li>
          <li><strong>Conférences d’experts :</strong> Des tables rondes sur l’évolution des aides financières (CPAM, PCH) et les nouvelles normes d'accessibilité.</li>
        </ul>
        
        <p>Que vous soyez un professionnel de santé (ergothérapeute, kinésithérapeute), une personne en situation de handicap ou un proche aidant, ce salon est l'opportunité parfaite pour trouver des réponses concrètes et personnalisées.</p>
        
        <div class="bg-slate-50 p-4 border-l-4 border-blue-500 italic">
          <strong>Infos pratiques :</strong> Lyon Eurexpo (Hall 2.1). Entrée gratuite pour tous les visiteurs. Inscription vivement recommandée sur le site officiel : https://www.salon-handica.com/inscription-visiteur
        </div>
      </div>
    `,
    imageUrl: 'https://www.handicap.fr/static/contenu/img3/2020-covid-annee-sans-salon-handicap-12851.jpg',
    hashtags: ['Handica', 'Autonomic', 'Lyon', 'Handicap', 'Innovation', 'Eurexpo'],
    linkedinUrl: 'https://www.linkedin.com/company/salon-handica/about/',    
  },
  {
    id: '12',
    title: 'Innovation : Dreeft, le système de freinage révolutionnaire enfin remboursé !',
    date: '29 Avril 2026',
    content: 'Dites adieu aux brûlures et aux douleurs articulaires. Le système de freinage par rétro-pédalage Dreeft d\'Eppur est désormais pris en charge par la CPAM. Une révolution pour les utilisateurs de fauteuils manuels.',
    fullContent: `
      <div class="space-y-4">
        <p>Freiner en fauteuil roulant manuel a toujours été synonyme de frottements, de brûlures aux mains et de sollicitations excessives des épaules. La start-up française <strong>Eppur</strong> change la donne avec <strong>Dreeft</strong>, le premier système de freinage intégré aux roues, désormais reconnu et remboursé par la Sécurité Sociale.</p>
        
        <h4 class="font-bold text-slate-900">Comment ça marche ?</h4>
        <p>Inspiré du système de rétro-pédalage des vélos, Dreeft permet de freiner en tirant légèrement la main courante vers l'arrière. Ce mécanisme démultiplié réduit l'effort nécessaire au freinage de <strong>5 fois</strong> par rapport à un freinage traditionnel.</p>
        
        <h4 class="font-bold text-slate-900">Les bénéfices clés :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Protection des articulations :</strong> Réduit drastiquement les micro-traumatismes au niveau des épaules, des coudes et des poignets.</li>
          <li><strong>Hygiène et confort :</strong> Plus besoin de toucher le pneu ou de subir l'échauffement des mains courantes en descente.</li>
          <li><strong>Sécurité renforcée :</strong> Un contrôle précis et progressif de la vitesse, même sur des pentes importantes ou par temps de pluie.</li>
          <li><strong>Installation facile :</strong> Les roues Dreeft s'adaptent sur la majorité des fauteuils roulants manuels grâce à un axe de 12 mm standard.</li>
        </ul>
        
        <p>La prise en charge par la CPAM marque une reconnaissance majeure de l'utilité de ce dispositif pour la prévention des Troubles Musculo-Squelettiques (TMS) chez les utilisateurs actifs.</p>
      </div>
    `,
    imageUrl: 'https://static.wixstatic.com/media/dbf837_4958242c88d74c9fbf8ce092404d52dd~mv2.png/v1/fill/w_476,h_498,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3_2.png',
    hashtags: ['Eppur', 'Dreeft', 'InnovationFrançaise', 'Ergothérapie', 'Santé', 'Mobilité'],
    linkedinUrl: 'https://www.linkedin.com/company/dreeftbyeppur/posts/?feedView=all',    
  },
  {
    id: '11',
    title: 'Nouveauté Fournisseur : 4Power4 rejoint Assistant-Ergo !',
    date: '01 Avril 2026',
    content: 'Découvrez 4Power4, le spécialiste du fauteuil électrique haute performance. Du verticalisateur P-Access (remboursé LPP) aux modèles 4x4 de Classe C, explorez des solutions de mobilité sans limites.',
    fullContent: `
      <div class="space-y-4">
        <p>Nous accueillons aujourd'hui <strong>4Power4</strong>, un constructeur reconnu pour son ingénierie robuste et sa capacité à repousser les frontières de l'accessibilité. Que ce soit pour la vie citadine ou les environnements ruraux exigeants, la gamme 4Power4 apporte une réponse concrète aux besoins d'autonomie et de verticalisation.</p>
        
        <h4 class="font-bold text-slate-900">Le P-Access : La verticalisation accessible</h4>
        <p>Le <strong>P-Access</strong> est le modèle phare de la marque pour l'intérieur et l'extérieur. Ce fauteuil électrique verticalisateur combine agilité et bénéfices thérapeutiques. <strong>Point clé :</strong> il bénéficie d'un code de remboursement LPP, facilitant ainsi sa prescription et son acquisition pour les utilisateurs nécessitant une station debout régulière.</p>
        
        <h4 class="font-bold text-slate-900">L'expertise Tout-Terrain : Gamme 4x4 (Classe C)</h4>
        <p>4Power4 se distingue également par ses deux modèles phares classés en <strong>FRE-P Classe C</strong>. Ces véritables 4x4 électriques sont conçus pour franchir les obstacles les plus complexes :</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Technologie 4 roues motrices :</strong> Une motricité constante sur neige, sable ou chemins escarpés.</li>
          <li><strong>Stabilité renforcée :</strong> Des châssis articulés pour maintenir l'assise droite même en dévers.</li>
          <li><strong>Confort de franchissement :</strong> Une absorption des chocs pensée pour les sorties longues en pleine nature.</li>
        </ul>
        
        <p>Idéal pour les utilisateurs souhaitant maintenir une activité de loisir ou professionnelle en extérieur, ces modèles Classe C redéfinissent ce qu'un fauteuil électrique peut accomplir.</p>
      </div>
    `,
    imageUrl: 'https://4power4-powerstand.com/wp-content/uploads/2026/03/p4-adventure-1024x791.jpg',
    hashtags: ['4Power4', 'Verticalisation', 'PAccess', 'Fauteuil4x4', 'MobilitéToutTerrain', 'LPP'],    
    internalLink: {
      type: 'BRAND',
      id: '4power4',
      label: 'Découvrir la gamme 4Power4',
      categoryId: 'electrique',
      subCategoryId: 'FREV',
      brandId: '4power4'
    }
},
  {
    id: '10',
    title: 'Interview : Stevenson Thimon nous livre sa vision de la mobilité avec Rehasense',
    date: '31 Mars 2026',
    content: 'Rencontre avec Stevenson Thimon, conseiller en matériel médical, qui nous explique pourquoi il a choisi de rejoindre l’aventure Rehasense et comment les gammes Icon, Aria et Wolturnus redéfinissent l’autonomie.',
    fullContent: `
      <div class="space-y-6">
        <section>
          <h4 class="font-bold text-slate-900 mb-2">"M. Stevenson, pouvez-vous nous raconter votre parcours ? Qu’est-ce qui vous a amené à devenir conseiller en matériel médical et qu’est-ce qui vous passionne le plus dans ce métier au quotidien ?"</h4>
          <p>Les expériences personnelles, parfois marquantes, ont été un vrai point de bascule dans mon parcours. Elles m’ont poussé à travailler sur moi, à mieux comprendre l’humain, ses besoins, ses limites, mais aussi son potentiel. Progressivement, j’ai compris que j’avais un rôle à jouer dans l’accompagnement, l’écoute et le partage. Je suis arrivé dans le domaine du matériel médical un peu par hasard au départ, sans forcément savoir où cela allait me mener. Mais très rapidement, tout a pris du sens.</p>
          <p>Je me suis rendu compte que ce métier cochait énormément de cases personnelles : l’humain, la technique, le mouvement, l’autonomie. Aujourd’hui, ce qui me passionne au quotidien, c’est simple : aider chaque personne à retrouver de la liberté et du confort de vie, avec des solutions concrètes, adaptées, et pensées pour elle.</p>
        </section>

        <section>
          <h4 class="font-bold text-slate-900 mb-2">"Pourquoi avoir choisi de rejoindre l'équipe Rehasense ? Selon vous, qu'est-ce qui distingue cette marque des autres acteurs du marché de la mobilité ?"</h4>
          <p>J’ai choisi de rejoindre Rehasense pour une raison simple : c’est une marque où l’innovation est réellement au service de l’humain. On est sur une entreprise proche du terrain, à l’écoute des besoins des utilisateurs comme des professionnels, avec une vraie accessibilité dans les échanges. Ce qui me parle particulièrement, c’est la richesse et la cohérence de la gamme :</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Une dimension sportive, qui me correspond personnellement,</li>
            <li>Un vrai travail sur le design,</li>
            <li>Et des produits qu’on peut qualifier d’iconiques.</li>
          </ul>
          <p>Sans oublier les motorisations, qui sont aujourd’hui innovantes, performantes et très abouties, avec un niveau d’équipement qui apporte un vrai confort d’utilisation au quotidien.</p>
        </section>

        <section>
          <h4 class="font-bold text-slate-900 mb-2">"Si vous deviez définir la 'signature' des fauteuils roulants Rehasense en trois mots, lesquels choisiriez-vous et pourquoi ?"</h4>
          <p>Si je devais définir la signature des fauteuils Rehasense en trois mots : <strong>Performance – Design – Haut de gamme</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Performance</strong>, parce que chaque réglage, chaque composant est pensé pour optimiser l’efficacité et l’autonomie de l’utilisateur.</li>
            <li><strong>Design</strong>, car l’esthétique fait partie intégrante de l’acceptation du matériel on ne choisit plus seulement un fauteuil, on choisit une identité.</li>
            <li><strong>Haut de gamme</strong>, enfin, pour la qualité de fabrication, la précision des réglages et la durabilité des produits.</li>
          </ul>
        </section>

        <section>
          <h4 class="font-bold text-slate-900 mb-2">"Parmi les modèles de fauteuils roulants de la gamme Icon, Aria ou Wolturnus, quelle fonctionnalité technique fait selon vous la plus grande différence pour l'autonomie de l'utilisateur ?"</h4>
          <p>Chaque gamme a une vraie identité et répond à des besoins spécifiques :</p>
          <p><strong>ICON :</strong> C’est une gamme extrêmement complète, qui offre un large choix de configurations et d’options, notamment sur le centre de gravité, les angles, les hauteurs… Un vrai avantage, c’est de pouvoir aller très loin dans l’adaptation sans dépassement de frais en FRMA, ce qui est essentiel en pratique.</p>
          <p><strong>ARIA :</strong> On est sur une signature italienne très marquée : design, légèreté et maniabilité. Le travail sur le magnésium permet d’obtenir des fauteuils parmi les plus légers du marché, avec une vraie sensation de fluidité dans les déplacements.</p>
          <p><strong>WOLTURNUS :</strong> C’est clairement la gamme de la technicité et du sur-mesure avancé. On peut aller très loin dans les adaptations : palettes séparées, potences escamotables, réglages complets… Elle couvre un spectre très large, du pédiatrique au bariatrique, avec des capacités allant jusqu’à 250 kg. C’est aussi la seule à proposer certaines solutions très spécifiques, comme la station d’arrimage pour la conduite en véhicule, ou encore des versions avec suspension pour un confort optimal.</p>
        </section>

        <section>
          <h4 class="font-bold text-slate-900 mb-2">"Quels conseils donneriez-vous à un ergothérapeute qui souhaite proposer une solution Rehasense à l'un de ses patients ?"</h4>
          <p>Le premier conseil que je donnerais, c’est de ne pas hésiter à s’appuyer sur l’accompagnement terrain. Les équipes Rehasense sont réactives, disponibles, et présentes à chaque étape : de la définition du besoin jusqu’à la livraison. Ensuite, il faut garder en tête que la force de la gamme, c’est sa capacité à répondre à une grande diversité de profils utilisateurs. Même dans des situations complexes, il existe toujours une solution adaptée. L’objectif est vraiment de construire un équipement sur mesure, en cohérence avec le projet de vie de la personne.</p>
        </section>

        <section>
          <h4 class="font-bold text-slate-900 mb-2">"Quelle est votre vision de l’évolution du fauteuil roulant dans les prochaines années ?"</h4>
          <p>Le marché du fauteuil roulant est en pleine transformation. Les marques historiques ont posé des bases solides en termes de qualité, de fiabilité et de technicité. Elles ont structuré le secteur et permis d’atteindre un niveau d’exigence élevé et c’est essentiel de le reconnaître.</p>
          <p>Aujourd’hui, on entre dans une nouvelle phase : celle de l’évolution des usages, des mentalités et de l’image du fauteuil roulant, même la réforme à permis d'accroitre cette évolution. Selon moi, l’avenir passe par plusieurs axes forts : plus de personnalisation, plus de technologie et d’innovation, mais aussi plus de proximité et d’accessibilité dans l’information. On doit sortir d’une approche parfois trop figée, trop “médicale”, pour aller vers quelque chose de plus vivant, plus dynamique.</p>
          <p>C’est dans cette logique que je m’inscris personnellement : casser les habitudes, oser le changement, montrer que le fauteuil peut être performant, esthétique, et adapté à une vraie vie active. Au quotidien, je partage beaucoup de mes essais et mises en situation sur les réseaux sociaux. L’objectif est simple : Rendre la gamme accessible, concrète, compréhensible, mais aussi changer le regard, en apportant une image plus moderne, plus fun et plus proche de la réalité des utilisateurs. Parce qu’au final, au-delà du produit, ce qu’on cherche à construire, c’est de l’autonomie, de la liberté et de la confiance. Et ça, ça passe autant par la technologie que par la manière dont on en parle et dont on la rend accessible.</p>
        </section>
      </div>
    `,
    imageUrl: 'https://i.ibb.co/qLqJFKL4/1750631638269.jpg',
    hashtags: ['Interview', 'Rehasense', 'MobilitéActive', 'Ergothérapie', 'Portrait', 'Innovation'],
    linkedinUrl: 'https://www.linkedin.com/in/stevenson-thimon-a98bbb252/',
    internalLink: {
      type: 'BRAND',
      id: 'rehasense',
      label: 'Accéder aux produits Rehasense',
      categoryId: 'manuel',
      subCategoryId: 'FRMA',
      brandId: 'rehasense'
    }
},
  {
    id: '9',
    title: 'Baldertech : La liberté de mouvement venue de Norvège !',
    date: '23 Mars 2026',
    content: 'Découvrez Baldertech sur assistant-ergo.com. Spécialiste des fauteuils roulants électriques multi-fonctions, la marque norvégienne propose des solutions de verticalisation et d\'assise parmi les plus évoluées du marché.',
    fullContent: `
      <div class="space-y-4">
        <p>Depuis plus de 30 ans, <strong>Baldertech</strong> conçoit des fauteuils roulants électriques qui ne se contentent pas de transporter : ils transforment le quotidien. Fabriqués en Norvège, les modèles Balder sont célèbres pour leur agilité et leur système d'assise unique permettant une multitude de positions ergonomiques.</p>
        
        <h4 class="font-bold text-slate-900">Les points forts de l'ingénierie Balder :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Verticalisation fluide :</strong> Une fonction debout intégrée pour faciliter les interactions sociales et améliorer les bénéfices physiologiques.</li>
          <li><strong>Amplitude d'assise exceptionnelle :</strong> Capacité de descendre l'assise très bas (pour se glisser sous une table ou au sol) et de la monter très haut (pour atteindre des étagères).</li>
          <li><strong>Mode inclinaison (Tilt) :</strong> Un basculement d'assise vers l'arrière ou vers l'avant pour faciliter les transferts ou soulager les points de pression.</li>
          <li><strong>Traction avant agile :</strong> Une motricité puissante alliée à un rayon de braquage court, idéale pour une utilisation mixte intérieur/extérieur.</li>
        </ul>
        
        <p>Le design scandinave de Baldertech met l'accent sur l'utilisateur : chaque fauteuil est conçu pour être compact tout en offrant une stabilité rassurante, même dans les positions les plus complexes.</p>
        
        <p>Retrouvez les modèles phares comme le <em>Balder Finesse</em> ou le <em>Balder Junior</em> et comparez leurs fonctionnalités uniques sur notre catalogue.</p>
      </div>
    `,
    imageUrl: 'https://www.baldertech.com/web/image/2836-f5bf64b4/WhatsApp%20Bilde%202024-09-27%20kl.%2016.41.45_abf1a8e6.webp',
    hashtags: ['Baldertech', 'Verticalisation', 'FRE', 'MobilitéÉlectrique', 'DesignScandinave', 'Ergothérapie'],
    linkedinUrl: 'https://www.linkedin.com/company/baldertech-uk/posts/?feedView=all',
    internalLink: {
      type: 'BRAND',
      id: 'baldertech',
      label: 'Découvrir les modèles Balder',
      categoryId: 'electrique',
      subCategoryId: 'FREP_CLASSE_B',
      brandId: 'baldertech'
    }
},
  {
    id: '7',
    title: 'SKS Roltek : La haute précision suisse arrive sur Assistant-Ergo !',
    date: '22 Mars 2026',
    content: 'Découvrez SKS Roltek, le spécialiste suisse du fauteuil roulant électrique haut de gamme. Connus pour leur robustesse et leur compacité, les modèles SKS redéfinissent la mobilité tout-terrain et urbaine.',
    fullContent: `
      <div class="space-y-4">
        <p>Depuis plus de 30 ans, <strong>SKS Roltek</strong> (SKS Rehab AG) conçoit et fabrique des solutions de mobilité d'une fiabilité exceptionnelle. La marque suisse se distingue par une approche artisanale alliée à une technologie de pointe, offrant des fauteuils électriques capables de s'adapter aux morphologies les plus complexes.</p>
        
        <h4 class="font-bold text-slate-900">Ce qui rend SKS unique :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Compacité record :</strong> Des bases motrices parmi les plus étroites du marché, idéales pour circuler dans les intérieurs exigus sans sacrifier la stabilité.</li>
          <li><strong>Polyvalence extrême :</strong> Que ce soit pour franchir des trottoirs en ville ou évoluer sur des chemins de campagne, les systèmes de suspension SKS offrent un confort de roule inégalé.</li>
          <li><strong>Modularité sur-mesure :</strong> Une large gamme d'options de positionnement et de commandes spéciales pour répondre aux besoins spécifiques des pathologies lourdes.</li>
          <li><strong>Qualité Suisse :</strong> Une robustesse pensée pour durer, réduisant les coûts de maintenance sur le long terme.</li>
        </ul>
        
        <p>Du célèbre <em>SKS Swiss Edition</em> aux modèles plus compacts, chaque fauteuil est une pièce d'ingénierie précise, pensée pour offrir une autonomie maximale à l'utilisateur.</p>
        
        <p>Explorez dès maintenant les configurations disponibles et les options de personnalisation sur nos fiches dédiées.</p>
      </div>
    `,
    imageUrl: 'https://www.sks-rehab.com/data/images/mod_news/thumb_250903_sksroltec_news_bild_2_1025.png',
    hashtags: ['SKSRoltek', 'QualitéSuisse', 'FRE', 'MobilitéÉlectrique', 'Ergothérapie', 'Handicap'],
    linkedinUrl: '',
    internalLink: {
      type: 'BRAND',
      id: 'sks roltek',
      label: 'Découvrir la gamme SKS',
      categoryId: 'electrique',
      subCategoryId: 'FREP_CLASSE_B',
      brandId: 'sks roltek'
    }
},
  {
    id: '6',
    title: 'Événement : Le salon Autonomic Sud à Toulouse !',
    date: '18 Mars 2026',
    content: 'Le rendez-vous incontournable du handicap et de l’autonomie revient au MEETT de Toulouse les 25 et 26 mars prochains. Venez découvrir les dernières innovations et solutions techniques pour le Grand Âge et le Handicap.',
    fullContent: `
      <div class="space-y-4">
        <p>Préparez votre visite ! La semaine prochaine, les <strong>25 et 26 mars 2026</strong>, le salon <strong>Autonomic Sud</strong> ouvre ses portes au MEETT de Toulouse pour sa 14ème édition. C'est l'occasion idéale pour les particuliers, les aidants et les professionnels de santé de tester en conditions réelles les aides techniques de demain.</p>
        
        <h4 class="font-bold text-slate-900">Pourquoi s'y rendre ?</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Plus de 150 exposants :</strong> Fauteuils roulants, véhicules adaptés, domotique, aménagement du logement et services à la personne.</li>
          <li><strong>Espaces thématiques :</strong> Sport adapté, culture, tourisme et loisirs pour tous.</li>
          <li><strong>Conférences et forums :</strong> Des échanges avec des experts sur les droits, l'accessibilité et les nouvelles réformes de prise en charge (CPAM/MDPH).</li>
          <li><strong>Entrée gratuite :</strong> Le salon est accessible gratuitement à tous les visiteurs (inscription conseillée en ligne).</li>
        </ul>
        
        <p>L'équipe d'Assistant-Ergo suit de près les nouveautés qui y seront présentées. C’est le moment parfait pour concrétiser vos projets de mobilité ou d’aménagement avec des conseils personnalisés.</p>
        
        <div class="bg-slate-50 p-4 border-l-4 border-blue-500 italic">
          <strong>Infos pratiques :</strong> Parc des Expositions MEETT, Hall 1. 
          Ouvert de 9h30 à 18h00 (17h00 le jeudi). 
          Obtenir mon badge visiteur => 
          <a href="https://www.autonomic-expo.com/salon/9/reservation" target="_blank">
            Réserver ici
          </a>
        </div>
      </div>
    `,
    imageUrl: 'https://www.autonomic-expo.com/sites/default/files/styles/hd/public/2025-12/9938196e7f6f313c3c6d5ff0dc8e4468ab71457a.png.avif?itok=pbVgYWRU/800/400',
    hashtags: ['AutonomicSud', 'Toulouse', 'Handicap', 'Autonomie', 'Innovation', 'MEETT'],
    linkedinUrl: 'https://www.linkedin.com/company/salons-autonomic/posts/?feedView=all',
    
},
  {
    id: '5',
    title: 'Pédiatrie : Les poussettes Trak et Reach désormais remboursées !',
    date: '17 Mars 2026',
    content: 'Une étape clé pour l’accompagnement des plus jeunes : les poussettes multiréglables et évolutives Trak et Reach, distribuées par Pride Mobility, sont maintenant prises en charge par la CPAM.',
    fullContent: `
      <div class="space-y-4">
        <p>Le catalogue des solutions pédiatriques s'enrichit sur assistant-ergo.com. Les modèles <strong>Trak</strong> et <strong>Reach</strong> du fabricant Leggero LLC, distribués en France par Pride Mobility, intègrent officiellement la catégorie des Poussettes Multiréglables et Évolutives (POU_MRE) remboursées par l'Assurance Maladie.</p>
        
        <h4 class="font-bold text-slate-900">Focus sur ces solutions évolutives :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Poussette Trak :</strong> Un modèle conçu pour offrir un soutien postural de précision. Elle est particulièrement appréciée pour sa capacité à s'ajuster à la croissance de l'enfant tout en garantissant un pliage compact pour le transport.</li>
          <li><strong>Poussette Reach :</strong> Alliant robustesse et design moderne, elle offre une inclinaison d'assise facilitée et une grande maniabilité, permettant aux familles de maintenir une vie sociale active.</li>
        </ul>
        
        <p>Ces dispositifs permettent une adaptation fine aux besoins thérapeutiques (assise, dossier, inclinaison) tout en s'inscrivant dans un parcours de soin facilité par leur nouvelle reconnaissance au titre de la LPPR.</p>
        
        <p>Une excellente nouvelle pour les parents et les ergothérapeutes qui cherchent à concilier confort postural et simplicité d'utilisation au quotidien.</p>
      </div>
    `,
    imageUrl: 'https://i.ibb.co/RG5RYm2y/Design-sans-titre-1.png',
    hashtags: ['Pédiatrie', 'Ergothérapie', 'PrideMobility', 'Leggero', 'PoussetteEvolutive', 'Mobilité'],
    internalLink: {
      type: 'BRAND',
      id: 'Pride mobility',
      label: 'Voir les modèles Pride Mobility',
      categoryId: 'poussette',
      subCategoryId: 'POU_MRE',
      brandId: 'Pride mobility'
    }
},
  {
    id: '4',
    title: 'Nouveauté : La gamme LightChair débarque sur Assistant-Ergo !',
    date: '17 Mars 2026',
    content: 'Découvrez les nouveaux fauteuils roulants électriques (FRE) de Logo Silver Europe : le LightChair et le LightChair +. Des solutions modulaires, légères et désormais disponibles en Classe A et Classe B.',
    fullContent: `
      <div class="space-y-4">
        <p>Nous sommes ravis d'accueillir la marque <strong>Logo Silver Europe</strong> sur assistant-ergo.com. Spécialisée dans la mobilité légère, la gamme <strong>LightChair</strong> propose des fauteuils électriques pliables et modulaires conçus pour simplifier le transport et l'autonomie au quotidien.</p>
        
        <h4 class="font-bold text-slate-900">Zoom sur les nouveaux modèles :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>LightChair :</strong> Un modèle ultra-compact ajouté en <strong>Classe A</strong>. Idéal pour une utilisation intérieure et des déplacements sur sols lisses, il se plie en quelques secondes pour se glisser dans n'importe quel coffre.</li>
          <li><strong>LightChair + :</strong> La version polyvalente, disponible en <strong>Classe A et Classe B</strong>. Plus robuste, il permet une utilisation mixte (intérieur et extérieur) tout en conservant une maniabilité exceptionnelle.</li>
        </ul>
        
        <p>Le point fort de ces modèles ? Leur <strong>modularité</strong>. Ils s'adaptent aux besoins de l'utilisateur tout en répondant aux critères de prise en charge, offrant ainsi une alternative sérieuse et moderne pour la prescription en ergothérapie.</p>
        
        <p>Retrouvez dès maintenant toutes les spécifications, dimensions et options de configuration directement sur nos fiches produits dédiées.</p>
      </div>
    `,
    imageUrl: 'https://i.ibb.co/WvgkGgGG/Design-sans-titre.png',
    hashtags: ['LightChair', 'LogoSilver', 'FRE', 'MobilitéÉlectrique', 'Ergothérapie', 'Nouveauté'],
    internalLink: {
      type: 'BRAND',
      id: 'logo silver europe',
      label: 'Découvrir la gamme LightChair',
      categoryId: 'electrique',
      subCategoryId: 'FRE_CLASSE_A',
      brandId: 'logo silver europe'
    }
},
  {
    id: '3',
    title: 'Le Panthera S3 de Permobil désormais remboursé par la CPAM !',
    date: '17 Mars 2026',
    content: 'Une excellente nouvelle pour les amateurs de légèreté : le célèbre fauteuil manuel actif Panthera S3 est dorénavant pris en charge par la CPAM en catégorie FRMC.',
    fullContent: `
      <div class="space-y-4">
        <p>Réputé pour être l'un des fauteuils les plus légers au monde, le <strong>Panthera S3</strong> franchit une nouvelle étape en devenant accessible via le remboursement de la Sécurité Sociale (catégorie FRMC). Ce châssis rigide suédois est une référence pour ceux qui recherchent une conduite dynamique et un transport facilité.</p>
        
        <h4 class="font-bold text-slate-900">Les atouts du Panthera S3 :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Poids plume exceptionnel :</strong> Un châssis conçu en chrome-molybdène pour un poids de transport minimal, idéal pour les transferts en voiture.</li>
          <li><strong>Géométrie optimisée :</strong> Une assise étudiée pour offrir une position ergonomique et un soutien lombaire parfait.</li>
          <li><strong>Performance de roule :</strong> Une rigidité de cadre qui transmet chaque poussée directement aux roues, sans déperdition d'énergie.</li>
          <li><strong>Accès simplifié :</strong> Désormais éligible à la prise en charge CPAM, facilitant son acquisition pour une mobilité active au quotidien.</li>
        </ul>
        
        <p>Le Panthera S3 n'est pas seulement un fauteuil, c'est un prolongement du corps conçu pour rendre chaque déplacement plus fluide et moins fatiguant.</p>
      </div>
    `,
    imageUrl: 'https://permobilwebcdn.azureedge.net/media/n1of3fq4/panthera-s3_woman_library_03_web.jpg?upscale=false',
    hashtags: ['Permobil', 'PantheraS3', 'Légèreté', 'FRMC', 'MobilitéActive', 'CPAM'],
    linkedinUrl: 'https://www.linkedin.com/company/permobil/posts/?feedView=all',
    internalLink: {
      type: 'MODEL',
      id: 'PANTHERA-S3',
      label: 'Voir les spécifications techniques',
      categoryId: 'manuel',
      subCategoryId: 'FRMC',
      brandId: 'permobil'
    }
},
  {
    id: '2',
    title: 'Excellente nouvelle : L\'Empulse M90 est désormais remboursé !',
    date: '17 Mars 2026',
    content: 'Bonne nouvelle pour votre mobilité ! L\'assistance électrique sans fil Empulse M90 de Sunrise Medical bénéficie désormais d\'une prise en charge par la CPAM. Une opportunité parfaite pour booster votre fauteuil manuel sans contrainte de câbles.',
    fullContent: `
      <div class="space-y-4">
        <p>C'est officiel : l'aide motorisée <strong>Empulse M90</strong> rejoint la liste des dispositifs pris en charge par l'Assurance Maladie. Ce kit de propulsion électrique "tout-en-un" transforme votre fauteuil roulant manuel en véritable allié de vos longues distances, sans dénaturer son design.</p>
        
        <h4 class="font-bold text-slate-900">Pourquoi vous allez l'adorer :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Zéro câble :</strong> Une connexion Bluetooth ultra-fiable entre les roues et le joystick pour une installation en un clic.</li>
          <li><strong>Poids plume :</strong> Avec seulement 12,2 kg (soit 6,1 kg par roue), c'est l'un des systèmes les plus légers du marché.</li>
          <li><strong>Polyvalence :</strong> Passez du mode motorisé au mode roue libre manuelle en un simple mouvement du moyeu.</li>
          <li><strong>Prise en charge CPAM :</strong> Grâce à la nouvelle réforme, bénéficiez d'un remboursement intégral pour faciliter votre quotidien.</li>
        </ul>
        
        <p>Que ce soit pour franchir des côtes sans effort ou simplement préserver vos épaules lors de vos sorties urbaines, l'Empulse M90 combine élégance technique et liberté retrouvée.</p>
      </div>
    `,
    imageUrl: 'https://i.ibb.co/M5ps5hQB/Capture-d-cran-2026-03-16-155743-1.png',
    hashtags: ['SunriseMedical', 'EmpulseM90', 'RemboursementCPAM', 'Handicap', 'Mobilité'],
    linkedinUrl: 'https://www.linkedin.com/search/results/all/?keywords=%23empulseM90&origin=GLOBAL_SEARCH_HEADER',
    internalLink: {
      type: 'MODEL',
      id: 'SUNRISE-EMPULSE-M90',
      label: 'Découvrir l\'Empulse M90',
      categoryId: 'aap',
      subCategoryId: 'KIT',
      brandId: 'sunrise'
    }
},
  {
    id: '1',
    title: 'Sport : Les fauteuils RGK Elite et Grand Slam désormais remboursés !',
    date: '16 Mars 2026',
    content: 'Une victoire pour le sport adapté ! Depuis début mars, les fauteuils roulants de sport (FRMS) RGK Elite et Grand Slam de Sunrise Medical sont officiellement remboursés par la CPAM, rejoignant ainsi les célèbres A2 et G2.',
    fullContent: `
      <div class="space-y-4">
        <p>C'est une nouvelle attendue avec impatience par la communauté des sportifs : l'élargissement de la prise en charge par l'Assurance Maladie pour la gamme <strong>RGK</strong>. Cette reconnaissance permet aux athlètes, amateurs comme compétiteurs, d'accéder plus facilement à du matériel de haute performance.</p>
        
        <h4 class="font-bold text-slate-900">Les nouveaux modèles éligibles :</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>RGK Elite :</strong> La référence absolue pour le basketball fauteuil. Un châssis sur-mesure ultra-léger conçu pour une réactivité et une agilité sans compromis sur le terrain.</li>
          <li><strong>RGK Grand Slam :</strong> L'élite du tennis en fauteuil. Conçu pour offrir une accélération explosive et une stabilité latérale parfaite lors des frappes les plus puissantes.</li>
        </ul>
        
        <p>Ils viennent compléter la liste des fauteuils déjà pris en charge, les polyvalents <strong>RGK A2</strong> et <strong>RGK G2</strong>, faisant de Sunrise Medical un partenaire incontournable de votre pratique sportive.</p>
        
        <p class="italic text-sm text-slate-600">Depuis début mars 2026, ces modèles bénéficient du code de remboursement CPAM au titre de la Liste des Produits et Prestations Remboursables (LPPR).</p>
      </div>
    `,
    imageUrl: 'https://i.ibb.co/5WjVQQDR/Design-sans-titre.png',
    hashtags: ['Handisport', 'RGK', 'SunriseMedical', 'BasketFauteuil', 'TennisFauteuil', 'RemboursementCPAM'],
    linkedinUrl: 'https://www.linkedin.com/search/results/all/?keywords=%23RGK&origin=GLOBAL_SEARCH_HEADER',
    internalLink: {
      type: 'BRAND',
      id: 'sunrise_medical',
      label: 'Découvrir la gamme RGK Sport',
      categoryId: 'manuel',
      subCategoryId: 'FRMS',
      brandId: 'sunrise_medical'
    }
},
 
];
