export class Customer {
  constructor(
    public id?: String,
    public name?: String,
    public address?: String,
    public phone?: String,
    public email?: String,
    public username?: String,
    public emailVerified?: Boolean,
    public owns?: Array<Product>
  ) {
  }
}

export class Category {
  constructor(
    public id?: String,
    public name?: String,
  ) {
  }
}

export class Product {
  constructor(
    public name?: String,
    public location?: String,
    public postedDate?: Date,
    public description?: String,
    public status?: String,
    public sold?: Boolean,
    public id?: String,
    public images?: Array<String>,
    public price?: Number,
    public owner?: Customer,
    public category?: Category,
    public customerToWish?: Array<Customer>,
  ) { }

  static approvedUnsoldProductFilters = [
    'filter[order]=postedDate%20DESC',
    'filter[where][status]=approved',
    'filter[where][sold]=false',
  ];

  static convertQueryParamsintoFilters(queryParam): Array<String> {
    const filters = [];
    // tslint:disable-next-line:forin
    for (const key in queryParam) {
      switch (key) {
        case 'id': filters.push('filter[where][id]=' + queryParam[key]);
          break;
        case 'name': filters.push('filter[where][name][like]=' + queryParam[key] + '&filter[where][name][options]=i');
          break;
        case 'description': filters.push('filter[where][description][like]=' + queryParam[key] + '&filter[where][description][options]=i');
          break;
        case 'location': filters.push('filter[where][location][like]=' + queryParam[key] + '&filter[where][location][options]=i');
          break;
        case 'minPrice': filters.push('filter[where][and][0][price][gt]=' + queryParam[key]);
          break;
        case 'maxPrice': filters.push('filter[where][and][1][price][lt]=' + queryParam[key]);
          break;
        case 'minDate': filters.push('filter[where][and][0][postedDate][gt]=' + queryParam[key]);
          break;
        case 'maxDate': filters.push('filter[where][and][1][postedDate][lt]=' + queryParam[key]);
          break;
        case 'customerId': filters.push('filter[where][customerId]=' + queryParam[key]);
          break;
        case 'categoryId': filters.push('filter[where][categoryId]=' + queryParam[key]);
          break;
        case 'status': filters.push('filter[where][status]=' + queryParam[key]);
          break;
        default:
          console.warn('Please add product filter for this queryparam: ', key);
          break;
      }
    }
    return filters;
  }
}

