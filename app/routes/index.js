/* jshint ignore:start */
exports.index = function(req, res) {
  res.render('index');
};
exports.query = function(req, res) {
  var id = req.query.areId;
  res.send('query' + id);
  console.log('query', id);
};
exports.update = function(req, res) {
  var id = req.body;
  console.log('idupdate', id);
  res.send('idupdate' + id);
};
exports.save = function(req, res) {
  var id = req.body.title;
  res.send('ok');
  console.log(id);
};
/* jshint ignore:end */

