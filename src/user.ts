import { renderBlock } from "./lib.js";

export function getUserData(): { userName: string; avatarUrl: string } {
  const localStorageData: string | null = localStorage.getItem("user");
  if (typeof localStorageData == "string") {
    const userData = JSON.parse(localStorageData);

    if (userData === null) {
      return { userName: "undefined", avatarUrl: "undefined" };
    }

    if (
      typeof userData.userName === "string" &&
      typeof userData.avatarUrl === "string"
    ) {
      return { userName: userData.userName, avatarUrl: userData.avatarUrl };
    } 
    return { userName: "undefined", avatarUrl: "undefined" };
  } else {
    return { userName: "undefined", avatarUrl: "undefined" };
  }
}

export function getFavoritesAmount(key = "favoriteItems"): number {
  const localStorageItem = localStorage.getItem(key);

  if (localStorageItem === null) {
    return 0;
  }

  const data: unknown = JSON.parse(localStorageItem);

  if (Array.isArray(data)) {
    return data.length;
  }

  return 0;
}

export function renderUserBlock () {
  const user = getUserData();
  const userName = user.userName;
  const linkToUserAvatar = user.avatarUrl;
  const favoriteItemsAmount = getFavoritesAmount();
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : "ничего нет"
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src=${linkToUserAvatar} alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? " active" : ""}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
