﻿using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using LitJson;

namespace BrainCloudUnity.HUD
{
	public class HUDLeaderboard : IHUDElement
	{
		class LBEntry
		{
			public string playerId;
			public string name;
			public long rank;
			public long score;
		}
		List<LBEntry> m_lb = new List<LBEntry>();
		string m_lbId = "default";
		string m_score = "1000";
		bool m_showPlayerIds = false;
		Vector2 m_scrollPosition = new Vector2(0,0);
		
		public void OnHUDActivate()
		{}
		
		public void OnHUDDeactivate()
		{}
		
		public string GetHUDTitle()
		{
			return "Leaderboard";
		}
		
		void RetrieveLeaderboard(string leaderboardId)
		{
			m_lb.Clear ();
			
			BrainCloudWrapper.GetBC ().SocialLeaderboardService.GetGlobalLeaderboard(
                leaderboardId, BrainCloud.BrainCloudSocialLeaderboard.FetchType.HIGHEST_RANKED, 100,
				ReadLeaderboardSuccess, ReadLeaderboardFailure);
		}

		void PostScore(string lbId, long score)
		{
			BrainCloudWrapper.GetBC ().SocialLeaderboardService.PostScoreToLeaderboard(
				lbId, score, null, PostScoreSuccess, PostScoreFailure);
		}

		void PostScoreSuccess(string json, object cb)
		{
			Debug.Log("Posted score successfully... refetching new scores: " + json);

			RetrieveLeaderboard(m_lbId);
		}

		void PostScoreFailure(int statusCode, int reasonCode, string statusMessage, object cb)
		{
			Debug.LogError("Failed to post to leaderboard: " + statusMessage);
		}

		void ReadLeaderboardSuccess(string json, object cb)
		{
			Debug.Log ("Leaderboard json: " + json);

			JsonData jObj = JsonMapper.ToObject(json);
			JsonData jLeaderboard = jObj["data"]["social_leaderboard"];
			IList entries = jLeaderboard as IList;
			if (entries != null)
			{
				foreach (JsonData jEntry in entries)
				{
					LBEntry lbe = new LBEntry();
					lbe.playerId = (string) jEntry["playerId"];
					lbe.name = (string) jEntry["name"];

					if (jEntry["rank"].IsInt)
					{
						lbe.rank = (int) jEntry["rank"];
					}
					else
					{
						lbe.rank = (long) jEntry["rank"];
					}

					if (jEntry["score"].IsInt)
					{
						lbe.score = (int) jEntry["score"];
					}
					else
					{
						lbe.score = (long) jEntry["score"];
					}
					m_lb.Add (lbe);
				}
			}
		}
		
		void ReadLeaderboardFailure(int statusCode, int reasonCode, string statusMessage, object cb)
		{
			Debug.LogError("Failed to read leaderboard: " + statusMessage);
		}
		
		public void OnHUDDraw()
		{
			GUILayout.BeginVertical();
			GUILayout.Box("Leaderboard Operations");

			GUILayout.BeginHorizontal ();
			GUILayout.Label ("Leaderboard Id:");
			m_lbId = GUILayout.TextField (m_lbId);
			if(GUILayout.Button("Fetch"))
			{
				RetrieveLeaderboard(m_lbId);
			}
			GUILayout.EndHorizontal ();

			GUILayout.BeginHorizontal ();
			GUILayout.Label ("Score:");
			m_score = GUILayout.TextField (m_score, GUILayout.MinWidth (100));
			if (GUILayout.Button("Post"))
			{
				long scoreAsLong;
				if (long.TryParse (m_score, out scoreAsLong))
				{
					PostScore(m_lbId, scoreAsLong);
				}
				else
				{
					Debug.LogError ("Can't parse score to long value");
				}
			}
			GUILayout.EndHorizontal ();

			GUILayout.Box("Results");

			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace ();
			m_showPlayerIds = GUILayout.Toggle (m_showPlayerIds, "Show Player Ids");
			GUILayout.EndHorizontal();

			m_scrollPosition = GUILayout.BeginScrollView(m_scrollPosition, GUILayout.ExpandWidth(true), GUILayout.ExpandHeight(true));

			foreach (LBEntry entry in m_lb)
			{
				string player;
				if (m_showPlayerIds)
				{
					player = entry.playerId;
				}
				else
				{
					player = entry.name == "" ? "(no name)" : entry.name;
				}
				GUILayout.BeginHorizontal();
				GUILayout.Label(entry.rank.ToString () + ":");
				GUILayout.Label (player);
				GUILayout.FlexibleSpace ();
				GUILayout.Label(entry.score.ToString ());
				GUILayout.EndHorizontal();
			}
			
			GUILayout.EndScrollView();

			GUILayout.EndVertical();
		}

	}
}
