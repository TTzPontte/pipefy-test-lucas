const {PipefyService} = require(`opt/services/Pipefy.service`);

const {cards: {showCard}} = require(`opt/pipefy/queries`);
// const {createTableRecord: createTableRecordMutations} = require(`${path}/pipefy/mutations`);
const Response = (status = 200, data) => ({
    statusCode: status,
    body: JSON.stringify(data),
});

const CrateCardHandler = async (event) => {
    const {env: {API_KEY}} = process;
    const {body: {data: {body}}} = event;
    const {
        data: {card: {id: cardId}}
    } = JSON.parse(body);
    console.log({cardId})


    const number_of_call = 1;
    const calls = [...Array(number_of_call)].map((x, index) => index);
    const pipefy = new PipefyService(API_KEY);
    const cardData = await pipefy.gqlRequest({
        document: showCard,
        variables: {cardId},
    });
    console.log({cardData});

    return Response(200, {ok: "OK"});
};
module.exports = {CrateCardHandler};
