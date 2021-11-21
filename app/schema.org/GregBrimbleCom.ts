import type { Organization } from "schema-dts";
import { GregBrimble } from "./GregBrimble";
import { GregBrimbleBrand } from "./GregBrimbleBrand";

export const GregBrimbleCom: Organization & { "@id": string } = {
  "@type": "Organization",
  "@id": "https://gregbrimble.com/#GregBrimbleCom",
  brand: {
    "@id": GregBrimbleBrand["@id"],
  },
  duns: "225489867",
  email: "hello@gregbrimble.com",
  founder: {
    "@id": GregBrimble["@id"],
  },
  foundingDate: "2019-11-11",
  legalName: "gregbrimble.com Limited",
  logo: "https://gregbrimble.com/logo.png",
  identifier: "SC646726",
  image: "https://gregbrimble.com/logo.png",
  name: "gregbrimble.com",
  url: "https://gregbrimble.com/",
};
