const baseURL = 'https://api.ddsch.com';
const ruURL = `${baseURL}/ru/bulk_items/?entity_id=`;
const euURL = `${baseURL}/bulk_items/?entity_id=`;
const defaultEntityUrl = `${baseURL}/bulk_items/?entity_id=3897`;
const ruManifest = `${baseURL}/ru/item_manifest/`;
const euManifest = `${baseURL}/item_manifest/`;
const ruMarketState = `${baseURL}/ru/state/`;
const euMarketState = `${baseURL}/state/`;

export {
  ruURL,
  euURL,
  defaultEntityUrl,
  ruManifest,
  euManifest,
  ruMarketState,
  euMarketState,
};
