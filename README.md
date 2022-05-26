# React 项目 --- 好客租房

## 想要运行首先要开启数据库（数据库想要的可以找我：1714517741@qq.com）

数据库的文件名为 ：hkzf_v1

需要先把里面的 db 文件夹里面的 mysql 文件导入自己的数据库

数据库的账户和密码都是 root ，如果你的不是还请先修改，然后再导入

修改密码的操作为：

## `alter user 'root'@'localhost' identified with mysql_native_password by 'root'`


导入完成之后，在 hkzf_v1 目录下，打开 命令行，输入：

## `npm start`

完成后会提示数据库连接成功



接下来还需要安装 serve 全局包，运行如下命令：

## `npm i serve -g`

安装成功后，在项目的根目录下运行：

## `serve -s build`

打开给你的链接，即可看到界面
