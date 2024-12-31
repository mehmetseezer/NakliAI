const { StatusCodes } = require('http-status-codes');
const { Truck } = require('../../models/vehicles/truck.model');
const ApiError = require('../../utils/ApiError');


/**
 * Create a truck
 * @param {Object} truckBody
 * @returns {Promise<Truck>} 
 */
const createTruck = async (truckBody) => {
    return Truck.create(truckBody);
};

/**
 * Query for truck
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField: (desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTrucks = async (filter, options) => {
    const trucks = await Truck.paginate(filter, options);
    return trucks;
};

/**
 * Get truck by id
 * @param {ObjectId} id
 * @returns {Promise<Truck>}
 */
const getTruckById = async (id) => {
    return Truck.findById(id);
};

/**
 * Get truck by plate
 * @param {string} plate
 * @returns  {Promise<Truck>}
 */
getTruckByPlate = async (plate) => {
    return Truck.find({ 'plate': plate });
};

const updateTruckById = async (truckId, updateBody) => {
    const truck = await getTruckById(truckId);
    if (!truck) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Truck not found');
    }
    return Truck.update();
}