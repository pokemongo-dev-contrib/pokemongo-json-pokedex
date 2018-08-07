const i18next = require('i18next');
const path = require('path');
const Backend = require('i18next-node-fs-backend');

const OUTPUT = path.join(__dirname, '../../output')
const parameters = process.argv.slice(2);
const lng = parameters[0];
const defaultNS = parameters[1];

let entities;
try {
    entities = require(path.join(OUTPUT, defaultNS + '.json'));
}
catch (err) {
    console.error('Translation entity "' + defaultNS + '" not found');
    process.exit(1);
}

const loadTranslations = async () => {
    // Promisify the function for easier usage (optional)
    return new Promise((resolve) => {
        i18next
            // Use filesystem backend
            .use(Backend)
            .init({
                // These represent the different namespaces (files) which can be used
                // with pokemongo-json-pokedex translationsk
                ns: ['avatar-customization', 'pokemon', 'item', 'move'],
                fallbackLng: 'de-DE',
                fallbackNS: 'pokemon',
                defaultNS,
                lng,
                backend: {
                    // The path to the language files
                    loadPath: path.join(OUTPUT, 'locales/{{lng}}/{{ns}}.json'),
                    jsonIndent: 4
                }
            }, (err, t) => resolve(t));
    });
};

const getAllNames = async () => {
    // Load the translation files
    const t = await loadTranslations();

    // Get the name of a Pokemon
    return entities
        .map(pokemon => t(pokemon.id + '.name'))
        .join(',');
};

// Run script and print to console
getAllNames().then(console.log).catch(console.err);
