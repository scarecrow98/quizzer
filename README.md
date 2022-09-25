# Program működése
 - A kérdőív létrehozásához be kell jelentkezni Google SingIn-nel
 - Belépés után látható egy felület, melyen a user előző kérdőívei, és azok eredményei láthatók
 - Lehet új kérdőívet létrehozni egy új oldalon
     - Kérdőívnek kell egy cím
     - "+" gombbal lehet felvenni kérdéseket, aminek lehet 3 típusa (feleletválasztós, szöveges, numerikus)
     - mentés után megjelenik egy link, erre rákattintva lehet elérni a tesztet
 - A linket megnyitva a usernek be kell lépnie szintén Google fiókkal
 - A tesztet addig nem érhető el, míg nincs az első kérdés aktiválva 
     - Egymás után lehet megnyitni a kérdéseket gombnyomással
     - Amikor egy kérdés megnyílik, websocketen kap egy message-t a felcsatlakozott user, hogy megnyílt a kövi kérdés, átugorhat rá.
 - A kérdést ki kell tölteni, majd gombbal beküldeni. A beküldéskor a rest apinek küldi el az üzenetet, az elmenti a választ, majd szól a websocket szervernek, hogy küldje ki a kérdőívet készítőnek, hogy új válasz jött.
     - a diagrammos felületen kirajzolódik valós időben a válaszok eloszlása,
     tehát, a lehetséges értékek listája, illetve, hogy ezekre hányan szavaztak (oszlopdiagrammon mondjuk)
