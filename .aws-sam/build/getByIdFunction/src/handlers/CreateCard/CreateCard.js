const {cards: { showCard }} = require("./Utils/queries");
const { PipefyService, Response } = require("./Utils/service");
const { createTableRecords } = require("./helpers");

const {
  env: {
    API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIyMDIxODcsImVtYWlsIjoicmNhcmxvc0BtZXUtY2hhcGEuY29tIiwiYXBwbGljYXRpb24iOjMwMDIxMzkzNX19.Ypqem_RJIGJv4DuLbMNGibXHp_UiZVvO1SwSCLWBejRTv14lLo9_Gp0Wyho4z7OjG4olMwvmGfMuxZQFZO9yqw"
  }
} = process;

const CrateCardHandler = async (event) => {
  console.log({ event });

  const { body } = event;
  const {
    data: {
      card: { id: cardId }
    }
  } = JSON.parse(body);
  console.log({ cardId });

  const pipefy = new PipefyService(API_KEY);
  const cardData = await pipefy.gqlRequest({
    document: showCard,
    variables: { cardId }
  });

  const records = createTableRecords(cardData);
  return Response(200, { data: records });
};
module.exports = {CrateCardHandler};
