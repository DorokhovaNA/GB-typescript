import { renderBlock } from "./lib.js";

export function renderSearchFormBlock(
  checkInDate: string = null,
  checkOutDate: string = null
) {
  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 2, 0);

  let currentcheckInDate = checkInDate;
  let currentcheckOutDate = checkOutDate;

  if (Date.parse(checkInDate) < Date.parse(formatDate(minDate))) {
    const defaultcheckInDate = new Date(minDate.setDate(minDate.getDate() + 1));
    currentcheckInDate = formatDate(defaultcheckInDate);
  }

  if (
    Date.parse(checkOutDate) > Date.parse(formatDate(maxDate)) ||
    Date.parse(checkOutDate) < Date.parse(formatDate(minDate))
  ) {
    const defaultcheckInDate = new Date(currentcheckInDate);
    const defaultcheckOutDate = new Date(
      defaultcheckInDate.setDate(defaultcheckInDate.getDate() + 2)
    );
    currentcheckOutDate = formatDate(defaultcheckOutDate);
  }

  function formatDate(date) {
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;

    if (mm < 10) mm = "0" + mm;

    const yyyy = date.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  }

  

  renderBlock(
    "search-form-block",
    `
    <form id="search-form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input
              id="check-in-date"
              type="date"
              value=${currentcheckInDate}
              min=${formatDate(minDate)}
              max="${formatDate(maxDate)}"
              name="checkin"
            />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input
              id="check-out-date"
              type="date"
              value=${currentcheckOutDate}
              min=${formatDate(minDate)}
              max="${formatDate(maxDate)}"
              name="checkout"
            />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
