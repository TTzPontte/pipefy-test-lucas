const { gql } = require('graphql-request');
const queries = {
  pipes: {
    listPipes: gql`
      query ListPipes($orgId: ID!) {
        organization(id: $orgId) {
          pipes {
            id
            name
          }
          id
        }
      }
    `,
    getPipe: gql`
      query GetPipe($pipeId: ID!) {
        pipe(id: $pipeId) {
          id
          name
          start_form_fields {
            id
            internal_id
            type
            required
            editable
          }
        }
      }
    `
  },
  cards: {
    listCards: gql`
      query ListCards($pipeId: ID!) {
        cards(pipe_id: $pipeId) {
          edges {
            node {
              id
              title
              done
              due_date
              url
              labels {
                name
              }
              assignees {
                id
              }
              comments {
                text
              }
              current_phase {
                name
              }
              fields {
                name
                value
                field {
                  id
                  type
                  description
                }
              }
              phases_history {
                phase {
                  name
                }
                firstTimeIn
                lastTimeOut
              }
            }
          }
        }
      }
    `,
    showCard: gql`
      query ShowCard($cardId: ID!) {
        card(id: $cardId) {
          id
          url
          title
          done
          current_phase {
            name
          }
          labels {
            name
          }
          fields {
            name
            value
            field {
              id
              type
              description
            }
          }
          createdBy {
            created_at
          }
        }
      }
    `,
    showCardWithConnections: gql`
      query ShowCardWithConnections($cardId: ID!) {
        card(id: $cardId) {
          id
          child_relations {
            id
            name
            source_type
            cards {
              id
              title
              fields {
                name
                value
                field {
                  id
                }
              }
            }
          }
        }
      }
    `,
    showCardWithChildRelation: gql`
      query showCardWithChildRelation($cardId: ID!) {
        card(id: $cardId) {
          fields {
            field {
              id
            }
            value
          }
          child_relations {
            id
            name
            cards {
              id
              fields {
                name
                value
                field {
                  id
                }
              }
              child_relations {
                id
                name
                source_type
                cards {
                  id
                  fields {
                    value
                    field {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  },
  tables: {
    showTableRecords: gql`
      query showTableRecords($tableId: ID!) {
        table(id: $tableId) {
          id
          table_records {
            edges {
              node {
                id
                record_fields {
                  value
                  name
                  field {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `,
    searchTableRecordsByTitle: gql`
      query searchTableRecordsByTitle($pipeId: ID!, $title: String) {
        cards(pipe_id: $pipeId, search: { title: $title }) {
          edges {
            node {
              title
              id
              fields {
                value
                field {
                  id
                }
              }
            }
          }
        }
      }
    `
  }
};
module.exports = { ...queries };
