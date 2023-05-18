# Node-TBuys #

用户购物电商网站：Node+Express+MongoDB+Mongoose

**实现功能：**

1. 注册
 
2. 登录

3. 添加商品

4. 加入购物车和结算

## 步骤 ##

> 
1. `git clone path`下载项目到本地；
2. `npm install`安装依赖和相关插件;
3. 安装`MongoDB`,设定数据库存放位置`mongod --dbpath "D:\MongoDB\data\tbuysdb"`，可以自主设定，启动数据库；
4. 运行项目`node app.js`,打开浏览器进行测试，端口号`3000`，可自由设定监听端口
5. 先编辑更改运行目录，运行`server.bat`一键运行`mongodb`和`node`服务

## 依赖更新解决 ##

- 在更新了依赖库之后，`bson`在`node-modules`下没有`build/Release/bson.js`这个库文件，所有需要手动添加这个依赖库；
- **推荐使用原项目的依赖版本，可以满足实际需求。**

## 连接MongoDB数据库的问题 ##

- 这个项目的数据存放在`MongoDB`下的`data/tbuysdb`文件夹下，这个文件夹是手动创建的，可以根据需要自行调整；
- 连接数据库的操作步骤是：在`cmd/PowerShell`或Linux终端上进入`mongodb/bin`文件夹，Windows用户可以进入`mongodb/bin`文件夹按住Shift键点击鼠标右键可以快速进入`cmd/PowerShell`，输入MongoDB数据库启动命令：`mongod --dbpath "数据存放位置"`（上面有提及）。如果在操作时没有响应，可以按`Ctrl+X`键即可。

## 网站图片抓取

- 创建图片下载目录`public/crawlerImg`
- 开始抓取`start_crawler.bat`，清空图片`clean_image.bat`

## 后续 ##

> 此项目只是完成了基本的内容，如果感兴趣，可以进行扩展，变更，使这个电商网站系统更加完善，稳定。
> 欢迎在`issues`提交问题和建议。

**欢迎Follow我的[Github](https://github.com/whjin)，站点：[项目总集](https://whjin.github.io/docs/)，博客：[吴华锦](https://whjin.github.io/)**
