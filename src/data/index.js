// UI and state layers import the repository only from this module.
// When a backend is introduced, replace this export with an API-backed
// implementation without changing feature components.
export { woofyRepository } from "./local-woofy-repository";
