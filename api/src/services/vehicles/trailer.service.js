const { StatusCodes } = require('http-status-codes');
const { Trailer } = require('../../models/vehicles/trailer.model');
const ApiError = require('../../utils/ApiError');

/**
 * Create a Trailer
 * @param {Object} trailerBody
 * @return {Promise<Trailer>}
 */
const createTrailer = async (trailerBody) => {
    return Trailer.create(trailerBody);
}

/**
 * Query for trailer
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort options in the format: sortField: (desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResults>}
 */
const queryTrailers = async (filter, options) => {
    const trailers = await Trailer.paginate(filter, options);
    return trailers;
}