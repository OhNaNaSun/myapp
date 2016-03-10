var obj = {
    "data":{
        "couponList":[
            {   // 一张普通代金券的结构
                "biz":"hotel",
                "couponName":"酒店代金券",  // 常规代金券的结构
                "typeCode": 1,
                "couponId":"111111111",
                "statusCode": 1,
                "startDate":"2014-2-5",
                "endDate":"2015-4-8",
                "remarkType":1,//0无提醒，1新增，2快过期
                "ruleDesc":"使用描述。。",
                "count":10,
                "value":"50"
            },
            {   // 一张酒店代金券的结构
              "biz":"hotel",
              "couponName":"酒店代金券",  // 常规代金券的结构
              "couponId":"111111111",
              "remarkType":1,//0无提醒，1新增，2快过期
              "subCouopnList":[
                  {
                      "rank": 1,
                      "couponName":"子代金券名称",  // 常规代金券的结构
                      "startDate":"2014-2-5",
                      "endDate":"2015-4-8",
                      "ruleDesc":"使用描述。。",
                      "count":10,
                      "value":"50",
                      "statusCode": 1
                  }
              ]
            }
        ],
        "bottomBtn":[
            {
               "desc":"得500元红包",
               "schema":"xxxxxxxxx"
            }
        ],
        "page": 0,
        "limit": 10,
        "tPage": 5,
        "biz":"hotel",
        "sort":"issueTime",
        "bizList":[
           {
                  "desc":"全部业务",
                  "key":""
           },
           {
                  "desc":"酒店",
                  "key":"hotel"
           }
        ],
        "sortList":[
              {
                  "desc":"领取时间",
                  "key":"issueTime"
              }
        ]
    },
    "bstatus":{
        "code": 0,
        "msg":"成功"
    }
}
module.exports = obj;