import { createClient } from "contentful";

//from contentful API key create space - the keys are all inside .env.dev
export default createClient({
  space: process.env.REACT_APP_API_SPACE,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN
});

//however, this will still break, to resolve it, we just need to restart the server