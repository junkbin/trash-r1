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

    static realDemoWrite(){
        try{
            let mpromise = Realm.open({schema: [AppSchema.CarSchema, AppSchema.PersonSchema]});
            mpromise.then((realm)=>{
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Affixusss',
                        model: 'Civic',
                        miles: 1000,
                    });
                    myCar.miles += 20; // Update a property value
                });
            }).catch((err)=>{
                console.log(err);
            });
        }catch(err){
            throw err;
        }
    }


    static realDemoWriteWithError(){
        try{
            let mpromise = Realm.open({schema: [AppSchema.CarSchema, AppSchema.PersonSchema]});
            mpromise.then((realm)=>{

                realm.write(()=>{
                    realm.create('Person', {
                        "name":"Virat", 
                        "birthday":new Date()});
                });

                throw new Error("Runtime Error");

                // Create Car
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Affixusss',
                        model: 'Civiccc',
                        miles: 10000,
                    });
                    myCar.miles += 20; // Update a property value
                });
            }).catch((err)=>{
                console.log(err);
            });
        }catch(err){
            throw err;
        }
    }

    static realDemoWriteWithErrorWithTxn(){
        try{
            let realm;
            let mpromise = Realm.open({schema: [AppSchema.CarSchema, AppSchema.PersonSchema]});
            mpromise.then((data)=>{
                realm = data;
                realm.beginTransaction();
                
                realm.create('Person', {
                    "name":"Virat Kohli", 
                    "birthday":new Date()});

                const myCar = realm.create('Car', {
                    make: 'Affixusss',
                    model: 'Civiccc',
                    miles: 10000,
                });

                throw new Error("Runtime Error!!");
                realm.commitTransaction();
            }).catch((err)=>{
                console.log(err);
                realm.cancelTransaction();
            });
        }catch(err){
            throw err;
        }
    }


    static main(){
        try{
            Main.realDemoWriteWithErrorWithTxn();
        }catch(err){
            console.error(err);
        }
    }
}




Main.main();