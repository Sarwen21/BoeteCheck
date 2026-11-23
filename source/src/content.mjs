/** EDIT TEXT HERE: shared Dutch copy, categories, FAQs and article introductions.
 * Copy was inspected on boetecheck.lovable.app. Legal statements are reproduced
 * as site content, not independently verified legal advice. See docs/AUDIT.md.
 */
export const disclaimer = 'BoeteCheck is een onafhankelijke dienst en geen onderdeel van het CJIB of de Nederlandse overheid. We geven geen garantie dat een boete wordt vernietigd. Een terechte boete moet je zelf betalen.';

export const steps = [
  ['upload', 'Upload je boete', 'Upload een foto of pdf van je verkeersboete en beantwoord een paar korte vragen.'],
  ['search', 'Wij bekijken je situatie', 'We controleren welke procedure van toepassing is en beoordelen of we je verder kunnen helpen.'],
  ['heart', 'Wij helpen je verder', 'Is je zaak geschikt? Dan helpen we je kosteloos met de vervolgstappen.']
];

export const categories = [
  ['snelheid', 'car', 'Snelheidsboete', 'Te hard gereden volgens flitspaal, trajectcontrole of laser. Meestal een CJIB-beschikking (M-boete) onder de Wet Mulder.'],
  ['rood', 'traffic', 'Door rood rijden', 'Roodlichtcamera of staandehouding bij een verkeerslicht. Vaak een M-boete; bij ernstige gevallen een strafrechtelijke procedure.'],
  ['telefoon', 'phone', 'Telefoon tijdens het rijden', 'Handheld bellen of je telefoon vasthouden achter het stuur. Meestal een M-boete via het CJIB.'],
  ['parkeren', 'parking', 'Parkeerboete', 'Naheffingsaanslag parkeerbelasting of een parkeerovertreding. Een naheffingsaanslag van de gemeente valt onder het belastingrecht, met een eigen bezwaarprocedure.'],
  ['overig', 'file', 'Overige verkeersboetes', 'Bijvoorbeeld gordel, inhalen of een andere overtreding. We kijken samen welke procedure op jouw boete van toepassing is.']
];

export const benefits = [
  ['heart', 'Gratis ondersteuning', 'Je betaalt geen servicekosten voor onze hulp.'],
  ['file', 'Geen ingewikkeld papierwerk', 'Wij zoeken uit welke stappen en documenten nodig zijn.'],
  ['phone', 'Eenvoudig online proces', 'Aanmelden kan in een paar minuten, ook op je telefoon.'],
  ['chat', 'Heldere communicatie', 'Je weet altijd waar je zaak staat.'],
  ['route', 'Hulp bij de juiste vervolgstappen', 'Officier van justitie, gemeente of kantonrechter: we leggen het uit.'],
  ['eye', 'Transparant over kansen en voorwaarden', 'Geen beloftes die we niet kunnen waarmaken.']
];

export const faqs = [
  ['Is jullie hulp echt gratis?', 'Ja. Voor onze ondersteuning betaal je geen servicekosten. Je betaalt geen abonnement, geen advieskosten en er zijn geen verborgen kosten. Het boetebedrag zelf blijft wel jouw verantwoordelijkheid als de boete terecht is.'],
  ['Hoe verdienen jullie geld?', 'Ons verdienmodel wordt nog definitief vastgesteld. We onderzoeken een model op basis van proceskostenvergoedingen die in sommige gevallen worden toegekend. Gelden er afspraken voor jou, dan hoor je die vooraf en schriftelijk, voordat je ons machtigt.', true],
  ['Moet ik betalen als mijn beroep wordt afgewezen?', 'Niet aan ons. Je betaalt ons geen kosten of boete als je beroep wordt afgewezen. Wel moet je dan de verkeersboete zelf betalen, inclusief eventuele verhogingen als de betaaltermijn verlopen is.'],
  ['Moet ik de boete zelf betalen?', 'Bij beroep bij de officier van justitie tegen een M-boete hoef je de boete in de regel niet eerst te betalen. Ga je daarna naar de kantonrechter, dan moet je meestal zekerheid stellen. Wordt je beroep afgewezen, dan betaal je de boete zelf.'],
  ['Wat gebeurt er als mijn boete wordt vernietigd?', 'Dan hoef je de boete niet te betalen. Heb je al betaald of zekerheid gesteld, dan krijg je dat bedrag terug. In sommige gevallen wordt ook een proceskostenvergoeding toegekend.'],
  ['Wat is een proceskostenvergoeding?', 'Een vergoeding die de officier van justitie of de rechter kan toekennen voor kosten die je hebt gemaakt, bijvoorbeeld voor professionele hulp, als je beroep slaagt. Niet elk geslaagd beroep levert een vergoeding op. Welke afspraken BoeteCheck hierover maakt, wordt nog vastgesteld.', true],
  ['Hoe lang duurt een beroepsprocedure?', 'Dat verschilt per zaak. Een beslissing van de officier van justitie kan enkele weken tot maanden duren. Een procedure bij de kantonrechter duurt vaak langer. We houden je via Mijn zaken op de hoogte.'],
  ['Kan ik zelf in beroep gaan?', 'Ja, dat kan altijd. Voor een M-boete kun je online beroep instellen via de website van het CJIB of het OM. Wij helpen je graag als je het liever niet alleen doet.'],
  ['Welke verkeersboetes behandelen jullie?', 'We richten ons in eerste instantie op M-boetes van het CJIB, zoals snelheidsboetes, door rood rijden en telefoon tijdens het rijden. Parkeerboetes en andere boetes bekijken we ook, maar daarvoor gelden andere procedures.'],
  ['Wat gebeurt er nadat ik mijn boete heb geüpload?', 'Je krijgt direct een dossiernummer. We bekijken je aanvraag en laten je weten of we je kunnen helpen en wat de vervolgstappen zijn. Let op: het indienen van het formulier is nog geen officieel beroep.']
];

