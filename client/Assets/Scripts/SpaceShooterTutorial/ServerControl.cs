using UnityEngine;
using System.Collections;

public class ServerControl {

	public ServerControl() {
	}

	public void Register(string userName) {
		string registerUrl = "register?name=" + userName;
		Debug.Log ("in register method: " + registerUrl); 
		RestConnect.Instance().POST (registerUrl);
		WWW response = RestConnect.Instance().GET ("http://localhost:8888/rest/destinations/getPlaceId/Goa");
		Debug.Log (response.text);
		Debug.Log ("post done");
	}
}
