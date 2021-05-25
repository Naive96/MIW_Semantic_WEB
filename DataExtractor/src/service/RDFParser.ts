import {DataFactory, NamedNode, Writer} from 'n3';
import fs from 'fs';

import {
    LABEL,
    SAGA,
    CREATOR,
    GENRE,
    PUBLICATION_COUNTRY,
    PUBLICATION_DATE,
    ORIGIN_DATE,
    ORIGIN_COUNTRY, PART_OF, INSTANCE_OF, COMPANY, VIDEO_GAME, CHARACTER
} from "../client/CONSTANTS";

export class RDFParser {
    private writer: Writer | null = null;
    private elements: string[] = [];

    constructor() {
        this.writer = new Writer({end: false});
    }

    parse(elementList: any[], kind: string) {
        elementList.forEach(element => this.parseElement(element, kind))
    }

    parseElement(element: any, kind: string) {
        switch (kind) {
            case 'companies':
                return this.companyParser(element);
            case 'games':
                return this.videogameParser(element);
            case 'characters':
                return this.characterParser(element);
            default:
                return;
        }
    }

    companyParser(element: any) {
        const {namedNode, literal} = DataFactory;

        if (this.writer === null) return;
        const company = namedNode(element.company.value);
        if (this.elements.includes(company.value)) return;
        this.elements.push(company.value);
        this.writer.addQuad(company, namedNode(INSTANCE_OF), namedNode(COMPANY))
        this.writer.addQuad(company, namedNode(ORIGIN_DATE), literal(element.originDate.value));
        this.writer.addQuad(company, namedNode(LABEL), literal(element.companyLabel.value));
        this.writer.addQuad(company, namedNode(ORIGIN_COUNTRY), namedNode(element.originCountry.value));
        this.writer.addQuad(namedNode(element.originCountry.value), namedNode(LABEL), literal(element.originCountryLabel.value));

    }

    videogameParser(element: any) {
        const {namedNode, literal} = DataFactory;
        if (this.writer === null) return;
        const videogame = namedNode(element.item.value);
        if (this.elements.includes(videogame.value)) return;
        this.elements.push(videogame.value);
        this.writer.addQuad(videogame, namedNode(INSTANCE_OF), namedNode(VIDEO_GAME));
        this.writer.addQuad(videogame, namedNode(LABEL), literal(element.itemLabel.value));
        this.writer.addQuad(videogame, namedNode(SAGA), namedNode(element.saga.value));
        this.writer.addQuad(namedNode(element.saga.value), namedNode(LABEL), literal(element.sagaLabel.value));
        this.writer.addQuad(videogame, namedNode(CREATOR), namedNode(element.company.value));
        this.writer.addQuad(namedNode(element.company.value), namedNode(LABEL), literal(element.companyLabel.value));
        this.writer.addQuad(videogame, namedNode(GENRE), literal(element.genreLabel.value));
        this.writer.addQuad(videogame, namedNode(PUBLICATION_COUNTRY), namedNode(element.origin.value));
        this.writer.addQuad(namedNode(element.origin.value), namedNode(LABEL), literal(element.originLabel.value));
        this.writer.addQuad(videogame, namedNode(PUBLICATION_DATE), literal(element.publicationDate.value));
    }

    characterParser(element: any) {
        const {namedNode, literal} = DataFactory;
        if (this.writer === null) return;
        const character = namedNode(element.character.value);
        this.elements.push(character.value);
        this.writer.addQuad(character, namedNode(INSTANCE_OF), namedNode(CHARACTER));
        this.writer.addQuad(character, namedNode(LABEL), literal(element.characterLabel.value));
        this.writer.addQuad(character, namedNode(PART_OF), namedNode(element.game.value));
        this.writer.addQuad(namedNode(element.game.value), namedNode(LABEL), literal(element.gameLabel.value));
    }

    save(dataKind: string) {
        this.writer?.end((error, result) => {
            if (result) {
                fs.writeFile(`${__dirname}/../files/${dataKind}.ttl`,
                    result, {flag: 'w'}, (err) => console.log(err ? err : ''));
            }
        });
    }
}