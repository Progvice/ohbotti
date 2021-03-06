module.exports = {
    init: async (hrObj) => {
        const sendMessage = await hrObj.client.channels.cache.get(hrObj.channelID);
        const msg = await sendMessage.send('Heads or Tails\n\nš = Heads \nšŖ = Tails\n\nPick one of these.');
        await msg.react("š");
        await msg.react("šŖ");
        hrObj.client.on("messageReactionAdd", async (msgReaction, user) => {
            if(user.bot === false && user.id === hrObj.uid) {
                const userPickedEmoji = msgReaction._emoji.name;
                let loseResult;
                if(userPickedEmoji === "š") {
                    loseResult = "šŖ";
                }
                if(userPickedEmoji === "šŖ") {
                    loseResult = "š";
                }
                let gambleResult;
                if(Math.random() > 0.6000000000000000) {
                    gambleResult = userPickedEmoji;
                }
                else {
                    gambleResult = loseResult;
                }
                sendMessage.send('Flipping coin...').then(async (msgs) => {
                    for(let i = 0; i < 6; i++) {
                        if(i % 2 == 0) {
                            await msgs.reactions.removeAll();
                            await msgs.react("š");
                        }
                        else {
                            await msgs.reactions.removeAll();
                            await msgs.react("šŖ");
                        }
                    }
                    await msgs.reactions.removeAll();
                    await msgs.react(gambleResult);
                    if(gambleResult === loseResult) {
                        await sendMessage.send('You lost.');
                    }
                    if(gambleResult === userPickedEmoji) {
                        await sendMessage.send('You win!');
                    }
                });
            }
        });
    }
}