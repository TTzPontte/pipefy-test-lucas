const {cards: { showCard }} = require("./Utils/queries");
const { PipefyService } = require("./Utils/service");
const { createTableRecords, Response } = require("./helpers");

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
  const {card} = await pipefy.gqlRequest({
    document: showCard,
    variables: { cardId }
  });

  console.log({card:card})
  const records = await createTableRecords(card, pipefy);
  return Response(200, { data: records });
};
// module.exports = {CrateCardHandler};
const x = CrateCardHandler({
  "body": "{\"data\":{\"action\":\"card.create\",\"card\":{\"id\":603183157,\"pipe_id\":\"c8W9JoXW\"}}}"
})