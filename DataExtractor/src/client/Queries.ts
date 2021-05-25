
const GAMES_QUERY = `SELECT DISTINCT(?item as ?item) ?itemLabel  ?company ?companyLabel ?saga ?sagaLabel ?genreLabel ?publicationDate ?origin ?originLabel
WHERE 
{
  ?item wdt:P31 wd:Q7889.
  ?item wdt:P123 ?company.
  OPTIONAL { ?item wdt:P136 ?genre}
  OPTIONAL { ?item wdt:P179 ?saga}
  OPTIONAL { ?item wdt:P577 ?publicationDate}
  OPTIONAL { ?item wdt:P495 ?origin}
  OPTIONAL { ?item wdt:P123 ?company}
  VALUES (?company) {
    (wd:Q207784) (wd:Q8093) (wd:Q122741)
  }.
  VALUES (?item) {
    (wd:Q2478949) (wd:Q12384) (wd:Q11168) (wd:Q12395) (wd:Q54093632) (wd:Q1988120) (wd:Q843131)
    (wd:Q37115) (wd:Q1141627) (wd:Q20730405) ( wd:Q253111) ( wd:Q214232) (wd:Q870981)
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

const GAMES_SHORT_QUERY = `SELECT ?item  ?itemLabel  ?company ?companyLabel ?saga ?sagaLabel ?genreLabel ?publicationDate ?origin ?originLabel
WHERE 
{
  ?item wdt:P31 wd:Q7889.
  ?item wdt:P123 ?company.
  OPTIONAL { ?item wdt:P136 ?genre}
  OPTIONAL { ?item wdt:P179 ?saga}
  OPTIONAL { ?item wdt:P577 ?publicationDate}
  OPTIONAL { ?item wdt:P495 ?origin}
  VALUES (?company) {
    (wd:Q207784) (wd:Q8093) (wd:Q122741)
  }.
  VALUES (?item) {
    (wd:Q12384) (wd:Q11168) (wd:Q12395) (wd:Q54093632) (wd:Q843131)
    (wd:Q37115) (wd:Q1141627) ( wd:Q214232) (wd:Q1988120) (wd:Q870981)
  }.
  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
} `;

const CHARACTERS_QUERY = `SELECT distinct(?character as ?character) ?characterLabel ?genderLabel ?game ?gameLabel
WHERE 
{
  ?character wdt:P31/wdt:P279* wd:Q95074.
  ?game wdt:P674 ?character.
  OPTIONAL { ?character wdt:P21 ?gender}
  VALUES (?game) {
    (wd:Q2478949) (wd:Q12384) (wd:Q11168) (wd:Q12395) (wd:Q54093632) (wd:Q1988120)
    (wd:Q37115) (wd:Q1141627) (wd:Q20730405) ( wd:Q253111) ( wd:Q214232)
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

const CHARACTERS_SHORT_QUERY = `SELECT distinct(?character as ?character) ?characterLabel ?genderLabel ?game ?gameLabel
WHERE 
{
  ?character wdt:P31/wdt:P279* wd:Q95074.
  ?game wdt:P674 ?character.
  OPTIONAL { ?character wdt:P21 ?gender}
  VALUES (?game) {
    (wd:Q12384) (wd:Q11168) (wd:Q12395) (wd:Q54093632) 
    (wd:Q37115) (wd:Q1141627) ( wd:Q214232) (wd:Q1988120)
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
} `;

const COMPANIES_QUERY = `SELECT ?company ?companyLabel ?originDate ?originCountry ?originCountryLabel 
WHERE 
{
  ?company wdt:P31/wdt:P279* wd:Q1058914.
  OPTIONAL{?company wdt:P571 ?originDate}
  OPTIONAL{?company wdt:P17 ?originCountry}
 VALUES (?company){
    (wd:Q207784) (wd:Q8093) (wd:Q122741)
  }
SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
} order by asc(?companyLabel)`;

export {
    GAMES_QUERY,
    GAMES_SHORT_QUERY,
    CHARACTERS_QUERY,
    CHARACTERS_SHORT_QUERY,
    COMPANIES_QUERY
}