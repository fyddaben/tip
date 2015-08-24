var Pk = require('../modules/Pk');
var Articles = require('../modules/article');
var Util = require('../util/commonUtil');

/* jshint ignore:start */
exports.index = function(req, res) {
  res.render('index');
};
exports.query = function(req, res) {
  var id = req.query.areId;
  var aa= {
    code: '200',
    msg:'ok'
  }
  res.send(aa);
};
exports.update = function(req, res) {
  var id = req.body;
  console.log('idupdate', id);
  res.send('idupdate' + id);
};
exports.save = function(req, res) {

  var callback = function(id) {
    var sql = {
      art_id: id,
      title: req.body.title,
      content: req.body.content,
      createTime: Util.currentDate(),
      author: req.body.author
    };
    var Article= new Articles(sql);
    Article.save(function(err){
        if(err)console.log(err);
        console.log("insert Articles success");
        res.send({
          code: 200,
          msg: 'success'
        });
    });
  }
  Pk('articles',callback);
};
/* jshint ignore:end */

