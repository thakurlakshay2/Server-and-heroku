
var http=require("http");
var url=require("url");
var fs=require("fs");
var json=fs.readFileSync("./data.json");           //buffer here
var template=fs.readFileSync("./templates/product.html");
var cardstemplate=fs.readFileSync("./templates/card.html")+" "; 
var overviewTemplate=fs.readFileSync("./templates/overview.html")+"";                //it is a buffer here
template=template+"";
json = JSON.parse(json);
// console.log(json[0]["productName"]);
function replace(template,product){
    template=template.replace(/{%PRODUCT NAME%}/g,product["productName"]);

    template=template.replace(/{%PRODUCT DESCRIPTION%}/g,product["description"]);

    template=template.replace(/{%IMAGE%}/g,product["image"]);

    template=template.replace(/{%PRICE%}/g,product["price"]);

    template=template.replace(/{%Quantity%}/g,product["quantity"]);

    template=template.replace(/{%Where%}/g,product["from"]);

    template=template.replace(/{%NUTRIENTS%}/g,product["nutrients"]);
    template=template.replace(/{%id%}/g,product["id"]);

    if(!product["organic"]){
        template=template.replace(/{%not-organic%}/g,"not-organic");
    }
   


    return template;
}


// product=product.replace(/{%PRODUCT DESCRIPTION%}/g,json[0]["description"]);
       //replace 
var server=http.createServer(function(req,res){
    //console.log(req.url);
    //console.log(url.parse(req.url,true));           //see query with false and then with true
    var myUrlObj = url.parse(req.url,true);
    // console.log(myUrlObj.query.id);
    if(req.url=="/" ||req.url==""  || req.url=="/homePage" ){
        // res.write("<h1>Home Page<h1>");
        var cards="";
        for(var i=0;i<json.length;i++){
            cards = cards+ replace(cardstemplate,json[i]);
            

        }
       overviewTemplate= overviewTemplate.replace(/{%CardsTemplate%}/g,cards);
       res.write(overviewTemplate);
    }
    else if(myUrlObj["pathname"]=="/product" ){

        var id=myUrlObj.query.id; 
        // console.log(id);
        var Productpage=replace(template,json[id]);
        res.write(Productpage);        
    }
    else if(req.url=="/api" ){
        res.write(json);
    }
    else{
        res.write("<h1>Error 404 not found<h1>");
    }
    res.end();
});

var port=process.env.PORT||3000;
server.listen(port,function(){
    console.log("Server is listening at port 3000");
});

//overview("HomePage","/","")

//product page->"/product"


//"/ap1"=>api =>show data.json to browser

//Error 404

