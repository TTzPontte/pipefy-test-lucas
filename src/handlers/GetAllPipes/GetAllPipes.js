
const getAllHandler = async (event, context) => {
    const {
        env: { PIPEFY_ORG_ID, API_KEY }
    } = process;

    if (!API_KEY) {
        return Lambda.Response.unauthorized('no value for API_KEY');
    }

    try {
        const pipefy = new PipefyService(API_KEY);
        const response = await pipefy.gqlRequest({ document: listPipes, variables: { orgId: PIPEFY_ORG_ID } });
        return Lambda.Response.success({ response });
    } catch (error) {
        return Lambda.Response.failure(error);
    }
};