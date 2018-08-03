/**
 * Realm Demo. 
 */
const Realm = require('realm');
const AppSchema = require('./AppSchema');
  
class Main {
    
    static realmDemo() {
        try{
            Realm.open({schema: [AppSchema.CarSchema, AppSchema.PersonSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Honda',
                        model: 'Civic',
                        miles: 1000,
                    });
                    myCar.miles += 20; // Update a property value
                });

                // Query Realm for all cars with a high mileage
                const cars = realm.objects('Car').filtered('miles > 1000');

                // Will return a Results object with our 1 car
                cars.length // => 1

                // Add another car
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Ford',
                        model: 'Focus',
                        miles: 2000,
                    });
                });

                // Query results are updated in realtime
                cars.length // => 2
                    
                console.log(cars);
            }).catch(error => {
                console.log(error);
            });
        } catch(err){
            throw err;
        }
    }

    static main(){
        try{
            Main.realmDemo();
        }catch(err){
            console.error(err);
        }
    }
}




Main.main();