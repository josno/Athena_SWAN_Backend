const request = require("supertest")("http://localhost:8080/api/v1");
const expect = require("chai").expect;

describe("GET /comments/:articleId", function () {
	it("returns all comments by article id", async function () {
		// Test article id
		// Already in the server
		const articleId = "TLdt8LwXvk5pNyhZZr86";

		const response = await request.get(`/comments/${articleId}`);

		expect(response.status).to.eql(200);
		expect(response.body).to.be.an("array");
	});
});

describe("POST /comments/", function () {
	it("returns all comments by article id", async function () {
		// Test article id
		// Already in the server
		const articleId = "TLdt8LwXvk5pNyhZZr86";

		const testComment = {
			refArticle: articleId,
			name: "Test Name",
			comment: "This is a test comment",
		};

		const response = await request.post(`/comments`).send(testComment);

		expect(response.status).to.eql(200);
		expect(response.body).to.be.an("array");
	});
});

describe("PUT /comments/:articleId/:commentId", function () {
	it("returns updated comments", async function () {
		// Test article id
		// Already in the server
		const testArticleId = "TLdt8LwXvk5pNyhZZr86";

		// Retrieve test comment in db
		// Already in db
		const testCommentId = "dq1MLNyl8czhvtsw4pvJ";

		const res = await request.get(`/comments/${testArticleId}`);

		const target = res.body.find((c) => c.id === testCommentId);
		// We will make a comparison to the new value after making the put request

		const oldValue = target.likes;

		target.likes = parseInt(target.likes) + 1;

		// We Will compare this to the old value
		const newValue = target.likes;

		const response = await request
			.put(`/comments/${testArticleId}/${testCommentId}`)
			.send(target);

		const retrievedItem = response.body.find((i) => i.id === testCommentId);

		expect(response.status).to.eql(200);
		expect(response.body).to.be.an("array");
		expect(retrievedItem.likes).to.not.eql(oldValue);
		expect(retrievedItem.likes).to.eql(newValue);
	});
});
