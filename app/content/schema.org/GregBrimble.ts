import type { Person } from "schema-dts";
import { GregBrimbleBrand } from "./GregBrimbleBrand";

export const GregBrimble: Person & { "@id": string } = {
  "@type": "Person",
  "@id": "https://gregbrimble.com/#GregBrimble",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      "@id": "https://gregbrimble.com/#TheUniversityOfEdinburgh",
      name: "The University of Edinburgh",
      sameAs: [
        "https://en.wikipedia.org/wiki/University_of_Edinburgh",
        "https://www.wikidata.org/wiki/Q160302",
        "https://www.ed.ac.uk/",
      ],
      url: "https://www.ed.ac.uk/",
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://gregbrimble.com/#CultsAcademy",
      name: "Cults Academy",
      sameAs: [
        "https://en.wikipedia.org/wiki/Cults_Academy",
        "https://www.wikidata.org/wiki/Q5193175",
        "https://cults-academy.aberdeen.sch.uk/",
      ],
      url: "https://cults-academy.aberdeen.sch.uk/",
    },
  ],
  award: [
    "Class Prize for Top Performance in Artificial Intelligence and Software Engineering (BEng)",
    "The IET Great Exhibition Diamond Jubilee Scholarship",
    "The James Clayton Undergraduate Scholarship",
  ],
  brand: {
    "@id": GregBrimbleBrand["@id"],
  },
  email: "hello@gregbrimble.com",
  familyName: "Brimble",
  gender: "https://schema.org/Male",
  givenName: "Greg",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "bachelor degree",
    educationalLevel: "undergraduate",
    recognizedBy: {
      "@type": "EducationalOrganization",
      "@id": "https://gregbrimble.com/#TheUniversityOfEdinburgh",
    },
    award: "First Class Honors",
    name: "BEng (Hons) Artificial Intelligence and Software Engineer",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
  },
  height: "1.74 meters",
  homeLocation: {
    "@type": "Place",
    "@id": "https://gregbrimble.com/#London",
    name: "London",
    sameAs: [
      "https://en.wikipedia.org/wiki/London",
      "https://www.wikidata.org/wiki/Q84",
      "https://wikitravel.org/en/London",
    ],
    url: "https://wikitravel.org/en/London",
  },
  honorificPrefix: "Mr.",
  jobTitle: "Software Engineer",
  nationality: {
    "@type": "Country",
    "@id": "https://gregbrimble.com/#UK",
    name: "United Kingdom",
    sameAs: [
      "https://en.wikipedia.org/wiki/United_Kingdom",
      "https://www.wikidata.org/wiki/Q145",
      "https://wikitravel.org/en/United_Kingdom",
    ],
    url: "https://wikitravel.org/en/United_Kingdom",
  },
  workLocation: {
    "@type": "Place",
    "@id": "https://gregbrimble.com/#London",
  },
  worksFor: {
    "@type": "Organization",
    "@id": "https://gregbrimble.com/#Cloudflare",
    name: "Cloudflare",
    sameAs: "https://www.cloudflare.com/",
    url: "https://www.cloudflare.com/",
  },
  description: "Technological Engineer",
  image: "https://gregbrimble.com/img/Profile_Picture.jpg",
  mainEntityOfPage: "http://gregbrimble.com/",
  name: "Greg Brimble",
  sameAs: [
    "https://www.wikidata.org/wiki/Q52444075",
    "https://www.linkedin.com/in/gregbrimble",
    "https://github.com/gregbrimble/",
    "https://dev.to/gregbrimble",
    "https://twitter.com/gregbrimble",
    "https://www.twitch.tv/gregbrimble",
    "https://www.youtube.com/channel/UCUfprYvJEwcfNCcMnTGxVWA",
    "https://www.instagram.com/gregbrimble/",
    "https://facebook.com/gregbrimble",
    "https://medium.com/@gregbrimble",
  ],
  url: "https://gregbrimble.com/",
};
