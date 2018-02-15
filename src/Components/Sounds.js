//put all API call definitions for the "Sounds endpoint here"
import data from '../Assets/testData.json'; //TODO: remove, this is just local testing

let i = 0;

export const get = () => data["sounds"][4]; //return array of sound data here
export const getSounds = () => data["sounds"].slice(0, 4); //TODO change this. should return array of sound objects
export const getById = id => "id returned";
export const post = (name, desc) => "posted!";

