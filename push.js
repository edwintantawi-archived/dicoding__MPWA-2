const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BI0UQhMAlvPeIXKmtQyfdE1EaDPH3Nz2Rbfhe-e8i0i1LrIDDZXrvN8mp3Kpo5U8cKDaAKcGC_i_YO1owpImWFg",
    "privateKey": "WOAX-qAX9kVwPlnRxrPkyUDu_iAMR7s6-X7yFcHAQhM"
};
 
 
webPush.setVapidDetails(
    'mailto:edwintantawi@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/fDKq_JTogjQ:APA91bEMWvoA-tu1RZv_AVUJGcpMdPkXqcCFzpZnIqdxkBwmkCpsHIEB16rquLWEQHbKPB7WNUlj_zeaKSGJURT2ZR2pvcRoj4fKvlojkHUUhP9vp4XZXwGzbOQAN43PfLVB1ghpWA2C",
    "keys": {
        "p256dh": "BB3AQI7zXZ7z4Qrz7THtcVhNOYw+jJKhZ/pwrFKEmS6W08kvnN+g0nuVdUR95yGfe818z9qL6fwamCkdF9dH5Pw=",
        "auth": "h/XklFhm3sp4X70U1KBC6Q=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '986950567379',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);