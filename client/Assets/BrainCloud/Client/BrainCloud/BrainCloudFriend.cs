//----------------------------------------------------
// brainCloud client source code
// Copyright 2015 bitHeads, inc.
//----------------------------------------------------

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Net;
using JsonFx.Json;
using BrainCloud.Internal;

namespace BrainCloud
{
    public class BrainCloudFriend
    {
        private BrainCloudClient m_brainCloudClientRef;

        public BrainCloudFriend (BrainCloudClient in_brainCloudClientRef)
        {
            m_brainCloudClientRef = in_brainCloudClientRef;
        }

        /// <summary>
        /// Retrieves profile information for the specified user.
        /// </summary>
        /// <remarks>
        /// Service Name - Friend
        /// Service Operation - GetFriendProfileInfo
        /// </remarks>
        /// <param name="in_friendId">
        /// Profile Id of friend who owns entity.
        /// </param>
        /// <param name="in_authenticationType">
        /// The authentication type used for this friend id e.g. Facebook
        /// </param>
        /// <param name="in_success">
        /// The success callback.
        /// </param>
        /// <param name="in_failure">
        /// The failure callback.
        /// </param>
        /// <param name="in_cbObject">
        /// The user object sent to the callback.
        /// </param>
        /// <returns> The JSON returned in the callback
        /// {
        ///   "status":200,
        ///   "data": {
        ///     "playerId" : "17c7ee96-1b73-43d0-8817-cba1953bbf57",
        ///     "playerName" : "Donald Trump",
        ///     "email" : "donald@trumpcastle.com",
        ///     "playerSummaryData" : {},
        ///   }
        /// }
        /// </returns>
        public void GetFriendProfileInfo(
            string in_friendId,
            string in_authenticationType,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.FriendServiceFriendId.Value] = in_friendId;
            data[OperationParam.FriendServiceAuthenticationType.Value] = in_authenticationType;
            
            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Friend, ServiceOperation.GetFriendProfileInfo, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Returns a particular entity of a particular friend.
        /// </summary>
        /// <remarks>
        /// Service Name - Friend
        /// Service Operation - ReadFriendEntity
        /// </remarks>
        /// <param name="in_entityId">
        /// Id of entity to retrieve.
        /// </param>
        /// <param name="in_friendId">
        /// Profile Id of friend who owns entity.
        /// </param>
        /// <param name="in_success">
        /// The success callback.
        /// </param>
        /// <param name="in_failure">
        /// The failure callback.
        /// </param>
        /// <param name="in_cbObject">
        /// The user object sent to the callback.
        /// </param>
        /// <returns> The JSON returned in the callback
        /// </returns>
        public void ReadFriendEntity(
            string in_entityId,
            string in_friendId,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.FriendServiceEntityId.Value] = in_entityId;
            data[OperationParam.FriendServiceFriendId.Value] = in_friendId;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Friend, ServiceOperation.ReadFriendEntity, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Returns entities of all friends based on type and/or subtype.
        /// </summary>
        /// <remarks>
        /// Service Name - Friend
        /// Service Operation - ReadFriendsEntities
        /// </remarks>
        /// <param name="in_entityType">
        /// Types of entities to retrieve.
        /// </param>
        /// <param name="in_success">
        /// The success callback.
        /// </param>
        /// <param name="in_failure">
        /// The failure callback.
        /// </param>
        /// <param name="in_cbObject">
        /// The user object sent to the callback.
        /// </param>
        /// <returns> The JSON returned in the callback
        /// </returns>
        public void ReadFriendsEntities(
            string in_entityType,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.FriendServiceEntityType.Value] = in_entityType;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Friend, ServiceOperation.ReadFriendsEntities, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Returns list of friends with optional summary data.
        /// </summary>
        /// <remarks>
        /// Service Name - Friend
        /// Service Operation - ReadFriendsWithApplication
        /// </remarks>
        /// <param name="in_includeSummaryData">
        /// Whether to include summary data
        /// </param>
        /// <param name="in_success">
        /// The success callback.
        /// </param>
        /// <param name="in_failure">
        /// The failure callback.
        /// </param>
        /// <param name="in_cbObject">
        /// The user object sent to the callback.
        /// </param>
        /// <returns> The JSON returned in the callback
        /// </returns>
        public void ReadFriendsWithApplication(
            bool in_includeSummaryData,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.FriendServiceIncludeSummaryData.Value] = in_includeSummaryData;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Friend, ServiceOperation.ReadFriendsWithApplication, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Returns player state of a particular friend.
        /// </summary>
        /// <remarks>
        /// Service Name - Friend
        /// Service Operation - ReadFriendPlayerState
        /// </remarks>
        /// <param name="in_friendId">
        /// Profile Id of friend to retrieve player state for.
        /// </param>
        /// <param name="in_success">
        /// The success callback.
        /// </param>
        /// <param name="in_failure">
        /// The failure callback.
        /// </param>
        /// <param name="in_cbObject">
        /// The user object sent to the callback.
        /// </param>
        /// <returns> The JSON returned in the callback
        /// </returns>
        public void ReadFriendPlayerState(
            string friendId,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.FriendServiceReadPlayerStateFriendId.Value] = friendId;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Friend, ServiceOperation.ReadFriendPlayerState, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Updates the "friend summary data" associated with the logged in player.
        /// Some operations will return this summary data. For instance the social
        /// leaderboards will return the player's score in the leaderboard along
        /// with the friend summary data. Generally this data is used to provide
        /// a quick overview of the player without requiring a separate API call
        /// to read their public stats or entity data.
        ///
        /// Note this API call pre-dates the shared player data api (public entity/stats)
        /// and thus usage for anything outside of social leaderboards should be
        /// deprecated.
        /// </summary>
        /// <remarks>
        /// Service Name - PlayerState
        /// Service Operation - UpdateSummary
        /// </remarks>
        /// <param name="in_jsonSummaryData">
        /// A JSON string defining the summary data.
        /// For example:
        /// {
        ///   "xp":123,
        ///   "level":12,
        ///   "highScore":45123
        /// }
        /// </param>
        /// <param name="in_success">
        /// The success callback.
        /// </param>
        /// <param name="in_failure">
        /// The failure callback.
        /// </param>
        /// <param name="in_cbObject">
        /// The user object sent to the callback.
        ///
        /// </param>
        /// <returns> The JSON returned in the callback is as follows:
        /// {
        ///   "status":200,
        ///   "data":null
        /// }
        /// </returns>
        public void UpdateSummaryFriendData(
            string in_jsonSummaryData,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            if (Util.IsOptionalParameterValid(in_jsonSummaryData))
            {
                Dictionary<string, object> summaryData = JsonReader.Deserialize<Dictionary<string, object>> (in_jsonSummaryData);
                data[OperationParam.PlayerStateServiceUpdateFriendSummaryData.Value] = summaryData;
            }
            else data = null;
            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.PlayerState, ServiceOperation.UpdateSummary, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }
    }
}

