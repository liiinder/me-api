const express = require('express');
const router = express.Router();

router.get('/week/1', function (req, res) {
    const report = [
        {
            header: `Länk till github repo`,
            text: "https://github.com/liiinder/jsramverk"
        },
        {
            header: "Project setup",
            text: "npm install"
        },
        {
            header: "Compiles and hot-reloads for development",
            text: "npm run serve"
        },
        {
            header: "Compiles and minifies for production",
            text: "npm run build"
        },
        {
            header: "Lints and fixes files",
            text: "npm run lint"
        }
    ];

    res.json({ data: report });
});

router.get('/week/2', function (req, res) {
    const report = [
        {
            header: "",
            text: `
        Största inspirationen till formuläret var <a href="https://www.smashingmagazine.com/2017/07/designing-perfect-date-time-picker/">smashingmagazines</a> artikel.
        Framförallt deras bild på googles gmail lösning för födelsedags formuläret.
        Men även en del inspiration från föreläsningen mitt största fokus så var att få det så användarvänligt för dom som bara använder tangentbord.
            `
        },
        {
            header: "",
            text: `
        Tycker personligen det är lite tydligare med att skriva ut månaden i text form även om man nu borde veta vilket nummer ens månad har.
        Så använde mig av optgroups för att lägga in båda alternativen som slutligen ger backend samma value.
        Det gör att oavsett om man skriver april eller 04 så kommer den visa "april" och vill man lägga till så det räcker med 4 så kan man även göra det.
        Angående dagarna så är det automatiskt 31 dagar då dagarna väljs beroende på vilket år/ månad man valt, har man inte valt något så kommer den gå på default i javascripts datetime som är 31.
        När man väl har valt en månad så kommer dagar anpassa sig reaktivt och man kan bara välja ett datum som stämmer vilket även fungerar för skottår.
        `
        },
        {
            header: "",
            text: `
        En annan sak som kändes viktigt var att lösa en större checkbox som bättre matchade resten av dokumentet.
        Det tog dock betydligt längre tid än jag hade tänkt men tycker min lösning är helt okej!
        Sedan en knapp för att toggla lösenordet då det underlättar enormt att kunna se så man har skrivit rätt.
        För dom som tabbar sig fram så är det bättre att den knappen ligger före lösenordet så dom som
        tabbar sig fram kan välja det före dom skriver in lösenordet istället för att dubbeltabba,
        välja att se lösenordet tabba tillbaka skriva in lösenordet och sen dubbeltabba igen för att komma vidare.
            `
        },
        {
            header: "Övrigt",
            text: `
        Hade varit kul att designa någon popup kalender också men det kändes inte direkt nödvändigt för ett födelsedatum och väldigt overkill för detta kursmoment
        både i mängd arbete och vad som behövs om man ser till UX. Finslipade lite på min me-sida och la till en ny komponent för ReportNav och testade runt lite med ramverket.
        Ser fram emot nästa vecka då man kan koppla allt till ett backend/api och få alla sidor att fungera dynamiskt.
            `
        }
    ];

    res.json({ data: report });
});

router.get('/week/3', function (req, res) {
    const report = [
        {
            header: "",
            text: ``
        }
    ];

    res.json({ data: report });
});

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            // send error response
        }

        // Valid token send on the request
        next();
    });
}

module.exports = router;
