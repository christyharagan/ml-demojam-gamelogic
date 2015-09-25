using UnityEngine;
using System.Collections;

public class DestroyByContact : MonoBehaviour
{
	public GameObject explosion;
	public GameObject playerExplosion;
	public int scoreValue;
	private GameController gameController;

	void Start ()
	{
		GameObject gameControllerObject = GameObject.FindGameObjectWithTag ("GameController");
		if (gameControllerObject != null)
		{
			gameController = gameControllerObject.GetComponent <GameController>();
		}
		if (gameController == null)
		{
			Debug.Log ("Cannot find 'GameController' script");
		}
	}

	void OnTriggerEnter (Collider other)
	{
		if(other.CompareTag("Boundary") || other.CompareTag("Enemy") 
		         || other.CompareTag("Powerup1") || other.CompareTag("Powerup2"))
		{
			Debug.Log ("this is the return function: " + other.tag);
			return;
		}

		if (explosion != null)
		{
			Instantiate(explosion, transform.position, transform.rotation);
		}

		gameController.AddScore(scoreValue);
//		if (other.CompareTag("Undefined")) {
//			Debug.Log("undefined is this: " + other.tag);
//		}
		if (other.CompareTag("Player"))
		{
			Instantiate(playerExplosion, other.transform.position, other.transform.rotation);
			gameController.GameOver();
		}

		if (gameObject.name.StartsWith("Enemy Ship"))
		{
			Debug.Log ("why is it coming here : " + gameObject.tag);
			gameController.OnEnemyKilled();
		}
		else if (gameObject.name.StartsWith ("Asteroid"))
		{
			gameController.OnAsteroidDestroyed();
		}

		Destroy (other.gameObject);
		Destroy (gameObject);
	}
}