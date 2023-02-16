const express = require("express");
const connectDb = require("./servies")
const botModel = require("./model/bot")
const axios = require("axios");
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const PORT = process.env.PORT || 3000;

(async () => {
    app.post('/update', (req, res) => {
        const data = req.body
        console.log(data)
        return res.status(200).json({
            status: true,
            message: `Update Success`
        })
    })

    connectDb(`mongodb+srv://quis:${encodeURI('Ahihi123!')}@dev.rbwv3cs.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    })

    const TOKEN_TELEGRAM = await botModel.findOne({})
    const bot = await new TelegramBot(TOKEN_TELEGRAM.api_key, { polling: true });
    bot.addListener('message', async  function (msg)  {
        try {
            if (msg?.text?.startsWith("/fact")) {
                const { data } = await axios.get("https://catfact.ninja/fact");
                const content = await axios.get(
                    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURI(
                        data.fact
                    )}`
                );
                this.sendMessage(
                    msg.chat.id,
                    `Có thể bạn chưa biết: ${content.data[0][0][0]}`
                );
            } else if (msg?.text?.startsWith("/translate")) {
                const value = msg.text.split("/translate")[1]
                if (value.trim() !== "" || value) {
                    const {
                        data
                    } = await axios.get(
                        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURI(
                            value
                        )}`)
                    this.sendMessage(msg.chat.id, data[0][0][0]);
                } else {
                    this.sendMessage(msg.chat.id, `vui lòng nhập: /translate (...Nội dung cần dịch)`)
                }
            } else {
                this.sendMessage(
                    msg.chat.id,
                    `Bạn hãy 
                             nhập /fact để biết về những sự thật về con mèo
                             nhập /translate (nội dung cần dịch để dịch)`
                );
            }
        } catch (err) {
            console.log(err)
            this.sendMessage(msg.chat.id, JSON.stringify(err));
        }
    })
})()

app.listen(PORT, () => {
    console.log(`Server Listen on port: ${PORT}`);
});
