# Alfred小工具`mitip`制作总结

## 主体流程规划
```flow
st=>start: mp keyword
e=>end
op1=>operation: 后台接收keyword
op2=>operation: 查询数据库
op3=>operation: 返回List数据
op4=>operation: Alfred 前台展现

st->op1->op2->op3->op4->e

```

## 学习总结

### `AngularJs`的初步尝试

前端页面，采用了现有模板[Angular Material](https://material.angularjs.org/latest/#/)

初步了解`Angularjs`的基本语法

### `nodejs+mongodb`经典模式

利用`nodejs`完成基本后台逻辑的编写

### `elasticsearch`初步尝试

具有搭建简单，restful APi的特点

### `python`的初步尝试
简单利用`python` 完成基本的http请求，数据处理

### 基于`docker`的环境搭建

利用`docker`完成，后台运行环境，包括`mongodb`,`elasticsearch`的环境搭建

##ToDoList

- [ ] 完成头像的采集
- [ ] 数据的填充
