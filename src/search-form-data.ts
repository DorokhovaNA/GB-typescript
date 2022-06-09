export interface SearchFormData {
	city: string;
	dateFrom: string;
	dateTo: string;
	maxPrice: number;
  }
  
export function searchFunction(data: SearchFormData) {
  console.log(data);
}
  
export function search() {
  const form = document.getElementById("search-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    const searchData: SearchFormData = {
      city: document.forms["search-form"].elements["city"].value,
      dateFrom:
			document.forms["search-form"].elements["check-in-date"].value,
      dateTo:
			document.forms["search-form"].elements["check-out-date"].value,
      maxPrice: document.forms["search-form"].elements["max-price"].value,
    };
    searchFunction(searchData);
  };
}