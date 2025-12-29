const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

//-----------------READING ALL HTML FILE------------------------------------------------------------
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

//--------------READING JSON FILE-----------------------------------------------------------------------
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

//-------------------------------SERVER--------------------------------------------------------
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //---------OVERVIEW PAGE--------------------------------------
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //----------PRODUCT PAGE-----------------------------------------
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  }
  //----------API PAGE--------------------------------------------
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //----------ERROR PAGE----------------------------------------
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "hello",
    });
    res.end("Page not Found");
  }
});

//----------------SERVER START--------------------------------------------------------------------------------
server.listen(8000, "127.0.0.1", () => {
  console.log("Listning to 8000");
});
