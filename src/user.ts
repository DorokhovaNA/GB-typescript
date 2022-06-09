import { renderBlock } from "./lib.js";

export function getUserData(): { userName: string; avatarUrl: string } {
  const userData = JSON.parse(localStorage.getItem("user"));

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
  
}

export function getFavoritesAmount(): number {
  const favoritesAmountData = parseInt(localStorage.getItem("favoritesAmount"));

  if (typeof favoritesAmountData === "number") {
    return favoritesAmountData;
  }

  return 0;
}

export function renderUserBlock (
  userName: string,
  linkToUserAvatar: string,
  favoriteItemsAmount?: number
) {
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
