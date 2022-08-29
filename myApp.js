require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema  = new Schema({
  name : {
    type: String,
    required: true
  },
  age : Number,
  favoriteFoods : [String]
  }
);

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function(done) {
  var hahaweta = new Person({name:"hahaweta", age: 23, favoriteFoods: ["steak", "sushi"]});
  hahaweta.save(function(err, hahaweta){
    if (err) return console.error(err);
    done(null, hahaweta)
  })
};

var arrayOfPeople = [{name:"paul", age: 18, favoriteFoods: ["apple", "tacos"]}, 
{name:"dan", age: "21", favoriteFoods:["rice", "ramen"]}, 
{name:"bart", age:25, favoriteFoods:["chicken", "chips"]}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, arrayOfPeople){
    if (err) return console.error(err);
    done(null, arrayOfPeople);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name :personName}, function(err, personName){
    if (err) return console.error(err);
    done(null, personName);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foodFound){
    if (err) return console.error(err);
    done(null, foodFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, IdFound){
    if (err) return console.error(err);
    done(null, IdFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {$set: {age: ageToSet}}, {new: true}, (err, updatedPerson) => {
    if (err) return console.error(err);
    done(null, updatedPerson);
})
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, updatedPerson) => {
    if (err) return console.error(err);
    done(null, updatedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, updatedPerson) => {
    if (err) return console.error(err);
    done(null, updatedPerson);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
