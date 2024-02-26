const { bot } = require("../core/bot");
const User = require("../db/User");
const { chiqar } = require("../lib/mainkeys");

bot.hears("Yangi oraliq qilish 🆕", async (ctx) => {
  await User.updateOne({ userid: ctx.from.id }, { ismin: true });
  ctx.reply(
    "Minimal miqdorni (ya`ni, oraliqning boshlang`ich miqdorini) kiriting:"
  );
});

bot.hears("Chiqar", async (ctx) => {
  const nums = await User.findOne({ userid: ctx.from.id });
  const result =
    Math.floor(Math.random() * (nums.max - nums.min + 1)) + nums.min;
  ctx.reply(String(result));
});

bot.hears("Random son chiqarish 🎲", async (ctx) => {
  await User.updateOne({ userid: ctx.from.id }, { ismin: true });
  ctx.reply(
    "Minimal miqdorni (ya`ni, oraliqning boshlang`ich miqdorini) kiriting:"
  );
});

bot.on("text", async (ctx) => {
  const info = await User.findOne({ userid: ctx.from.id });
  if (
    ctx.message.text.startsWith("/elon") &&
    ctx.from.id == process.env.ADMIN
  ) {
    const elon = ctx.message.text.split("| ");
    const users = await User.find();
    for (const i of users) {
      await ctx.telegram.sendMessage(i.userid, elon[1]);
    }
  }
  if (info.ismin) {
    try {
      const min = Number(ctx.message.text);
      await User.updateOne(
        { userid: ctx.from.id },
        { min: min, ismax: true, ismin: false }
      );
      ctx.reply(
        "Maksimal miqdorni (ya`ni, oraliqning oxirgi miqdorini) kiriting:"
      );
    } catch (error) {
      ctx.reply("Faqat musbat son kiritishingiz kerak!");
    }
  } else if (info.ismax) {
    try {
      const max = Number(ctx.message.text);
      await User.updateOne({ userid: ctx.from.id }, { max: max, ismax: false });
      ctx.replyWithHTML(
        "Random son chiqarish uchun '<b>Chiqar</b>' tugmasini bosing.",
        chiqar
      );
    } catch (error) {
      ctx.reply("Faqat musbat son kiritishingiz kerak!");
    }
  }
});
