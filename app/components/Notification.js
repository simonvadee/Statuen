/**
 * Created by andreeriksen on 24/05/2017.
 */
import PushNotification from 'react-native-push-notification'

export default class PushNotify{
  constructor(){}
  // ======================= Push notifications =======================
  static Push(message) {
    PushNotification.localNotification({
      title: "<Statuen>",
      message: message+" Beacon detected", // (required)
      date: Date.now(),
      category: 'OK'
    });
  }
// ======================= End =======================
}
