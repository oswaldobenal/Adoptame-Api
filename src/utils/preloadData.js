import { Country } from "../models/Country.js";
import { City } from "../models/City.js";
import { data } from "../database/countries.js";
import { TypePet } from "../models/Typepet.js";
import { BreedPet } from "../models/Breedpet.js";
import { typesPets } from "../database/typePets.js";
import { ColorPet } from "../models/Colorpet.js";
import pet from "../database/pets.js";

export const preloadCountrys = async () => {
  try {
    for (let i = 0; i < data.countries.length; i++) {
      await Country.findOrCreate({
        where: {
          id: data.countries[i].iso3,
          name: data.countries[i].country,
        },
      });
      for (let j = 0; j < data.countries[i].cities.length; j++) {
        await City.findOrCreate({
          where: {
            countryId: data.countries[i].iso3,
            name: data.countries[i].cities[j],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const preloadTypesPets = async () => {
  try {
    for (let i = 0; i < typesPets.length; i++) {
      await TypePet.findOrCreate({
        where: {
          id: typesPets[i].type,
          nameType: typesPets[i].type
        },
      });
      for (let j = 0; j < typesPets[i].breeds.length; j++) {
        await BreedPet.findOrCreate({
          where: {
            typeId: typesPets[i].type,
            nameBreed: typesPets[i].breeds[j],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const preloadColorsPets = async () => {
  try {
    for (let i = 0; i < pet.cat.colors.length; i++) {
      await ColorPet.findOrCreate({
        where: {
          nameColor: pet.cat.colors[i],
          typeId: 'cat',
        },
      });
    }
    for (let i = 0; i < pet.dog.colors.length; i++) {
      await ColorPet.findOrCreate({
        where: {
          nameColor: pet.dog.colors[i],
          typeId: 'dog',
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
