using UnityEngine;
using SocketIOClient;
using System.Collections;

public class ServerControl {
	private string userId;
	private Client client = new Client("http://localhost:8080");

	public ServerControl() {
		client.Opened += SocketOpened;
		client.Message += SocketMessage;
//		client.SocketConnectionClosed += SocketConnectionClosed;
//		client.Error +=SocketError;		
		client.Connect();
	}

	private void SocketOpened(object sender, System.EventArgs e) {
		//invoke when socket opened
		Debug.Log ("socket openeing");
	}

	public void Register(string userName) {
		this.userId = userName;
		string registerUrl = "register?name=" + userName;
		RestConnect.Instance().POST (registerUrl);
//		string response = RestConnect.Instance().GET ("http://localhost:8888/rest/destinations/getPlaceId/Goa");
		client.Send("post done");
	}

	private void SocketMessage (object sender, MessageEventArgs e) {
		if ( e!= null && e.Message.Event == "updateRanking") {
			string msg = e.Message.MessageText;
			Update_Ranking(msg);
		}
	}

	public void Increment_Score(int score, int type) {
		if (userId != null) {
			string incrementScoreUrl = "incrementScore?name="+ userId + "&increment=" + score + "&objectType="+type;
			RestConnect.Instance().POST (incrementScoreUrl);
		}
	}

	public void Update_Ranking(string message) {
		Debug.Log ("update ranking message: " + message);
	}
}
