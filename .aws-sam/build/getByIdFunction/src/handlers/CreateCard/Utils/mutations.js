const { gql } = require('graphql-request');

const mutations = {
  createCard: gql`
    mutation CreateCard($pipeId: ID!, $fieldsAttributes: [FieldValueInput]!) {
      createCard(input: { pipe_id: $pipeId, fields_attributes: $fieldsAttributes }) {
        card {
          id
        }
      }
    }
  `,
  createPresignedUrl: gql`
    mutation CreatePresignedUrl($organizationId: ID!, $file: String!) {
      createPresignedUrl(input: { fileName: $file, organizationId: $organizationId }) {
        clientMutationId
        downloadUrl
        url
      }
    }
  `,
  updateCardFieldsValues: gql`
    mutation UpdateCardFieldsValues($cardId: ID!, $values: [NodeFieldValueInput!]!) {
      updateFieldsValues(input: { nodeId: $cardId, values: $values }) {
        clientMutationId
        success
        userErrors {
          field
          message
        }
      }
    }
  `,
  createTableRecord: gql`
    mutation CreateTableRecord($tableId: ID!, $fieldsAttributes: [FieldValueInput]) {
      createTableRecord(input: { table_id: $tableId, fields_attributes: $fieldsAttributes }) {
        table_record {
          id
        }
      }
    }
  `
};
module.exports = { ...mutations };
