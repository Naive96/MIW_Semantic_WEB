import * as readline from 'readline';
import { QueryService } from './client/QueryService';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



function ask(question: string) {
    rl.question(question, answer => {
        let error = false;
        let operation = null;
        const qs = new QueryService();
        switch (answer){
            case 'companies':
                operation = qs.obtainCompanies();
                break;
            case 'games':
                operation =  qs.obtainGames();
                break;
            case 'characters':
                operation =  qs.obtainCharacters();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('No se puede procesar');
                error = true;
        }
        if (error){
            console.log(`Orden desconocida, prueba de nuevo.`);
            ask(question);
        }
        operation?.then(response => {
            const data = response.data;
            qs.parseData(data.results.bindings, answer);
            qs.save(answer);
            console.log('Done!');
            ask(question)
        });

    });
}


ask('Select data to extract (companies, games, characters)\n')