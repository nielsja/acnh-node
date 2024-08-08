import axios from "axios";
import express from "express";
import request from 'request';
import { clothingController } from "./functions/clothing/getClothing";
import { IMapJsonCsv, mapClothing, mapFurniture, mapInterior, mapMiscellaneousItems, mapPhotos, mapRecipes, mapTools, mapVillagers, writeJsonToCsvFile } from "./utils/writeJsonToCsvFile";

const PORT = 4242;
export const NOOKIPEDIA_TOKEN = 'e6232547-0afc-438f-8964-72b898a0d172';

const server = express();

server.get("/", async (req, res) => {
  res.send("Hello from the Express TypeScript server!");
});

server.listen(PORT, () => {
  console.log("Express TypeScript Server is running...");
});

server.get('/clothing', async (req, res) => {
  const controllerOptions = {};
  const response = await clothingController(controllerOptions);
  res.send(response);
})

server.get('/mapStuff', async (req, res) => {
  const clothingInput: IMapJsonCsv = mapClothing();
  const recipesInput: IMapJsonCsv = mapRecipes();
  const furnitureInput: IMapJsonCsv = mapFurniture();
  const interiorInput: IMapJsonCsv = mapInterior();
  const toolsInput: IMapJsonCsv = mapTools();
  const photosInput: IMapJsonCsv = mapPhotos();
  const miscItemInput: IMapJsonCsv = mapMiscellaneousItems();
  const villagersInput: IMapJsonCsv = mapVillagers();

  const thingsToMap: IMapJsonCsv[] = [
    clothingInput,
    recipesInput,
    furnitureInput,
    interiorInput,
    toolsInput,
    photosInput,
    miscItemInput,
    villagersInput
  ];

  let responseString = 'things mapped: '
  thingsToMap.forEach((thing, index) => {
    writeJsonToCsvFile(thing);
    responseString += `${thingsToMap[index].jsonArr.length}\n`
  });
  res.send(`${responseString}`)
})

// #region Routes for testing api calls
/**
 * Test call using 'axios'
 */
server.get('/testAxiosCall', async (req, res) => {
  const requestUrl = 'http://acnhapi.com/v1/fish/1';
  let response = (await axios.get(requestUrl)).data;
  console.log(JSON.stringify(response));
  res.send(response);
})

/** 
 * Test call using 'request'
 */
server.get('/testRequestCall', async (req, res) => {
  const requestUrl = 'http://acnhapi.com/v1/fish/1';
  request(
    {
      url: requestUrl,
      method: 'GET',
      json: {},
    },
    (err, response, body) => {
      if (response.statusCode === 200) {
        console.log(body);
        res.send(body);
      } else {
        console.log(err);
        res.send(`An error occurred! See console for details.`)
      }
    }
  );

})
// #endregion