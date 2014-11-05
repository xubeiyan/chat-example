chat-example
============

a web chat-room example with node.js and websocket   
使用Node.js和websocket实现的在线聊天例子

Modified from https://github.com/sitegui/nodejs-websocket/tree/master/samples/chat    
从https://github.com/sitegui/nodejs-websocket/tree/master/samples/chat 修改得到    
Try to set the form of message to JSON, to distinguish system message, other's message and my own message   
尝试了修改消息格式为JSON，能区分系统和其他人和自己的发言   

###玩耍方法(How to use it)###
type command in terminal: >node chat.js  
and view this address in browser: localhost:8080  
在命令行输入：node chat.js   
然后打开浏览器访问：localhost:8080   
    
    
###修改历史(Update History)###
2014.11.05     
add error handler for websocket server to avoid exiting when one user logging out    
增加了error消息处理避免某个用户退出时引发websocketserver退出

