/**
 * ChampsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  get: function(req, res) {
    Champ.find().then(function(champs) {
      if (!champs || champs.length == 0) {
        return res.send({ 'success': false, 'message': 'Champ not found' });
      }

      return res.send({'success': true, 'message': 'record fetched', 'data': champs});
    }).catch(function(err) {
      sails.log.debug(err);
      return res.send({ 'success': false, 'message': 'No record found' });
    });
  },

  create: function(req, res) {
    Champ.create(req.allParams().champion).then(function(champ) {
      return res.send({
        'success': true,
        'message': 'Record created',
        'data': champ
      });
    }).catch(function(err) {
      sails.log.debug(err);
      return res.send({
        'success': false,
        'message': 'Unable to create champ'
      })
    });
  },

  update: function(req, res) {
    Champ.update(req.param('id'), req.allParams().champion).then(function(champ) {;
      return res.send({
        'success': true,
        'message': 'Record updated',
        'data': champ
      });
    }).catch(function() {
      return res.send({
        'success': false,
        'message': 'Unable to update champ'
      });
    });
  },

  destroy: function(req, res) {
    Champ.destroy(req.param('id')).then((champ) => {
      return res.send({
        'success': true,
        'message': 'Champ deleted',
        'data': champ
      });
    }).catch((err) => {
      return res.send({
        'success': false,
        'message': 'Unable to delete champ'
      });
    });
  }

};
