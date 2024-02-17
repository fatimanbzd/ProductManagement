import {Config} from "../../environments/environment";

export class Utilities {

  static getCurrentUser() {
    const user = localStorage.getItem(Config.JWT_TOKEN);
    if (user)
      return user;


    return null;
  }
}
