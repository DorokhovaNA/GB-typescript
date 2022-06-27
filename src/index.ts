import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";
import { search } from "./search-form-data.js";

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock();
  renderSearchFormBlock("2022-06-09", "2022-06-15");
  renderSearchStubBlock();
  renderToast(
    {text: "Это пример уведомления. Используйте его при необходимости", type: "success"},
    {name: "Понял", handler: () => {console.log("Уведомление закрыто")}}
  );
  search();
})