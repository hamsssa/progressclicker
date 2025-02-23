////ADD INFORMATION OF HOW MANY CLICKS IN THE BUTTON
//ADD ANOTHER SHOP WHEN CLICKED POPS UP A SCREEN TO BUY WITH REAL MONEY



const button = document.getElementById('button');
const progress = document.getElementById('progress');
const lightmode = document.getElementById('lightmode');
const container = document.getElementsByClassName('container');
const coins = document.getElementById('coins')
const confeti = new JSConfetti();
const SpeedUpButton = document.getElementById('speed');
const CheaterButton = document.getElementById('cheater')
const Debug = document.getElementById('debug');
const itemButton = document.getElementsByClassName('itembutton');
const SecretButton = document.getElementById('secret');
const MoreCoinsButton = document.getElementById('morecoins');

let coinsCount = 0;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;  
let timeoutId = null;
let currentTimeInSeconds = 0;  
let bestTimeInSeconds = Infinity;
let coinMultiplier = 1;
let valor = 5;
let SpeedUpItem = 10;
let SpeedUpValue = 1;
//Debug.addEventListener('click', function()
//{
  //   coinsCount = parseInt(prompt('Cuantas monedas quieres?'))
    // document.getElementById('coins-count').textContent = coinsCount;
//});
function pushNotifyError() 
{
    new Notify
    ({
        status: 'error',
        title: 'Insufficient balance',
        text: 'Try to get more money',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 1000,
        notificationsGap: null,
        notificationsPadding: null,
        type: 'outline',
        position: 'right bottom',
        customWrapper: '',
    })
}
function pushNotifySuccess()
{
    new Notify ({
        status: 'success',
        title: 'Coin Boost',
        text: 'Coin multiplier activated! Earned coins will be doubled',
        effect: 'slide',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 1000,
        notificationsGap: null,
        notificationsPadding: null,
        type: 'outline',
        position: 'right bottom',
        customWrapper: '',
      })    
}
  
SecretButton.addEventListener('click', function()
{
    alert("Ill add something else here.")
});
SpeedUpButton.addEventListener('click', function()
{
    if(coinsCount < SpeedUpValue)
    {
        pushNotifyError()
        return;
    }

    coinsCount -= SpeedUpValue;  
    document.getElementById('coins-count').textContent = coinsCount;

    valor = SpeedUpItem;

    SpeedUpValue += 6;

    if(SpeedUpItem < 50) 
    {  
        SpeedUpItem += 5;
    }

    SpeedUpButton.innerHTML = `Speed Up ${SpeedUpValue} <img src="icons/coin.png" width="20px" height="20px">`;
});

CheaterButton.addEventListener('click', function()
{
    if(coinsCount < 100)
        {
            pushNotifyError()
            return;
        }
        else
        {
            valor = 50;
            coinsCount -= 100;
            document.getElementById('coins-count').textContent = coinsCount;
        }
});
MoreCoinsButton.addEventListener('click', function()
{
    if(coinsCount < 20)
    {
        pushNotifyError()
        return;
    }
    else
    {
        coinsCount -= 20; 
        coinMultiplier *= 2; 
        document.getElementById('coins-count').textContent = coinsCount;
        pushNotifySuccess();

    }
});
lightmode.addEventListener('click', function()
{
    DarkMode();
    changeIcon();
});

