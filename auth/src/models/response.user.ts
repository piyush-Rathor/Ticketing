/**
 * Response Model
 */

/**
 *
 * @param {String} message
 * @param {T} data
 * @returns {Object} Response Object {message: string, data: T}
 */
export const Response = <T>(message: string, data: T) => {
    return {
        message,
        data,
    };
};