# Believe Fitness

Jan, WU13

Valgfri opgave B – Opret bruger er valgt.

## Tech stack

### Next.js

Next.js er et JavaScript-framework bygget oven på React. Det er komponentbaseret og benytter fil-baseret routing, hvilket betyder, at mappestrukturen automatisk definerer applikationens routes.

Jeg har valgt at bruge Next.js, fordi frameworket allerede har truffet en række arkitektoniske beslutninger for mig, f.eks. hvordan routing er opbygget, server- og klientkode adskilles, og hvorledes datahentning håndteres. Det giver en mere ensartet og skalerbar kodebase.

Derudover har Next.js:

* Et stort community
* Et stort økosystem af plugins og værktøjer
* En vis efterspørgsel på arbejdsmarkedet, dog er ren React ofte mere efterspurgt

Next.js understøtter også både **server-side rendering (SSR)** og **static site generation (SSG)**. Det betyder, at sider kan genereres på serveren før de sendes til brugeren, hvilket kan forbedre både performance og SEO.

En anden fordel er, at Next.js gør det muligt at oprette **API routes** direkte i projektet. Det betyder, at backend-funktionalitet kan implementeres uden nødvendigvis at oprette en separat backend-server, hvilket kan gøre udviklingen hurtigere og mere overskuelig i mindre projekter.

---

### Tailwind

Tailwind er et CSS framework. I stedet for at skrive CSS med egne klasser, bruger man predefinerede utility-klasser direkte i HTML/JSX.

Det giver hurtigere udvikling, da man ikke hele tiden skal skifte mellem CSS-filer og HTML/JSX. Det gør også stylingen mere overskuelig, da den befinder sig samme sted som markup og komponentlogik.

Det vil også gøre det nemmere for den næste programmør, der skal arbejde på projektet, da vedkommende ikke skal sidde og prøve at finde rundt i mange forskellige CSS-filer.

Tailwind gør det også lettere at arbejde med **responsive design**, fordi frameworket indeholder indbyggede klasser til forskellige skærmstørrelser. Det gør det muligt hurtigt at tilpasse layoutet til mobil, tablet og desktop.

En anden fordel er, at man kan definere egne designregler i **Tailwinds konfigurationsfil**, f.eks. farver, spacing og typografi. På den måde kan man skabe et mere konsistent designsystem på tværs af hele applikationen.

Udover at det skal transpileres, er det svært at finde mange ulemper ved Tailwind. Nogle udviklere mener dog, at HTML/JSX kan blive sværere at læse, fordi der kan være mange klasser på ét element.

---

### JavaScript

JavaScript er fundamentet for hele applikationen. Det bruges til komponentlogik, datahentning med efterfølgende dynamisk rendering samt tilstandshåndtering.

JavaScript gør det muligt at skabe **interaktive brugergrænseflader**, hvor indhold kan opdateres dynamisk uden at genindlæse siden. Det er en central del af moderne webapplikationer.

Til større projekter er **TypeScript** ofte et bedre valg, da det har statisk typekontrol. Det betyder, at typefejl kan opdages før programmet køres, hvilket gør det bedre egnet til store og skalerbare projekter.

Ulemperne er blandt andet, at det skal transpileres til JavaScript og at det tilføjer ekstra kompleksitet til udviklingen.

Undertegnede har ikke særligt meget erfaring med TypeScript, og JavaScript er derfor blevet valgt i stedet. Hvis projektet vokser og får flere features, brugere og udviklere, vil TypeScript dog være en fordel, fordi det:

* Reducerer fejl
* Gør API-respons tydeligere
* Gør samarbejde lettere
* Gør vedligeholdelse nemmere

JavaScript er fint til mindre projekter eller prototyper, men i en professionel produktion vil mange virksomheder foretrække TypeScript, især i frameworks som Next.js.


### Projektstruktur i Next.js

