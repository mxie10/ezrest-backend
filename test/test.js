const Listing = require('../models/listing');
const ListingController = require('../controllers/listingController');

describe('getAllListings', () => {
    it('should return all listings', async () => {
        // Mock Mongoose Query object with exec method
        const mockQuery = {
            exec: jest.fn().mockResolvedValue([{ _id: '65f701ade3705ee3ea087b38' }])
        };
        // Mock the find method to return the mockQuery
        Listing.find = jest.fn().mockReturnValue(mockQuery);

        // Mock Express response object
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Call the getAllListings function
        await ListingController.getAllListings(null, mockRes);

        // Assertions
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: [{ _id: '65f701ade3705ee3ea087b38' }] });
    });
});
