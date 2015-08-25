var mongoose=require('../util/mongoUtil');

var Articles = mongoose.Schema({
  art_id:Number,
  title:String,
  content:String,
  markContent:String,
  createTime:String,
  author:String
});

var Articles = mongoose.model('articles', Articles);

module.exports=Articles;
