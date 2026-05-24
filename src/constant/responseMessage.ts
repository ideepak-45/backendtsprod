export default {
    SUCCESS: "The request was successful.",
    CREATED: "The resource was created successfully.",
    ACCEPTED: "The request has been accepted for processing.",
    NO_CONTENT: "The request was successful but there is no content to return.",
    BAD_REQUEST: "The request was invalid or cannot be processed.",
    UNAUTHORIZED: "Authentication is required and has failed or has not been provided.",
    FORBIDDEN: "The request was valid, but the server is refusing action.",
    SOME_ERROR_OCCURRED: "An error occurred while processing the request.",
    INTERNAL_SERVER_ERROR: "An unexpected error occurred on the server.",
    NOT_FOUND: (entity: string) => `${entity} not found.`,
    VALIDATION_ERROR: (field: string) => `Validation failed for field: ${field}.`,
};
