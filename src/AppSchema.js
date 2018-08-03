
// Define your models and their properties
const AppSchema = {
    "CarSchema" : {
        name: 'Car',
        properties: {
          make:  'string',
          model: 'string',
          miles: {type: 'int', default: 0},
        }
    },

    "PersonSchema": {
        name: 'Person',
        properties: {
            name:     'string',
            birthday: 'date',
            cars:     'Car[]',
            picture:  'data?' // optional property
        }
    }

}

module.exports = AppSchema;