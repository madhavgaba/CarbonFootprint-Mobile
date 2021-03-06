import * as firebase from 'firebase';

/**
 *update user details in database
 * @param  uid  user id or unique id of logged in user
 * @param  data co2 emitted by user from all sources
 * @return {Promise}
 */
export function setUser(uid, data) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('users/' + uid)
            .set({
                ...data
            })
            .then(() => resolve())
            .catch(error => reject(error));
    });
}

/**
 * getting user details from uid
 * @param  uid user id or unique id of logged in user
 * @return {Promise}
 */
export function getUser(uid) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref('users/' + uid)
            .once('value')
            .then(function(snapshot) {
                if (snapshot.val() !== null) {
                    resolve({
                        ...snapshot.val(),
                        uid: uid
                    });
                } else {
                    reject();
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
