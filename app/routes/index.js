var Pk = require('../modules/Pk');
var Articles = require('../modules/article');
var Util = require('../util/commonUtil');

var md = require( "markdown" ).markdown;

/* jshint ignore:start */
exports.index = function(req, res) {
  res.render('index',{config:Util,article:false});
};
exports.query = function(req, res) {
  var id = req.query.areId;
  var aa= {
    code: '200',
    msg:'ok'
  }
  res.send(aa);
};
exports.get = function(req, res) {
  var id = req.params.id;
  var sql={
    art_id:id
  };
  Articles.findOne(sql,function(err,article){
    if(err)console.log(err);
    res.render('detail',{config:Util, article: article});
  });
};
exports.getEdit = function(req, res) {
  var id = req.params.id;
  var sql={
    art_id:id
  };
  Articles.findOne(sql,function(err,article){
    if(err)console.log(err);
    res.render('index',{config:Util, article: article});
  });
};
exports.update = function(req, res) {
  var sql = {
    art_id: parseInt(req.params.id),
    title: req.body.title,
    content: req.body.content,
    markContent: req.body.markContent,
    createTime: Util.currentDate(),
    author: req.body.author
  };
  var id={
    art_id:parseInt(req.params.id)
  };
  Articles.update(id,{$set:sql},function(err,article){

    if(err) console.log(err);
    res.send({
      code: 200,
      areId: id.art_id,
      msg: 'success'
    });
  });
};
exports.save = function(req, res) {

  var callback = function(id) {
    var sql = {
      art_id: id,
      title: req.body.title,
      content: req.body.content,
      markContent: req.body.markContent,
      createTime: Util.currentDate(),
      author: req.body.author
    };
    console.log(sql);
    var Article= new Articles(sql);
    Article.save(function(err){
        if(err)console.log(err);
        console.log("insert Articles success");
        res.send({
          code: 200,
          areId: id,
          msg: 'success'
        });
    });
  }
  Pk('articles',callback);
};
/* jshint ignore:end */

