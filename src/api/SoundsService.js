//put all API call definitions for the "Sounds endpoint here"
import data from './testData.json'; //TODO: remove, this is just local testing

export const get = () => data["sounds"][4]; //return array of sound data here
export const getSounds = () => data["sounds"].slice(0, 4); //TODO change this. should return array of sound objects
export const getById = id => "id returned"; //get all sounds by uploaded by a specific user
export const post = (name, desc) => "posted!"; //post new sound to the server

