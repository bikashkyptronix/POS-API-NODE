import { envs } from "./envs.js";
import { handleError } from "./handleErrors.js";
import { StatusError } from "./StatusErrors.js";
import { StatusSuccess } from "./StatusSuccess.js";
import { connectMongoDB  } from "./database.js";
import { logger, morganConf } from "./logger.js";

export {
  envs,
  handleError,
  StatusError,
  connectMongoDB,
  logger,
  morganConf,
  StatusSuccess,
 
};

export const isSearchClient = () => false;
export const searchClient = null; // or an empty object {}
