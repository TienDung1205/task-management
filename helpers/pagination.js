module.exports = (objectPagination, query, countRecords) =>{
    if (query.page && !isNaN(parseInt(query.page))) {
        if(parseInt(query.page) < 1){
            objectPagination.currentPage = 1;
        }else{
            objectPagination.currentPage = parseInt(query.page);
        }
    } else {
        objectPagination.currentPage = 1;
    }

    if (query.limit && !isNaN(parseInt(query.limit))) {
        if(parseInt(query.limit) < 1){
            objectPagination.limitItems = 2;
        }else{
            objectPagination.limitItems = parseInt(query.limit);
        }
    } else {
        objectPagination.limitItems = 2;
    }

    const totalPage = Math.ceil(countRecords/objectPagination.limitItems);
    objectPagination.totalPage = totalPage;


    if(objectPagination.currentPage > totalPage && totalPage != 0){
        objectPagination.currentPage = totalPage;
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    
    return objectPagination;

    // if(query.page) {
    //     objectPagination.currentPage = parseInt(query.page);
    // }

    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    // objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitItems);

    // return objectPagination;
}