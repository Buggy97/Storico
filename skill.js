var fs = require("fs");

function getRandomFact(File, Reader)
{
    var facts = Reader.readFileSync(File, "utf-8");
    facts = facts.split(",\r\n        \"event\": ");
    var factNo = parseInt(Math.floor(Math.random()*facts.length));
    var fact = JSON.parse(facts[factNo]);
    var date = fact.date.split("/").reverse().join("/");
    return                  (fact.date.includes("/") ? "Data " : "Anno ") + 
                            (fact.date < 0 ? (Math.abs(fact.date) + " Ac ") : fact.date.split("/").reverse().join("/")) + 
                            ". " + fact.description;
}
function getRandomFactByYear(File, Reader, Year)
{
    var facts = Reader.readFileSync(File, "utf-8");
    facts = facts.split(",\r\n        \"event\": ");
    facts.shift();
    facts = getFactsByYear(facts, Year);
    if (facts.length == 0)
        return "Mi dispiace, ma non ho trovato nessun fatto per l'anno che hai fornito.";
    var factNo = parseInt(Math.floor(Math.random()*facts.length));
    var fact = JSON.parse(facts[factNo]);
    return  (fact.date.includes("/") ? "Data " : "Anno ") + 
            (fact.date < 0 ? (Math.abs(fact.date) + " Ac ") : fact.date.split("/").reverse().join("/")) + 
            ". " + fact.description;
}

function getFactsCount(File, Reader)
{
    var count = Reader.readFileSync(File, "utf-8");
    count = count.split(",\r\n        \"event\": ")[0];
    return JSON.parse(count).count;
}
function getFactsByYear(Facts, Year)
{
    var ret = [];
    Facts.forEach(function(item, index)
                {
                    var item2 = JSON.parse(item);
                    if (item2.date!=undefined && parseInt(item2.date.split("/")[0]) == Year)
                        ret.push(item);
                });
    return ret;
}

console.log(getRandomFactByYear("facts.json", fs, -42));


