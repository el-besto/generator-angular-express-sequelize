var db = require('../models')

// may want to lower-case all of my entities so that I am not bitten by this bug...
// How do i mitigate this?

// There are a couple of options. By far the easiest would by to change the name of all your models and relations to lower case - that will keep all the names the same. If, for some reason you don't want to change the name of your models or associations, you will have to go through all the places in your app where the model is used in eager loading and make sure that the name is correct.

exports.findAll = function(req, res) {
  db.<%= _.capitalize(name) %>.findAll()
    .then(function (entities) { res.json(entities) })
    .catch(function (err) { console.log(err)});
}

// error handling with promises... and ensuring JSON is actually json.. 
// getJSONFromSomewhere().then(function(jsonString) {
//     return JSON.parse(jsonString);
// }).then(function(object) {
//     console.log("it was valid json: ", object);
// }).catch(SyntaxError, function(e){
//     console.log("don't be evil");
// });

exports.find = function(req, res) {
  db.<%= _.capitalize (name) %>.find({ where: { id: req.param('id') } })
    .then(function (entity) { res.json(entity) })
    .catch (function (err) { res.send(404); console.log(err); });
}


exports.create = function(req, res) {
  db.<%= _.capitalize (name) %>
    .create(req.body)
    .then(function (entity) { res.statusCode = 201; res.json(entity) })
    .catch(function (err) { res.send(404); console.log(err); });
}


// for CREATE method use SPREAD promise style
//https://github.com/sequelize/sequelize/wiki/Upgrading-to-2.0
// Methods returning multiple arguments
//// Since we have switched to promises you will need to use .spread() for methods that return multiple argument, this includes, but is not limited to: findOrCreate, findOrInitialize, update
exports.update = function(req, res) {
  db.<%= _.capitalize(name) %>.find({ where: { id: req.param('id') } })
    .then(function (entity) {
      entity.updateAttributes(req.body)
            .spread(function (entity, metadata) { res.json(entity); console.log(metadata); })
            // may not need two catch statments here... also ; on line 48 may be problem for line 50
            .catch (function (err) { res.send(404); console.log(err); });
      })
    .catch(function (err) { res.send(500); console.log(err); });
}
// original entity code from angular-express-sequelize
// exports.update = function(req, res) {
//   db.<%= _.capitalize(name) %>.find({ where: { id: req.param('id') } })
//     .then(function(entity) {
//         entity.updateAttributes(req.body).then(function(entity) {
//         res.json(entity)
//       })
//     } else {
//       res.send(404)
//     }
//   })
// }


exports.destroy = function(req, res) {
  db.<%= _.capitalize(name) %>.find({ where: { id: req.param('id') } })
    .then(function(entity) {
      entity.destroy()
            .then(function () { res.send(204) })
            .catch(function (err) { res.send(404); console.log(err); }); 
    })
    .catch (function (err) {res.send(500); console.log(err); });
}
