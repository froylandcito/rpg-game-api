const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'froy',
        password: '',
        database: 'rpgGame'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req,res) => {
    db.select('*').from('characters')
        .then(characters=> {
            if(characters.length) {
                const fullCharacters = characters.map(character => {
                    return {
                        id: character.id,
                        name: character.name,
                        image: character.image,
                        hp: character.hp,
                        baseAttack: character.baseattack,
                        currentAttack: character.baseattack,
                        counterAttack: character.counterattack
                    }
                });
                res.json(fullCharacters);    
            } else {
                res.status(400).json('No characters found')
            }
        })
        .catch(err=> res.status(400).json('error getting characters'));
});

app.listen(4000);