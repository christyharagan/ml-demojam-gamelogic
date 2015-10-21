using UnityEngine;
using System.Collections;

public class RestConnect : MonoBehaviour{

	private static RestConnect r_instance;
	private static string hostUrl ;

	void Start(){}

	void Awake()
	{
		r_instance = this;
	}

	public static RestConnect Instance()
	{
		if (r_instance == null)
		{
			GameObject gameObject = new GameObject();
			r_instance = gameObject.AddComponent<RestConnect>();
			hostUrl = "http://localhost:8080/";
		}
		return (RestConnect)r_instance;
	}

	public void GET(string url)
	{
		string urlGet = hostUrl + url;
		Debug.Log ("GET the data: " + urlGet);
		WWW www = new WWW (urlGet);
		StartCoroutine (WaitForRequest (www));
	}


	public WWW POST(string url)
	{
		string urlPost = hostUrl + url;
		Debug.Log ("posting the data: " + urlPost);
		WWWForm form = new WWWForm();
//		foreach(KeyValuePair<String,String> post_arg in post)
//		{
//			form.AddField(post_arg.Key, post_arg.Value);
//		}
		WWW www = new WWW(urlPost, form);
		
		StartCoroutine(WaitForRequest(www));
//		Debug.Log ("this is the end of post data");
		return www; 
	}
	
	private IEnumerator WaitForRequest(WWW www)
	{
		yield return www;	
		// check for errors
		if (www.error == null)
		{
			Debug.Log("WWW Ok!: " + www.text);
		} else {
			Debug.Log("WWW Error: "+ www.error);
		}    
	}


	// Update is called once per frame
	void Update () {
	
	}
}
