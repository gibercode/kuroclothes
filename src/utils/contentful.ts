import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  host: "cdn.contentful.com",
});
