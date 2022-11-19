// const path = process.env.NODE_ENV === 'test' ? '../../../layers/common/' : '/opt/';
// // const {PipefyService} = require(`${path}/pipefy/service`);
//
// const {listPipes, cards: {showCard}} = require(`${path}pipefy/queries`);
// const {createTableRecord: createTableRecordMutations} = require(`${path}pipefy/mutations`);
//
// const datePlusIndex = (startDate, index) => {
//     const date = new Date(startDate)
//     date.setDate(date.getDay() + index)
//     return date
// }
//
// const createPayload = (data = {}, index) => {
//     // todo add +1 to each date
//     const {start_date: startDate, end_date: endDate} = data;
//     const NewEndDate = datePlusIndex(endDate, index)
//     const newStartDate = datePlusIndex(startDate, index)
//     return [
//         {field_id: "interval_index", field_value: index + 1},
//         {field_id: "start_date", field_value: newStartDate},
//         {field_id: "end_date", field_value: NewEndDate},
//         // todo shifts
//         // {field_id: "shifts", field_value: "shifts"}
//     ];
// };
//
//
// // creates a table recortd and returns its id
// // const createTableRecord = async (data, daysToAdd,API_KEY) => {
// //     const pipefy = new PipefyService(API_KEY);
// //     const fields = createPayload(data);
//
// //     const recordData = await pipefy.gqlRequest({
// //         document: createTableRecordMutations,
// //         variables: {tableId: TABLE_ID, fieldsAttributes: fields.filter(attr => attr.field_value !== '')}
// //     });
//
// //     const {
// //         createTableRecord: {
// //             table_record: {id: recordId}
// //         }
// //     } = recordData;
// //     return recordId
// // }
