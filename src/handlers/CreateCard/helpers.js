const path = "./utils/";
const {
    // createTableRecord: createTableRecordMutations
    createCard: createTableRecordMutations
} = require(`${path}mutations`);

const Response = (status = 200, data) => ({
    statusCode: status, body: JSON.stringify(data)
});
const daysBetweenDays = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diff = date2.getTime() - date1.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
};
const datePlusIndex = (startDate, index = 0) => {
    const date = new Date(startDate);
    const hours = date.getHours() + index;
    date.setHours(hours);
    return date;
};

const dataMapper = (fields) => fields.map(({value, field: {id}}) => {
    return {
        field_id: id, field_value: value || ""
    };
});

const find = (key = "", fields = []) => fields.filter(({field_id}) => field_id === key)[0].field_value;

const createPayload = (card = {}, index = 0) => {
    const newFileds = dataMapper(card.fields);
    const startDate = find("start_date", newFileds);
    const endDate = find("end_date", newFileds);
    console.log({startDate});
    const NewEndDate = datePlusIndex(endDate, index);
    const newStartDate = datePlusIndex(startDate, index);
    const shiftType = newStartDate.getHours() < 12 ? "AM" : "PM";

    return [{field_id: "interval_index", field_value: index + 1}, {
        field_id: "shift_type", field_value: shiftType
    }, {field_id: "start_date_and_time", field_value: newStartDate}, {field_id: "shift_end_date_and_time", field_value: NewEndDate}];
};

const createRecord = async ({fields, pipefy, TABLE_ID = "302822637"}) => {
    const recordData = await pipefy.gqlRequest({
        document: createTableRecordMutations,
        variables: {
            pipeId: TABLE_ID, fieldsAttributes: fields.filter((attr) => attr.field_value !== "")
        }
    });
console.log({recordData})
    const {
        createCard: {
            card: {id: recordId}
        }
    } = recordData;
    return recordId;
};
const find1 = (key = "", fields = []) => fields.filter(({field: {id}}) => {
    console.log({ID:id})
    return id === key
})[0].value;
const createTableRecords = async (data, pipefy) => {
      console.log(JSON.stringify({...data.fields}))
    const startDate = find1("start_date", data.fields);
    const endDate = find1("end_date", data.fields);
    const number_of_call = daysBetweenDays(startDate, endDate);
    const calls = [...Array(number_of_call)].map((x, index) => index);
    const records = [];
    for (let call in calls) {
        const fields = await createPayload(data, call);
        const {recordId} = await createRecord({pipefy, fields});
        records.push(recordId);
    }
    return records;
};

module.exports = {createTableRecords, Response};
