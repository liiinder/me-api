DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "birth" VARCHAR(8),
    "name" VARCHAR(255),
    UNIQUE("email")
);

DROP TABLE IF EXISTS reports;

CREATE TABLE IF NOT EXISTS reports (
    "week" VARCHAR(2) NOT NULL,
    "text" TEXT
);

INSERT INTO reports ("week", "text") VALUES
    ("0", "<h3>Välkommen till min redovisningssida</h3><p>Välj ett kursmoment i dropdownen ovan...</p>"),
    ("1", "Länk till github repo https://github.com/liiinder/jsramverk"),
    ("2", 'Hade varit kul att designa någon popup kalender också men det kändes inte direkt nödvändigt för ett födelsedatum och väldigt overkill för detta kursmoment
        både i mängd arbete och vad som behövs om man ser till UX. Finslipade lite på min me-sida och la till en ny komponent för ReportNav och testade runt lite med ramverket.
        Ser fram emot nästa vecka då man kan koppla allt till ett backend/api och få alla sidor att fungera dynamiskt.'),
    ("3", ""),
    ("4", ""),
    ("5", ""),
    ("6", ""),
    ("10", "")
    ;