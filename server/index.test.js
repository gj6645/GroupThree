// Testing the index.js file
// --------------------------------------------------------------
// Testing api endpoints
// --------------------------------------------------------------
//import supertest from 'supertest';
supertest = require('supertest');
//import index from './index';
index = require('./index');

// Test to check if database is connected
describe('Database connection', () => {
    it('should return a success message', (done) => {

        // Create a request to the api
        request(index)
            .get('/')

            // Check that the response is 200 OK.
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();

            });
    });
});

// Test to check if database is created successfully
describe('Database creation', () => {
    it('should return a success message', (done) => {

        // Create a request to the api
        request(index)
            .get('/create')

            // Check that the response is 200 OK.
            .expect(200)

            // Call the end function to let the testing know that we are done.
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});



describe("POST /api/createTask", () => {

    test("should create a new task", async () => {
        const response = await supertest(index).post("/api/createTask").send({
            "title": "test",
            "description": "test",
            "status": "test",
            "dueDate": "test"
        });
        expect(response.status).toBe(200);
    });

}
);

// Test for the get all tasks endpoint
describe("GET /api/getTasks", () => {
    
        test("should return all tasks", async () => {
            const response = await supertest(index).get("/api/getAllTasks");
            expect(response.status).toBe(200);
        });
    
    }
);

