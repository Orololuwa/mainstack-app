import "@testing-library/jest-dom";
import "jest-fetch-mock";

const nodeFetch = require("node-fetch");
global.Request = nodeFetch.default.Request;
global.Response = nodeFetch.default.Response;
global.Headers = nodeFetch.default.Headers;
