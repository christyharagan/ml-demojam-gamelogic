using UnityEngine;
using System.Collections;

public class GameLogin : MonoBehaviour {

	private string m_username = "";
	private string m_password = "";

	private Vector2 m_scrollPosition;

	private string m_authStatus = "Welcome to GameLogic";


	// Use this for initialization
	void Start () {
		m_username = PlayerPrefs.GetString("username");
		
		// Stores the password in plain text directly in the unity store.
		// This is obviously not secure but speeds up debugging/testing.
		m_password = PlayerPrefs.GetString("password");
	}

	void OnGUI()
	{
		int width = Screen.width / 2 - 125;
		if (width < 500) width = 500;
		if (width > Screen.width) width = Screen.width;
		
		int height = Screen.height / 2 - 200;
		if (height < 400) height = 400;
		if (height > Screen.height) height = Screen.height;
		
		GUILayout.Window(0, new Rect(Screen.width / 2 - (width / 2), Screen.height / 2 - (height / 2), width, height), OnWindow, "brainCloud Login");
	}

	void OnWindow(int windowId)
	{
		GUILayout.FlexibleSpace ();
		GUILayout.BeginHorizontal ();
		GUILayout.FlexibleSpace ();
		GUILayout.BeginVertical ();
		
		GUILayout.Label ("Username");
		m_username = GUILayout.TextField (m_username, GUILayout.MinWidth (200));
		
		GUILayout.Label ("Password");
		m_password = GUILayout.PasswordField (m_password, '*', GUILayout.MinWidth (100));
		
		GUILayout.Space (10);
		
		GUILayout.BeginHorizontal ();
		GUILayout.FlexibleSpace();
		
		if (GUILayout.Button ("Authenticate", GUILayout.MinHeight (30), GUILayout.MinWidth (100))) 
		{
			if( m_username.Length == 0 || m_password.Length == 0 )
			{
				Debug.Log("Username/password can't be empty");
			}
			else 
			{
				Debug.Log("Attempting to authenticate...");
				PlayerPrefs.SetString("username", m_username);
				PlayerPrefs.SetString("password", m_password);
				
				///////////////////////////////////////////////////////////////////
				// brainCloud authentication
				///////////////////////////////////////////////////////////////////
				Debug.Log("will send to server now");
				Sucess_Done();
//				BrainCloudWrapper.GetInstance().AuthenticateUniversal(m_username, m_password, true, OnSuccess_Authenticate, OnError_Authenticate);
				
				///////////////////////////////////////////////////////////////////
			}
		}
		
		GUILayout.EndHorizontal ();
		GUILayout.Space (20);
		
		m_scrollPosition = GUILayout.BeginScrollView(m_scrollPosition, GUILayout.ExpandWidth(true), GUILayout.ExpandHeight(true));
		GUILayout.TextArea(m_authStatus);
		GUILayout.EndScrollView();
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if (GUILayout.Button("Clear Log", GUILayout.MinHeight(30), GUILayout.MinWidth(100)))
		{
			m_authStatus = "";
		}
		GUILayout.EndHorizontal();
		
		GUILayout.FlexibleSpace();
		
		GUILayout.EndVertical ();
		GUILayout.FlexibleSpace ();
		GUILayout.EndHorizontal ();
		GUILayout.FlexibleSpace ();
	}

	public void Sucess_Done() {
		Debug.Log ("Success");
		Application.LoadLevel("Game");
	}

	public void OnSuccess_Authenticate(string responseData, object cbObject)
	{
		Debug.Log("Authenticate successful!");
		Application.LoadLevel("Game");
	}

	public void OnError_Authenticate(int statusCode, int reasonCode, string statusMessage, object cbObject)
	{
		Debug.Log("Authenticate failed: " + statusMessage);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
