const { bot } = require("../core/bot");
const User = require("../db/User");
const { mainkeyboard } = require("../lib/mainkeys");
bot.start(async (ctx) => {
  ctx.reply(
    `Assalomu Alaykum ${ctx.from.first_name}.\nPastdagi tugmani bosing 👇`,
    mainkeyboard
  );

  try {
    const newUser = {
      userid: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      ismin: false,
      ismax: false,
    };

    const isExists = await User.findOne({ userid: newUser.userid });
    if (isExists == null) {
      await User.create(newUser)
        .then(async (res) => {
          const count = await User.find();
          ctx.telegram.sendMessage(
            process.env.ADMIN,
            `${newUser.first_name} bazaga qo'shildi.\nBazadagi jami foydalanuvchilar soni ${count.length}ta`
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Eski user start bosdi");
    }
  } catch (err) {
    console.log(err);
    ctx.replyWithHTML(`<b>Ko'zda tutilmagan xatolik</b>`);
  }
});
