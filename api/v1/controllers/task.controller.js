const Task = require('../models/task.model');

const paginationHelper = require("../../../helpers/pagination")
const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    try{
        const find = {
            deleted: false
        }

        if(req.query.status) {
            find.status = req.query.status;
        }

        // Search
        const objectSearch = searchHelper(req.query);
    
        if(req.query.keyword){
            find.title = objectSearch.regex;
        }
        // End Search

        // Sort
        const sort = {

        }

        if(req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue;
        }

        // End Sort

        // Pagination
        const countTasks = await Task.countDocuments(find);

        const objectPagination = paginationHelper(
            {
                limitItems: 2,
                currentPage: 1
            },
            req.query,
            countTasks
        )

        // End Pagination

        const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

        res.json(tasks);
    } catch (error) {
        res.json("Không tìm thấy");
    }

}

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findOne({
            _id: id,
            deleted: false
        });

        res.json(task);
    } catch (error) {
        res.json("Không tìm thấy");
    }
}