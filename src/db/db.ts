import knex from "knex";
import { Model } from "objection";
import knexfile from "./knexfile";

// TODO in prod, use dependecy injection
// to create knex instance so db access can be mocked
// for tests

//TODO in prod don't access knefile.development directly
// but decide with env vars which config to use

const knexDb = () => knex(knexfile.development);
const setupDb = () => {
  console.log(knexfile.development);
  Model.knex(knexDb());
};
export { setupDb, knexDb };
