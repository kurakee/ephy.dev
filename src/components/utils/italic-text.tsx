import { component$, useComputed$, useSignal } from "@builder.io/qwik";

export const ItalicText = component$(() => {
  const inputText = useSignal("Hello beautiful fonts!");
  const italicText = useComputed$(() => {
    const alphabetMapping: { [key: string]: string } = {
      a: "𝒶",
      b: "𝒷",
      c: "𝒸",
      d: "𝒹",
      e: "𝑒",
      f: "𝒻",
      g: "𝑔",
      h: "𝒽",
      i: "𝒾",
      j: "𝒿",
      k: "𝓀",
      l: "𝓁",
      m: "𝓂",
      n: "𝓃",
      o: "𝑜",
      p: "𝓅",
      q: "𝓆",
      r: "𝓇",
      s: "𝓈",
      t: "𝓉",
      u: "𝓊",
      v: "𝓋",
      w: "𝓌",
      x: "𝓍",
      y: "𝓎",
      z: "𝓏",
      A: "𝒜",
      B: "𝐵",
      C: "𝒞",
      D: "𝒟",
      E: "𝐸",
      F: "𝐹",
      G: "𝒢",
      H: "𝐻",
      I: "𝐼",
      J: "𝒥",
      K: "𝒦",
      L: "𝐿",
      M: "𝑀",
      N: "𝒩",
      O: "𝒪",
      P: "𝒫",
      Q: "𝒬",
      R: "𝑅",
      S: "𝒮",
      T: "𝒯",
      U: "𝒰",
      V: "𝒱",
      W: "𝒲",
      X: "𝒳",
      Y: "𝒴",
      Z: "𝒵",
    };

    return inputText.value
      .split("")
      .map((char) => alphabetMapping[char] || char)
      .join("");
  });
  return (
    <div class="flex justify-center items-center my-4">
      <div class="flex flex-col items-center w-1/2 p-4 bg-blue-100 border-blue-300 rounded-md">
        <p>入力して遊べます!(^^)</p>
        <input
          type="text"
          bind:value={inputText}
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <p>{italicText.value}</p>
      </div>
    </div>
  );
});
