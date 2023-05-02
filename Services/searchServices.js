const User = require("../models/user");

class SearchService {
  async adminSearch(searchText) {
    console.log(searchText);
    const searchFields = ["name", "email", "idCard", "busNumber"];
    const orList = [];
    for (const field of searchFields) {
      orList.push({
        [field]: {
          $regex: new RegExp(String(searchText)),
          $options: "i",
        },
      });
    }
    const query = { $or: orList };
    const results = await User.find(query);

    // Define a relevance score for each document based on search terms and other factors
    const scoredResults = results.map((result) => {
      let score = 0;
      for (const field of searchFields) {
        if (result[field]?.toLowerCase().includes(searchText)) {
          // Increase the score if the search term exitst in the field
          score += 1;
        }
      }
      // Other factors could be included here to adjust the score, such as how recently the document was created or updated
      return { result, score };
    });

    // Sort the results by relevance score in descending order
    const sortedResults = scoredResults.sort((a, b) => b.score - a.score);
    // Return only the sorted documents without the score
    const finalResults = sortedResults.map((result) => result.result);

    return finalResults;
  }

  async adminPagination(page = 1, limit = 10, query = {}, sorting = {}) {
    const skip = (page - 1) * limit; // Number of documents to skip
    const totalDocs = await User.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);
    const data = await User.find(query).skip(skip).limit(limit).sort(sorting);
    return {
      totalDocs,
      totalPages,
      currentPage: page,
      docs: data,
    };
  }
}

module.exports = new SearchService();
