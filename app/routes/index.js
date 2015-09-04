var Pk = require('../modules/Pk');
var Articles = require('../modules/article');
var Util = require('../util/commonUtil');

var md = require('markdown').markdown;

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'file', filename: 'logs/tipHistory.log', category: 'tip' }
  ]
});
var logger = log4js.getLogger('tip');

var request = require('request');

/* jshint ignore:start */
exports.index = function(req, res) {

  res.render('index',{config:Util,article:false});

};
exports.query = function(req, res) {

  var content = req.params.content;
  request(Util.searchSite + '/article/_search?q=' + encodeURIComponent(content), function(err, response, body) {
    if (err) {
      logger.error(err);
    }
    res.send(body);
  });

};
exports.get = function(req, res) {
  var id = req.params.id;
  if (id === 'new') {
    res.render('index',{config:Util,article:false});
    return false;
  }
  var sql={
    art_id:id
  };
  Articles.findOne(sql,function(err,article){
    if(err)logger.error(err);
    res.render('detail',{config:Util, article: article});
  });
};
exports.getEdit = function(req, res) {
  var id = req.params.id;
  var sql={
    art_id:id
  };
  Articles.findOne(sql,function(err,article){
    if(err)logger.error(err);
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

    if(err)logger.error(err);
    res.send({
      code: 200,
      areId: id.art_id,
      msg: 'success'
    });
  });

  //同时要保存到搜索引擎中
  request({
    method: 'PUT',
    uri:Util.searchSite + '/article/external/' + parseInt(req.params.id),
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(sql)
  }, function(err, response, body) {
    if (err) {
      logger.error(err);
    }
    logger.warn('statusCode: ' + response.statusCode);
    logger.info(body);
  })

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
    var Article= new Articles(sql);
    Article.save(function(err){
        if(err)logger.error(err);
        res.send({
          code: 200,
          areId: id,
          msg: 'success'
        });
    });

    //同时要保存到搜索引擎中
    request({
      method: 'PUT',
      uri:Util.searchSite + '/article/external/' + id,
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(sql)
    }, function(err, response, body) {
      if (err) {
        logger.error(err);
      }
      logger.warn('statusCode: ' + response.statusCode);
      logger.info(body);
    })
  }
  Pk('articles',callback);
};
/* jshint ignore:end */

