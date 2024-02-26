const { bot } = require("../core/bot");

bot.help((ctx) => {
  let text =
    `Bizning botimizda bajarish mumkin bo'lgan komandalar:\n` +
    `/start - botni ishga tushiruvchi buyruq \n` +
    `/help - Yordam`;
  ctx.replyWithHTML(text);
});
