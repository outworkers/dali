dali.utils.namespace("dali.bootstrap");

dali.bootstrap.Pagination = function(items, itemsPerPage) {

  this.items = items || [];

  this.current = 1;

  this.itemsPerPage = itemsPerPage || 20;

  this.filtered = [];

  this.totalPages = this.getTotalPages();

  this.searchTerm = "";
};

dali.bootstrap.Pagination.prototype.setItems = function(items) {
  this.items = items || [];
  this.totalPages = this.getTotalPages();
  return this;
};

dali.bootstrap.Pagination.prototype.searchFilter = function(filter, term) {
  if (dali.isDefAndNotNull(term) && term.length > 0) {
    this.filtered = filter(this.items, term);
  }
  this.totalPages = this.getTotalPages(this.filtered);
  return this;
};

dali.bootstrap.Pagination.prototype.getTotalPages = function(source) {
  var finalSource = source || this.items;
  return Math.ceil(finalSource.length / this.itemsPerPage);
};

dali.bootstrap.Pagination.prototype.sort = function(sortFn) {
  this.items = this.items.sort(sortFn);
  return this;
};

dali.bootstrap.Pagination.prototype.sortFiltered = function(sortFn) {
  this.filtered = this.filtered.sort(sortFn);
  return this;
};

dali.bootstrap.Pagination.prototype.removeAt = function(index) {
  var ind = ((this.current - 1) * this.itemsPerPage) + index;
  this.items.splice(ind, 1);
  this.filter();
  return this;
};

dali.bootstrap.Pagination.prototype.filter = function() {
  var begin = ((this.current - 1) * this.itemsPerPage),
      end = begin + this.itemsPerPage;

  this.filtered = this.items.slice(begin, end);
  return this;
};

dali.bootstrap.Pagination.prototype.index = function(offset) {
  return (this.current - 1) * this.itemsPerPage + offset;
};