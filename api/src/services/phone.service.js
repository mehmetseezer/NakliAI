const admin = require('firebase-admin');
const config = require('../config/config');
const logger = require('../config/logger');

let firebaseApp;

const initializeFirebase = async () => {
    try {
        if (config.env !== 'test') {
            if (!admin.apps.length) {
                firebaseApp = admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: config.firebase.projectId,
                        privateKey: config.firebase.privateKey, // Yeni satır karakterleri config dosyasında düzeltilmiş olmalı
                        clientEmail: config.firebase.clientEmail,
                    }),
                });
                logger.info('Firebase service enabled and initialized successfully');
            } else {
                firebaseApp = admin.app();
                logger.warn('Firebase app already initialized, using existing app');
            }
        } else {
            logger.warn('Firebase service skipped for test environment');
        }
    } catch (error) {
        logger.error('Firebase initialization failed:', error);
        throw new Error('Failed to initialize Firebase');
    }
};

initializeFirebase();

const sendVerificationCode = async (phoneNumber) => {
    try {
        const verificationId = await admin.auth().generateSignInWithPhoneNumber(phoneNumber);
        // ... (Handle the verificationId)
        return verificationId;
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error;
    }
};

const verifyCode = async (verificationCodeId, verificationCode) => {
    try {
        await initializeFirebase();
        const credential = admin.auth.PhoneAuthProvider.credential(verificationCodeId, verificationCode);
        const userCredential = await firebaseApp.auth().signInWithCredential(credential);
        return userCredential.user;
    } catch (error) {
        logger.error('Failed to verify code:', error);
        throw error;
    }
};

module.exports = {
    sendVerificationCode,
    verifyCode,
};