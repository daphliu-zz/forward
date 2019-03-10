import { get, set, keys } from "./web_modules/idb-keyval.js";

const form = document.querySelector("form");

if (form != null) {
  form.addEventListener("change", evt => {
    console.log(evt.target.name, evt.target.value);

    set(evt.target.name, evt.target.value);
  });
}

async function load() {
  const inputNames = await keys();

  await Promise.all(
    inputNames.map(async inputName => {
      const input = form.elements.namedItem(inputName);
      if (input != null) {
        input.value = await get(inputName);
      }
    })
  );
}
load();

const email = document.querySelector("#send-email");

if (email != null) {
  email.addEventListener("click", async () => {
    console.log("Send email");
    const [q1 = "", q2 = "", q3 = ""] = await Promise.all([
      get("resp1"),
      get("res2"),
      get("res3")
    ]);

    const subject = "Forward";
    const body = `Question 1? ${q1}\nQuestion 2? ${q2}\nQuestion 3? ${q3}`;

    const link = `mailto:?to=&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.click();
    console.log(body);
  });
}
