import { searchCallback, SearchFormData } from "./interfaces.js";
import {
  renderEmptyOrErrorSearchBlock,
  createListContent,
  renderSearchResultsBlock,
} from "./search-results.js";
import { FavoritePlace } from "./types.js";
import { renderUserBlock } from "./user.js";
import { API } from "./API.js";

export function toggleFavoriteItem(e: Event): void {
  if (!(e.currentTarget instanceof HTMLDivElement)) {
    return;
  }

  const id = e.currentTarget.dataset.id;
  const name = e.currentTarget.dataset.name;
  const image = e.currentTarget.nextElementSibling.getAttribute("src");
  const currentPlace: FavoritePlace = {
    id,
    name,
    image,
  };

  const localStorageItem = localStorage.getItem("favoriteItems");

  if (localStorageItem) {
    const favoriteItems: unknown = JSON.parse(localStorageItem);

    if (Array.isArray(favoriteItems)) {
      const favoriteItem = favoriteItems.find((item) => item.id == id);

      if (favoriteItem) {
        removeFavoriteItemFromStorage(favoriteItem, favoriteItems);
        e.currentTarget.classList.remove("active");
      } else {
        addFavoriteItemToStorage(currentPlace, favoriteItems);
        e.currentTarget.classList.add("active");
      }
    }
  } else {
    localStorage.setItem("favoriteItems", JSON.stringify([currentPlace]));
    e.currentTarget.classList.add("active");
  }
  renderUserBlock();
}

function removeFavoriteItemFromStorage(
  favoriteItem: FavoritePlace,
  favoriteItems: FavoritePlace[]
): void {
  const indexOfItem = favoriteItems.indexOf(favoriteItem);
  favoriteItems.splice(indexOfItem, 1);

  if (favoriteItems.length) {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  } else {
    localStorage.removeItem("favoriteItems");
  }
}

function addFavoriteItemToStorage(
  currentPlace: FavoritePlace,
  favoriteItems: FavoritePlace[]
): void {
  favoriteItems.push(currentPlace);
  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
}

export const getSearchResult: searchCallback = (error, result): void => {
  if (error == null && result != null) {
    renderSearchResultsBlock(createListContent(result));

    const buttons = document.querySelectorAll(".favorites");
    buttons.forEach((button) => {
      button.addEventListener("click", toggleFavoriteItem);
    });
  } else {
    renderEmptyOrErrorSearchBlock(error);
  }
}

export function checkOutDateUnixStamp(date: Date) {
  return date.getTime() / 1000;
}

export function search() {
  const form = document.getElementById("search-form-block");
  form.onsubmit = async function (e) {
    e.preventDefault();
    const searchData: SearchFormData = {
      city: document.forms["search-form"].elements["city"].value,
      checkInDate: new Date(
        document.forms["search-form"].elements["check-in-date"].value
      ),
      checkOutDate: new Date(
        document.forms["search-form"].elements["check-out-date"].value
      ),
      maxPrice: document.forms["search-form"].elements["max-price"].value,
    };
    const provider: string =
      document.forms["search-form"].elements["provider"].value;

    const api = new API();
    const data = await api.get(searchData, provider);
    
    
    if (data.length) {
      getSearchResult(null, data);
    } else {
      getSearchResult(
        "Ничего не найдено. Попробуйте изменить параметры поиска."
      );
    }
  } 
}