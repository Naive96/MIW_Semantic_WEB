
const RDF = 'http://www.w3.org/2000/01/rdf-schema#';
const WDT = 'http://www.wikidata.org/prop/direct/';
const WD = 'http://www.wikidata.org/entity/';

const LABEL = RDF + 'label';
const SAGA = WDT + 'P179';
const CREATOR = WDT + 'P123';
const GENRE = WDT + 'P136';
const PUBLICATION_COUNTRY = WDT + 'P495';
const PUBLICATION_DATE = WDT + 'P577';

const ORIGIN_DATE = WDT + 'P571';
const ORIGIN_COUNTRY = WDT + 'P17';

const PART_OF = WDT + 'P361';
const INSTANCE_OF = WDT + 'P31';

const COMPANY = WD + 'Q1058914';
const CHARACTER = WD + 'Q95074';
const VIDEO_GAME = WD + 'Q7889';




export {
    LABEL,
    SAGA,
    CREATOR,
    GENRE,
    PUBLICATION_COUNTRY,
    ORIGIN_COUNTRY,
    PUBLICATION_DATE,
    ORIGIN_DATE,
    PART_OF,
    INSTANCE_OF,
    COMPANY,
    CHARACTER,
    VIDEO_GAME
}