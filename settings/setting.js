"use strict";
exports.__esModule = true;
exports.jwtTokenConfig = exports.settings = exports.MESSAGE = exports.VerificationEmailPeriod = exports.MAX_API_CALL_RETRIES = exports.webClientHost = exports.apiURL = exports.apiPort = void 0;
exports.apiPort = 4007;
exports.apiURL = 'http://localhost:' + exports.apiPort;
exports.webClientHost = 'http://localhost:4200';
exports.MAX_API_CALL_RETRIES = 1;
exports.VerificationEmailPeriod = 3;
exports.MESSAGE = 'Welcome to local development';
exports.settings = {
    postgres: {
        host: 'ec2-34-226-18-183.compute-1.amazonaws.com',
        port: 5432,
        database: 'd6hn0rffkvjgd0',
        user: 'rvbrfnaygouqkc',
        password: '7f0cf922d898dc7b783c03ed7fb35e9cb5844beb4fa150aeac1ac562b4727b3e',
        ssl: {
            rejectUnauthorized: false,
        }
    },
    botJwtSecret: '9Q-OUaSrHUeAlYT-PCDf_IKeANhpCbh82VtyJyKcBUm_tuEKo49TDCxUk0xrUSGM-waUs7AxWa-qKbG4H9mA-XKF3Kt5gfqJt_U9xp3GZDJQA2hXrqzbrFpok1VT0_c5P0pI3w6f9czhdjbyq7Qd1PjikEnb2P6gs1AyiZ-XwRVu_90_A2gUtZBef-Es3YAUufXU52EkMSv8llcU0ysTd9gkL1_KlSk1QnKT_PMi8-6c42vjUEB51qGr4SaBiFS00Aw-h9bz2NBn1bwQGFSwWhGVMzO3pVyiN_QBFvBwBkHUvww-wrPY9NfBz08jA8SSQQL5LapF6XrafZaYK7Tspg',
    jwtTokenLifeTime: '100',
    VerificationEmailPeriod: 3
};
exports.jwtTokenConfig = {
    storagePathUI: 'currentUserData'
};
