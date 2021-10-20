import { getCityName } from "./js/app.js";
import "./styles/base.scss";

export { getCityName };

//adding the event listener inside app.js was causing an error with jest
// source for configuring jest https://stackoverflow.com/questions/60372790/node-v13-jest-es6-native-support-for-modules-without-babel-or-esm
document.getElementById("generate").addEventListener("click", getCityName);