Next.js anvender en filbaseret struktur, hvor mapper og filer automatisk bliver til routes i applikationen. Det betyder, at man ikke manuelt skal konfigurere routing, som man ofte skal i almindelige React-applikationer.

I projektet er strukturen opdelt i forskellige mapper for at gøre koden mere overskuelig og lettere at vedligeholde. Typisk vil et Next.js projekt indeholde mapper som:

- **app / pages** – indeholder de forskellige sider i applikationen  
- **components** – genbrugelige React-komponenter  
- **lib** – hjælpefunktioner og logik  
- **public** – statiske filer som billeder og ikoner  

Ved at opdele projektet på denne måde bliver det nemmere at navigere i koden, især hvis projektet vokser i størrelse. Komponenter kan genbruges på tværs af flere sider, hvilket reducerer mængden af gentaget kode.

En klar struktur gør det også lettere for andre udviklere at forstå projektet. Hvis flere udviklere arbejder på samme projekt, er det vigtigt, at projektets struktur er logisk og konsistent.

Next.js opfordrer generelt til en struktur, hvor **UI-komponenter, datahåndtering og logik er opdelt**, hvilket gør applikationen mere modulær og lettere at vedligeholde.

---
## Kodeeksempel

### actions.jsx
``` javascript
import { redirect } from "next/navigation.js";

export async function saveMessage(formData) {
    "use server"
  const msg = formData.get("message");
  console.log("Besked modtaget:", msg);

const encodedMsg = encodeURIComponent(msg);

  redirect(`/aktiviteter?searchstr=${encodedMsg}`);
}

``` 
[actions.jsx](./src/app/search/actions.jsx)

### page.jsx
``` javascript
import Image from "next/image";
import { saveMessage } from "./actions";

export default async function SearchPage() {

    return (
        <div>
             <form
                action={saveMessage}
                className="mx-auto flex max-w-md items-center gap-3 rounded-2xl  p-6 "
            >
                <input
                    name="message"
                    placeholder="Søg"
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-white placeholder-gray-400 focus:bg-[#C4C4C4] focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <button
                    type="submit"
                    className="rounded-xl px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                >
                     <Image className=" rounded-[39px_39px_0px_39px]"
                                         src="/search.png"
                                        alt="Search"
                                        width={24}
                                        height={24}
                                        unoptimized
                                    ></Image>
                </button>
            </form>
       </div>
    );
}
``` 
[page.jsx](./src/app/search/page.jsx)


Koden består af en server action (saveMessage) og en React-komponent (SearchPage), som viser en søgeformular. Det er en serverstyret søgeformular i next.js, det hele foregår på serveren.

Formålet er at lade brugeren skrive en søgetekst i et inputfelt og sende teksten til serveren. Det omdirigere til den samme side (/aktiviteter), men vedhæftet søgeteksten som en query-parameter i URL’en
F.eks. hvis brugeren skriver "Tango", bliver man sendt til /aktiviteter?searchstr=Tango
Det gør det muligt at filtrere aktiviteter baseret på brugerens input.

###Server Action

 `export async function saveMessage(formData) { `
     `"use server" `

"use server" fortæller Next.js, at funktionen skal køre på serveren.

Funktionen modtager automatisk formData fra formularen.

 `const msg = formData.get("message");`  henter værdien fra inputfeltet med name="message".

 `const encodedMsg = encodeURIComponent(msg); `  sikrer at specialtegn (f.eks blanktegn og æ, ø og å) bliver korrekt omsat til URL-format.

 `redirect(`/aktiviteter?searchstr=${encodedMsg}`);`  brugeren redirigeres til aktiviteter, men nu med en søgestreng som query-parameter.


###SearchPage komponenten (Formularen)

 `<form action={saveMessage}>` : formularens action peger  på server action funktionen. Når brugeren trykker "submit", kaldes saveMessage funktionen.

 `<input name="message" />` er vigtigt. Det er denne værdi, serveren henter med formData.get("message").

