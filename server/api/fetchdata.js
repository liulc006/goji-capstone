const express = require('express');
const app = express.Router();
const { User, Dog, Service, ServiceEvent, Review } = require('../db');

module.exports = app;

//get all users
app.get('/users', async(req, res, next)=> {
    try {
      res.send(await User.findAll()); 
    }
    catch(ex){
      next(ex);
    }
  });

//get all dogs
app.get('/dogs', async(req, res, next)=> {
    try {
      res.send(await Dog.findAll()); 
    }
    catch(ex){
      next(ex);
    }
  });

//get all users with dogs, which means dogowners with their dog
app.get('/user-dogs', async(req, res, next)=> {
    try {
        const response = await User.findAll(
            {
                where: {isWalker : false},
                include: Dog
            }
        )
      res.send(response); 
    }
    catch(ex){
      next(ex);
    }
  });

//get all the service
app.get('/services', async(req, res, next)=> {
    try {
        res.send(await Service.findAll()); 
    }
    catch(ex){
        next(ex);
    }
})

//get all users with services, which means dogwalkers with their service types
app.get('/user-services', async(req, res, next)=> {
    try {
        const response = await User.findAll(
            {
                where: {isWalker : true},
                include: Service
            }
        )
      res.send(response); 
    }
    catch(ex){
      next(ex);
    }
  });
  

//get all the serviceevents
app.get('/serviceevents', async(req, res, next)=> {
    try {
        res.send(await ServiceEvent.findAll()); 
    }
    catch(ex){
        next(ex);
    }
})

//get the service history of dogowners 
//the information we need is the time and dogwalker information
//this is very complicated
app.get('/owner-servicehistory', async(req, res, next)=> {
    try {
        const response = await User.findAll(
            {
                where: {isWalker : false}, //findout the dogowner 
                include: [
                    {
                        model: Dog, //findout dogs by this owner
                        include: [
                            {
                                model: ServiceEvent, //fiindout the serviceevent
                                include: [
                                    {
                                        model: Service, // findout the service
                                        include: [
                                            {
                                                model: User, // find the walker
                                            }
                                        ]
                                    },
                                    {
                                        model: Review, // find out the review related to this event, in frontend we need to check the userId === user.id? to make sure it is from owner or walker
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        )
      res.send(response); 
    }
    catch(ex){
      next(ex);
    }
});


//get the service history of dogwalkers 
//this is very complicated
app.get('/walker-servicehistory', async(req, res, next)=> {
    try {
        const response = await User.findAll(
            {
                where: {isWalker : true}, //findout the walkers
                include: [
                    {
                        model: Service, //findout service by this walker
                        include: [
                            {
                                model: ServiceEvent, //fiindout the serviceevent
                                include: [
                                    {
                                        model: Dog, // findout dogs
                                        include: [
                                            {
                                                model: User, // find the owner
                                            }
                                        ]
                                    },
                                    {
                                        model: Review, // find out the review related to this event, in frontend we need to check the userId === user.id? to make sure it is from owner or walker
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        )
      res.send(response); 
    }
    catch(ex){
      next(ex);
    }
});