export const articles = [
  { slug: 'gratis-verkeersboete-aanvechten', label: 'Gratis verkeersboete aanvechten', title: 'Je verkeersboete gratis aanvechten', intro: 'Niet elke verkeersboete klopt. Upload je boete, vertel wat er gebeurde en wij kijken kosteloos welke stappen mogelijk zijn.', points: ['Geen servicekosten voor onze hulp', 'Binnen een paar minuten aangemeld', 'Eerlijk advies, ook als je zaak niet kansrijk is'] },
  { slug: 'snelheidsboete-aanvechten', label: 'Snelheidsboete aanvechten', title: 'Snelheidsboete aanvechten? Wij kijken gratis mee', intro: 'Een snelheidsboete is meestal een M-boete van het CJIB. Je kunt binnen zes weken na de dagtekening in beroep bij de officier van justitie. Wij helpen je daar gratis bij als je zaak geschikt is.', type: 'snelheid', points: ['Controle van meetgegevens en kenteken', 'Hulp bij beroep bij de officier van justitie', 'Duidelijke uitleg over termijnen'] },
  { slug: 'cjib-boete-beroep', label: 'CJIB boete beroep', title: 'In beroep tegen een CJIB-boete', intro: 'Tegen een M-boete (Wet Mulder) kun je eerst beroep instellen bij de officier van justitie. Voor dat beroep hoef je de boete in de regel niet eerst te betalen. Ga je daarna naar de kantonrechter, dan moet je meestal wel zekerheid stellen.', points: ['Uitleg over de Mulder-procedure', 'Hulp bij het opstellen van je beroep', 'We bewaken samen de termijn'] },
  { slug: 'verkeersboete-onterecht', label: 'Verkeersboete onterecht', title: 'Verkeersboete onterecht ontvangen?', intro: 'Verkeerd kenteken, onduidelijke borden of je reed die dag niet zelf? Vertel ons wat er gebeurde. We beoordelen je situatie en laten je eerlijk weten of we je kunnen helpen.', points: ['Ook als je twijfelt of je kans maakt', 'Geen ingewikkeld papierwerk', 'Je hoort altijd wat de volgende stap is'] },
  { slug: 'parkeerboete-aanvechten', label: 'Parkeerboete aanvechten', title: 'Parkeerboete aanvechten', intro: 'Een parkeerboete van de gemeente is vaak een naheffingsaanslag parkeerbelasting. Daarvoor geldt een bezwaarprocedure bij de gemeente, los van het CJIB. We leggen uit wat in jouw geval van toepassing is.', type: 'parkeren', points: ['Uitleg over bezwaar bij de gemeente', 'Check van vergunning- of betaalbewijs', 'Hulp bij de juiste vervolgstappen'] },
  { slug: 'boete-door-rood-rijden', label: 'Boete door rood rijden', title: 'Boete voor door rood rijden aanvechten', intro: 'Een boete voor door rood rijden is fors. Klopt de foto, het kenteken en de situatie? We kijken kosteloos met je mee.', type: 'rood', points: ['Beoordeling van foto en omstandigheden', 'Uitleg over de juiste procedure', 'Geen kosten voor onze hulp'] }
];
