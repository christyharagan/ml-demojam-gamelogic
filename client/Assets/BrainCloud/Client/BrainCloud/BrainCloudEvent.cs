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
    public class BrainCloudEvent
    {
        private BrainCloudClient m_brainCloudClientRef;

        public BrainCloudEvent (BrainCloudClient in_brainCloudClientRef)
        {
            m_brainCloudClientRef = in_brainCloudClientRef;
        }

        /// <summary>
        /// Sends an event to the designated player id with the attached json data.
        /// Any events that have been sent to a player will show up in their
        /// incoming event mailbox. If the in_recordLocally flag is set to true,
        /// a copy of this event (with the exact same event id) will be stored
        /// in the sending player's "sent" event mailbox.
        ///
        /// Note that the list of sent and incoming events for a player is returned
        /// in the "ReadPlayerState" call (in the BrainCloudPlayer module).
        /// </summary>
        /// <remarks>
        /// Service Name - Event
        /// Service Operation - Send
        /// </remarks>
        /// <param name="in_toPlayerId">
        /// The id of the player who is being sent the event
        /// </param>
        /// <param name="in_eventType">
        /// The user-defined type of the event.
        /// </param>
        /// <param name="in_jsonEventData">
        /// The user-defined data for this event encoded in JSON.
        /// </param>
        /// <param name="in_recordLocally">
        /// If true, a copy of this event will be saved in the
        /// user's sent events mailbox.
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
        /// <returns> The JSON returned in the callback includes the server generated
        /// event id and is as follows:
        /// {
        ///   "status":200,
        ///   "data":{
        ///     "eventId":3824
        ///   }
        /// }
        /// </returns>
        public void SendEvent(
            string in_toPlayerId,
            string in_eventType,
            string in_jsonEventData,
            bool in_recordLocally,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();

            data[OperationParam.EventServiceSendToId.Value] = in_toPlayerId;
            data[OperationParam.EventServiceSendEventType.Value] = in_eventType;

            if (Util.IsOptionalParameterValid(in_jsonEventData))
            {
                Dictionary<string, object> eventData = JsonReader.Deserialize<Dictionary<string, object>> (in_jsonEventData);
                data[OperationParam.EventServiceSendEventData.Value] = eventData;
            }

            data[OperationParam.EventServiceSendRecordLocally.Value] = in_recordLocally;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Event, ServiceOperation.Send, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Updates an event in the player's incoming event mailbox.
        /// </summary>
        /// <remarks>
        /// Service Name - Event
        /// Service Operation - UpdateEventData
        /// </remarks>
        /// <param name="in_fromPlayerId">
        /// The id of the player who sent the event
        /// </param>
        /// <param name="in_eventId">
        /// The event id
        /// </param>
        /// <param name="in_jsonEventData">
        /// The user-defined data for this event encoded in JSON.
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
        /// <returns> The JSON returned in the callback is as follows:
        /// {
        ///   "status":200,
        ///   "data":null
        /// }
        /// </returns>
        public void UpdateIncomingEventData(
            string in_fromPlayerId,
            ulong in_eventId,
            string in_jsonEventData,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.EventServiceUpdateEventDataFromId.Value] = in_fromPlayerId;
            data[OperationParam.EventServiceUpdateEventDataEventId.Value] = in_eventId;

            if (Util.IsOptionalParameterValid(in_jsonEventData))
            {
                Dictionary<string, object> eventData = JsonReader.Deserialize<Dictionary<string, object>> (in_jsonEventData);
                data[OperationParam.EventServiceUpdateEventDataData.Value] = eventData;
            }

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Event, ServiceOperation.UpdateEventData, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Delete an event out of the player's incoming mailbox.
        /// </summary>
        /// <remarks>
        /// Service Name - Event
        /// Service Operation - DeleteIncoming
        /// </remarks>
        /// <param name="in_fromPlayerId">
        /// The id of the player who sent the event
        /// </param>
        /// <param name="in_eventId">
        /// The event id
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
        /// <returns> The JSON returned in the callback is as follows:
        /// {
        ///   "status":200,
        ///   "data":null
        /// }
        /// </returns>
        public void DeleteIncomingEvent(
            string in_fromPlayerId,
            ulong in_eventId,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.EventServiceDeleteIncomingFromId.Value] = in_fromPlayerId;
            data[OperationParam.EventServiceDeleteIncomingEventId.Value] = in_eventId;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Event, ServiceOperation.DeleteIncoming, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }

        /// <summary>
        /// Delete an event from the player's sent mailbox.
        ///
        /// Note that only events sent with the "recordLocally" flag
        /// set to true will be added to a player's sent mailbox.
        /// </summary>
        /// <remarks>
        /// Service Name - Event
        /// Service Operation - DeleteSent
        /// </remarks>
        /// <param name="in_toPlayerId">
        /// The id of the player who is being sent the event
        /// </param>
        /// <param name="in_eventId">
        /// The event id
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
        /// <returns> The JSON returned in the callback is as follows:
        /// {
        ///   "status":200,
        ///   "data":null
        /// }
        /// </returns>
        public void DeleteSentEvent(
            string in_toPlayerId,
            ulong in_eventId,
            SuccessCallback in_success = null,
            FailureCallback in_failure = null,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data[OperationParam.EventServiceDeleteSentToId.Value] = in_toPlayerId;
            data[OperationParam.EventServiceDeleteSentEventId.Value] = in_eventId;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.Event, ServiceOperation.DeleteSent, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }
    }
}
