import { get, set, keys } from "./web_modules/idb-keyval.js";

const form = document.querySelector("form");

if (form != null) {
  form.addEventListener("change", evt => {
    console.log(evt.target.name, evt.target.value);

    set(evt.target.name, evt.target.value);
  });
}

async function load() {
  const inputs = Array.from(form.elements).filter(input => Boolean(input.name));
  await Promise.all(
    inputs.map(async input => {
      const inputName = input.name;
      const savedValue = await get(inputName);
      if (savedValue != null) input.value = savedValue;
    })
  );
}
load();

const email = document.querySelector("#send-email");

if (email != null) {
  email.addEventListener("click", async () => {
    console.log("Send email");
    let arr = await Promise.all([
      get("resp1_1"),
      get("resp1_2"),
      get("resp1_3"),
      get("resp1_4"),
      get("res3"),
      get("res2"),
      get("res2"),
      get("res2"),
      get("res2"),
      get("res3")
    ]);
    arr = arr.map(el => el || "");

    const subject = "Forward";
    const body = `
    When did the incident happen? ? ${arr[0] +
      ":" +
      arr[1] +
      arr[3] +
      resp1_4}\n
    Where did the incident happen? ${q2}\n
    What happened? ${q3} \n
    Do you know the person who assaulted you? ${q3} \n
    Was the assault with a weapon? ${q3} \n
    Were there any witnesses? ${q3} \n
    Are there any image evidences you would like to share? ${q3} \n
    If you choose to submit the form to the police, fill out your personal data. ${q3} \n`;

    const link = `mailto:?to=&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.click();
    console.log(body);
  });
}
