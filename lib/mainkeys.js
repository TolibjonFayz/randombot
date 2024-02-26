const { Markup } = require("telegraf");

const mainkeyboard = Markup.keyboard([
  [{ text: "Random son chiqarish 🎲" }],
]).resize();

const chiqar = Markup.keyboard([
  [{ text: "Chiqar" }, { text: "Yangi oraliq qilish 🆕" }],
]).resize();

module.exports = {
  mainkeyboard,
  chiqar,
};
