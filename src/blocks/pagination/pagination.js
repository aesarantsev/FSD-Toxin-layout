import "simple-pagination.js";

let paginationContentElement = $(".pagination__content");
let paginationDescElement = $(".pagination__description");

let currentPageNumber = paginationContentElement.attr("page-number");
let itemsCount = paginationContentElement.attr("items-count");
let itemsOnPageCount = paginationContentElement.attr("items-on-page");

paginationShow(currentPageNumber, itemsCount, itemsOnPageCount);

function paginationShow(currentPageNumber, itemsCount, itemsOnPageCount) {
  paginationContentElement.pagination({
    currentPage: currentPageNumber,
    items: itemsCount,
    itemsOnPage: itemsOnPageCount,
    displayedPages: 3,
    edges: 1,
    cssStyle: "pagination__theme",
    prevText: "",
    nextText: "<i class = 'material-icons md-24 md-white'>arrow_forward</i>",
    onPageClick: onPageClick
  });
  displayPaginationDesc(currentPageNumber);
}

function onPageClick(pageNumber, event) {
  displayPaginationDesc(pageNumber);
}

function displayPaginationDesc(pageNumber) {
  let startDisplayItems = pageNumber * itemsOnPageCount - itemsOnPageCount + 1;
  let endDisplayItems =
    pageNumber * itemsOnPageCount > itemsCount
      ? itemsCount
      : pageNumber * itemsOnPageCount;
  let totalItems = itemsCount > 100 ? "100+" : itemsCount;
  paginationDescElement.html(
    startDisplayItems +
      " - " +
      endDisplayItems +
      " из " +
      totalItems +
      " вариантов аренды"
  );
}
