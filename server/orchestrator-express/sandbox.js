const Redis = require("ioredis");
const redis = new Redis()

redis.set('foo','bar')

redis.get('foo',function(err,result){
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})