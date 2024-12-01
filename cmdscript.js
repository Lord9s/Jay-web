let userHistory = [];
let userMoney = 0;
let userUID = generateUID();
let lastDailyClaim = 0;
let botStartTime = Date.now();

function generateUID() {
    return Math.floor(Math.random() * 100000000000000) + 10000000000000; // Generate a random UID
}

function executeCommand() {
    const userCommand = document.getElementById('userCommand').value.trim();
    const responseSection = document.getElementById('responseSection');

    if (userCommand) {
        userHistory.push(userCommand); // Store command in history
        let response = '';

        switch (userCommand.toLowerCase()) {
            case '-help':
                response = "Available commands:\n-help - Show help guide\n-history - Show user history\n-clear - Clear user history\n-bal - Check user money\n-daily - Claim daily reward\n-slot - Bet money\n-call [message] - Report a problem\n-uid - Show user UID\n-prefix - Show bot prefix\n-uptime - Show bot uptime";
                break;
            case '-history':
                response = userHistory.length > 0 ? userHistory.join('\n') : "No history available.";
                break;
            case '-clear':
                userHistory = [];
                response = "History cleared.";
                break;
            case '-bal':
                response = `Your balance is: $${userMoney}`;
                break;
            case '-daily':
                const currentTime = Date.now();
                if (currentTime - lastDailyClaim >= 7200000) { // 2 hours in milliseconds
                    userMoney += 1000;
                    lastDailyClaim = currentTime;
                    response = "You have claimed your daily reward of $1000!";
                } else {
                    response = "You can claim your daily reward again in 2 hours.";
                }
                break;
            case '-slot':
                const betAmount = prompt("Enter your bet amount:");
                if (betAmount && !isNaN(betAmount) && betAmount > 0 && betAmount <= userMoney) {
                    const result = Math.random();
                    if (result < 0.5) {
                        userMoney -= betAmount;
                        response = `You lost $${betAmount}. Your new balance is $${userMoney}.`;
                    } else if (result < 0.9) {
                        userMoney += betAmount * 2;
                        response = `You won! Your new balance is $${userMoney}.`;
                    } else {
                        userMoney += betAmount * 100;
                        response = `Jackpot! You won $${betAmount * 100}. Your new balance is $${userMoney}.`;
                    }
                } else {
                    response = "Invalid bet amount.";
                }
                break;
            case '-call':
                const problemMessage = userCommand.split(' ').slice(1).join(' ');
                response = `Your problem has been reported: "${problemMessage}"`;
                break;
            case '-uid':
                response = `Your UID is: ${userUID}`;
                break;
            case '-prefix':
                response = "Hey, 𝘓𝘰𝘳𝘥𖣘𝘽𝙤𝙩࿐ speaking!🔥 ⚙ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗣𝗿𝗲𝗳𝗶𝘅: -";
                break;
            case '-uptime':
                const uptime = Math.floor((Date.now() - botStartTime) / 1000);
                response = `Bot has been running for ${uptime} seconds.`;
                break;
            default:
                response = "Unknown command. Type -help for a list of commands.";
        }

        responseSection.innerText += `\n> ${userCommand}\n${response}\n`;
        document.getElementById('userCommand').value = ''; // Clear input field
    }
}
