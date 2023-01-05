const express=require("express")
const { model } = require("mongoose")
const router=express.Router()
const Person=require("../models/person")

//Create and safe a record of a model
let createAndSavePerson = function (done) {
    var personInstance = new Person({name: 'Frank', age: 25, favoriteFoods: ['Sushi', 'Gluten free pasta']});
    personInstance.save((err, data) => err ? done(err) : done(null, data));
};

//creating many records with model.create
let arrayOfPeople = [
    {name: "Test", age: 24, favoriteFoods: ['Pizza', 'Cheese']},
    {name: "TestPerson", age: 22, favoriteFoods: ['Coke', 'Garlic Bread']}
];

let createManyPeople = function (arrayOfPeople, done) {

    Person.create(arrayOfPeople, (err, data) => {
        if (err) {
            return done(err);
        }
        return done(null, data);
    });
};

//Use model.find() to search your Database
let findPeopleByName = function (personName, done) {
    Person.find({name: personName}, (err, data) => {
        if (err) {
            return done(err);
        }
        return done(null, data);
    });
};

//Use model.findOne() to return a single matching document from your database
let findOneByFood = function (food, done) {

    Person.findOne({favoriteFoods: food}, (err, data) => {
        if (err) {
            return done(err);
        }
        return done(null, data);
    });

};

//Use model.findById() to serarch your database by _id
let findPersonById = function (personId, done) {

    Person.findById({_id: personId}, (err, data) => {
        if (err) {
            return done(err);
        }
        return done(null, data);
    });

};

//Classic updates by running Find, Edit and Save
let findEditThenSave = function (personId, done) {
    let foodToAdd = 'hamburger';

    Person.findById(personId, function (err, data) {
        if (err) {
            done(err);
        }

        data.favoriteFoods.push(foodToAdd);
        data.save((err, data) => (err ? done(err) : done(null, data)));
    });
};

//Performe new updates on a document using model.findOne and Update
let findAndUpdate = function (personName, done) {

    Person.findOneAndUpdate({name: personName}, {$set: {age: 20}}, {new: true}, function (err, data) {
        if (err) {
            done(err);
        }
        done(null, data);
    });
};

//Performe new updates on a document using model.findOne and remove
let removeById = function (personId, done) {

    Person.findOneAndRemove(personId, function (err, data) {
        if (err) {
            done(err);
        }
        done(null, data);
    });

};

//Delete one document using model.findById and remove

// Delete Many Documents with model.remove()  
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, (err, response) => {
      if(err) return console.log(err);
      done(null, response);
    })
  };

//Chain search query helpers to narrow search results
const queryChain = (done) => {
    var foodToSearch = "burrito";
   
    Person
    .find({favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
  };
  
  

module.exports=router