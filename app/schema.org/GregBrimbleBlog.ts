import type { Blog } from "schema-dts";
import { GregBrimble } from "./GregBrimble";
import { GregBrimbleCom } from "./GregBrimbleCom";

export const GregBrimbleBlog: Blog & { "@id": string } = {
  "@type": "Blog",
  "@id": "https://gregbrimble.com/#GregBrimbleBlog",
  abstract: "A collection of articles primarily about technology.",
  // TODO: accessMode
  // TODO: accessModeSufficient
  accountablePerson: {
    "@id": GregBrimble["@id"],
  },
  author: {
    "@id": GregBrimble["@id"],
  },
  copyrightHolder: {
    "@id": GregBrimbleCom["@id"],
  },
  copyrightNotice: "© 2021 gregbrimble.com. All rights reserved.",
  creditText: "© 2021 gregbrimble.com. All rights reserved.",
  // TODO: dateCreated
  // TODO: dateModified
  // TODO: datePublished
  editor: {
    "@id": GregBrimble["@id"],
  },
  headline: "Writings",
  inLanguage: "en-US",
  // TODO: interactionStatistic
  // TODO: interactivityType
  isAccessibleForFree: "https://schema.org/True",
  publisher: {
    "@id": GregBrimbleCom["@id"],
  },
  alternateName: "Blog",
  description: "A collection of articles primarily about technology.",
  mainEntityOfPage: "https://gregbrimble.com/blog",
  name: "Writings",
  url: "https://gregbrimble.com/blog",
};
