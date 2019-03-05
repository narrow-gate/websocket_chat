var ws = require('nodejs-websocket');
var server = ws.createServer(function (conn) {
    console.log('New connection');
    conn.on('text', function (str) {//str是客户端传过来的字符串
        console.log(str);
        //conn.sendText(str);//把客户端发送的东西传回客户端
        //**broadcast(str);//采用直接广播
        var data = JSON.parse(str);
        switch (data.type) {
            case 'setname':
             /**
              *  conn.nickname = data.name;
               // broadcast(data.name + '加入了房间');
                broadcast(JSON.stringify({
                    type: 'serverinfo',
                    info: conn.nickname + '加入了房间'
              */
             conn.nickname = data.name;
                broadcast(JSON.stringify({
                    name: 'Server',
                    text:data.name+'加入了房间'
            }))
                break;
            case 'chat':
             /**
              *   conn.text = data.text;
                broadcast(conn.text);
              */
                broadcast(JSON.stringify({
                  /**
                   *  name: conn.nickname,
                    text: data.text,
                    type:'chat'
                   */
                    name: conn.nickname,
                    text: data.text,
                }));
                break;
            default:
                break;
        }
    });
    conn.on('close', function () {
       // broadcast(conn.nickname + '离开了房间');
       broadcast(JSON.stringify({
        name: 'Server',
        text:data.name+'离开了房间'
}))
    })
    conn.on('error', function (err) {
        console.log(err);
    });
}).listen(2333);//创建一个端口监听
function broadcast(str) {
    server.connections.forEach(function (conn) {
        conn.sendText(str);//将遍历到的str全部发送给sendText
    });

}