button.addEventListener('click', function() 
{  
    if (timeoutId !== null) 
    {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    timer = true; 
    
    if (timer) 
    {
        stopWatch(); 
    }
    
    progress.value += valor;
    if(progress.value === 200) 
    {
        progress.value = 0;
        clearTimeout(timeoutId);
        CompareTime();  
        Reset()
        confeti.addConfetti();
        coinsCount += 1 * coinMultiplier
        document.getElementById('coins-count').textContent = coinsCount;
    }
    ClickereCount++;
});

function stopWatch() 
{
    if (timer) 
    {
        count++;

        if (count == 60) 
        {
            second++;
            count = 0;
        }

        if (second == 60) 
        {
            minute++;
            second = 0;
        }

        if (minute == 60)
        {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour < 10 ? "0" + hour : hour;
        let minString = minute < 10 ? "0" + minute : minute;
        let secString = second < 10 ? "0" + second : second;
        let countString = count < 10 ? "0" + count : count;

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;

        currentTimeInSeconds = (hour * 3600) + (minute * 60) + second + (count / 60);

        timeoutId = setTimeout(stopWatch, 10);
    }
}

function CompareTime()
{
    if(currentTimeInSeconds < bestTimeInSeconds)
    {
        bestTimeInSeconds = currentTimeInSeconds;
        
        let bestTimerString = 
            `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}:${count < 10 ? "0" + count : count}`;
        
        document.getElementById('BestTime').innerHTML = bestTimerString;
    }
    
}

function Reset()
{
    hour = 0
    minute = 0;
    second = 0;
    count = 0;
    timer = false;  
    timeoutId = null;
    currentTimeInSeconds = 0;
}
let isDefault = true;
let isDefaultIcon = true;
function changeIcon()
{
    if(isDefaultIcon)
    {
        lightmode.innerHTML = `<button id="lightmode"> <img src="icons/sun.png" width="35px" height="35px"></button>`

    }
    else
    {
        lightmode.innerHTML = `<button id="lightmode"> <img src="icons/moon.png" width="30px" height="30px"></button>`

    }
    isDefaultIcon = !isDefaultIcon;
}
function DarkMode()
{

    if(isDefault)
        {
            const shopButtons = document.querySelectorAll('.itembutton');
            shopButtons.forEach(btn => 
            {
                btn.style.backgroundColor = '#022c41';
            });
            button.style.setProperty('background-color', '#022c41');
            document.body.style.background = "#121212";
            document.querySelector('.container').style.backgroundColor = '#1e1e1e';
            document.querySelector('.container').style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';          
            document.querySelector('.title').style.color = '#e0e0e0';
            document.getElementById('coins-count').style.color = '#e0e0e0';
            document.getElementById('shop').style.color = '#e0e0e0';
            const digits = document.querySelectorAll('.digit');
            digits.forEach(digit => 
            {
                digit.style.backgroundColor = '#2d2d2d';
                digit.style.color = '#e0e0e0';
            });
            
            const texts = document.querySelectorAll('.txt');
            texts.forEach(text => 
            {
                text.style.color = '#a0a0a0';
            });
            
            document.getElementById('count').style.color = '#ff4d5e';
            document.getElementById('BestTime').style.color = '#00b4ff';
            document.getElementById('BestTime').style.backgroundColor = '#1a2634';
        }
        else
        {
            const shopButtons = document.querySelectorAll('.itembutton');
            shopButtons.forEach(btn => 
            {
                btn.style.backgroundColor = '#0ea5e9';
            });
            button.style.setProperty('background-color', '#0ea5e9');
            document.body.style.background = '#f5f5f5';
            document.querySelector('.container').style.backgroundColor = 'white';
            document.querySelector('.container').style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            document.querySelector('.title').style.color = '#333';
            document.getElementById('coins-count').style.color = '#333';
            document.getElementById('shop').style.color = '#333';
            const digits = document.querySelectorAll('.digit');
            digits.forEach(digit => 
            {
                digit.style.backgroundColor = '#f8f9fa';
                digit.style.color = '#333';
            });
            const texts = document.querySelectorAll('.txt');
            texts.forEach(text => 
            {
                text.style.color = '#6c757d';
            });
            document.getElementById('count').style.color = '#dc3545';
            document.getElementById('BestTime').style.color = '#0ea5e9';
            document.getElementById('BestTime').style.backgroundColor = '#f0f9ff';
        }
        isDefault = !isDefault;
}