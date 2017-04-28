declare var device;
import { Injectable } from '@angular/core';
import * as bowser from 'bowser';

@Injectable()
export class DeviceDiscoveryService {

  public deviceIsTablet(): boolean {

    //
    // NOTE: This applies due to Android devices.
    //       There is no reliable way to detect if a device is a tablet or a phone.
    //
    // So much pain...
    //
    // We are resorting to the following mechanism since most of our users are likely to use the app via Tablets.
    //
    // Please refer to this: https://developer.chrome.com/multidevice/user-agent
    //
    // IF the device is Android AND
    // 	If 'mobile' is not present in UA string
    // THEN
    // 	Assume that we are dealing with a tablet
    //
    let theReturnValue = false;
    const deviceIsIPad = ((typeof device !== 'undefined' && device.model !== 'undefined' && device.model.indexOf('iPad') > -1)) ? true : false ;
    if (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0) {
        return false
    }
    if (bowser.android === true) {
      if (navigator.userAgent.indexOf('Mobile') === -1) {
        theReturnValue = true;
      }
    } else {
      theReturnValue = (typeof bowser.tablet !== 'undefined' || deviceIsIPad === true);
    }
    return theReturnValue;
  };


  public deviceIsPhone(): boolean {
    let theReturnValue = false;
    const deviceIsIPad = (typeof device !== 'undefined' && device.model !== 'undefined' && device.model.indexOf('iPad') > -1) ? true : false ;
    if (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0) {
        return false
    }
    if (bowser.android === true) {
      if (navigator.userAgent.indexOf('Mobile') > -1) {
        theReturnValue = true;
      }
    } else {
      theReturnValue = (typeof bowser.mobile !== 'undefined' && deviceIsIPad === false);
    }
    return theReturnValue;
  };
 
}
