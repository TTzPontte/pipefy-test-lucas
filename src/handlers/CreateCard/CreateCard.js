const path = process.env.NODE_ENV === 'test' ? '../../../layers/common/' : '/opt/';

const { PipefyService} = require(`${path}Library/Application Support/JetBrains/WebStorm2022.2/scratches/pipefy/service`);
const {cards: {showCard}} = require(`${path}Library/Application Support/JetBrains/WebStorm2022.2/scratches/pipefy/queries`);
const {createTableRecord: createTableRecordMutations} = require(`${path}Library/Application Support/JetBrains/WebStorm2022.2/scratches/pipefy/mutations`);
const  Response =(status=200, data)=>( {
    statusCode: status,
    body: JSON.stringify(data),
});
const createTableRecords = async ({pipefy}) => {
    const records = [];

    for (const call of calls) {
        const fields = createPayload(data);

        const recordData = await pipefy.gqlRequest({
            document: createTableRecordMutations,
            variables: {tableId: TABLE_ID, fieldsAttributes: fields.filter(attr => attr.field_value !== '')}
        });

        const {createTableRecord: {table_record: {id: recordId}}} = recordData;
        records.push(recordId)
    }
    return records
}


const API_KEY = '01011001'
const CrateCardHandler = async (event) => {
    const {body: {data: {body}}} = event;
    const {data: {card: {id:cardId}}} = body;
    JSON.parse(body)
    /*
    * @Data
    * number_of_call
    * cardData
    * */

    const number_of_call = 1
    const calls = [...Array(number_of_call)].map((x, index) => index);
    const pipefy = new PipefyService(API_KEY);
    const cardData = await pipefy.gqlRequest({document: showCard, variables: {cardId}});
    console.log({cardData})

    return Response(200, {"ok": records});
};
module.exports = {CrateCardHandler}