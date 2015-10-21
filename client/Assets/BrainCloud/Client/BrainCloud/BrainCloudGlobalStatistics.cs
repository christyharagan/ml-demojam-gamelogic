//----------------------------------------------------
// brainCloud client source code
// Copyright 2015 bitHeads, inc.
//----------------------------------------------------

using System;
using System.Collections.Generic;
using System.Text;
using JsonFx.Json;
using BrainCloud.Internal;

namespace BrainCloud
{
    public class BrainCloudGlobalStatistics
    {
        private BrainCloudClient m_brainCloudClientRef;
        public BrainCloudGlobalStatistics(BrainCloudClient in_brainCloudClientRef)
        {
            m_brainCloudClientRef = in_brainCloudClientRef;
        }

        /// <summary>
        /// Method returns all of the global statistics.
        /// </summary>
        /// <remarks>
        /// Service Name - GlobalStatistics
        /// Service Operation - Read
        /// </remarks>
        /// <param name="in_success">
        /// The success callback
        /// </param>
        /// <param name="in_failure">
        /// The failure callback
        /// </param>
        /// <param name="in_cbObject">
        /// The callback object
        /// </param>
        /// <returns> JSON describing the global statistics:
        /// {
        ///   "status":200,
        ///   "data":{
        ///     "statisticsExceptions":{
        ///     },
        ///     "statistics":{
        ///       "Level02_TimesBeaten":11,
        ///       "Level01_TimesBeaten":1,
        ///       "GameLogins":376,
        ///       "PlayersWhoLikePirateClothing":12
        ///     }
        ///   }
        /// }
        /// </returns>
        public void ReadAllGlobalStats(
            SuccessCallback in_success,
            FailureCallback in_failure,
            object in_cbObject = null)
        {
            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.GlobalStatistics, ServiceOperation.Read, null, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }


        /// <summary>
        /// Reads a subset of global statistics as defined by the input JSON.
        /// </summary>
        /// <remarks>
        /// Service Name - GlobalStatistics
        /// Service Operation - ReadSubset
        /// </remarks>
        /// <param name="in_jsonData">
        /// The json data containing an array of statistics to read:
        /// [
        ///   "Level01_TimesBeaten",
        ///   "Level02_TimesBeaten"
        /// ]
        /// </param>
        /// <param name="in_success">
        /// The success callback
        /// </param>
        /// <param name="in_failure">
        /// The failure callback
        /// </param>
        /// <param name="in_cbObject">
        /// The callback object
        /// </param>
        /// <returns> JSON with the subset of global statistics:
        /// {
        ///   "status":200,
        ///   "data":{
        ///     "statisticsExceptions":{
        ///     },
        ///     "statistics":{
        ///       "Level02_TimesBeaten":11,
        ///       "Level01_TimesBeaten":1
        ///     }
        ///   }
        /// }
        /// </returns>
        public void ReadGlobalStatsSubset(
            string in_jsonData,
            SuccessCallback in_success,
            FailureCallback in_failure,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            List<string> statsSubset = JsonReader.Deserialize<List<string>>(in_jsonData);
            data[OperationParam.PlayerStatisticsServiceStats.Value] = statsSubset;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.GlobalStatistics, ServiceOperation.ReadSubset, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }


        /// <summary>
        /// Atomically increment (or decrement) global statistics.
        /// Global statistics are defined through the brainCloud portal.
        /// </summary>
        /// <remarks>
        /// Service Name - GlobalStatistics
        /// Service Operation - UpdateIncrement
        /// </remarks>
        /// <param name="in_jsonData">
        /// The JSON encoded data to be sent to the server as follows:
        /// {
        ///   stat1: 10,
        ///   stat2: -5.5,
        /// }
        /// would increment stat1 by 10 and decrement stat2 by 5.5.
        /// For the full statistics grammer see the api.braincloudservers.com site.
        /// There are many more complex operations supported such as:
        /// {
        ///   stat1:INC_TO_LIMIT#9#30
        /// }
        /// which increments stat1 by 9 up to a limit of 30.
        /// </param>
        /// <param name="in_success">
        /// The success callback
        /// </param>
        /// <param name="in_failure">
        /// The failure callback
        /// </param>
        /// <param name="in_cbObject">
        /// The callback object
        /// </param>
        /// <returns> JSON describing the new value of the statistics incremented (similar to ReadAll):
        /// {
        ///   "status":200,
        ///   "data":{
        ///     "statisticsExceptions":{
        ///     },
        ///     "statistics":{
        ///       "Level02_TimesBeaten":11,
        ///     }
        ///   }
        /// }
        /// </returns>
        public void IncrementGlobalStats(
            string in_jsonData,
            SuccessCallback in_success,
            FailureCallback in_failure,
            object in_cbObject = null)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            Dictionary<string, object> stats = JsonReader.Deserialize<Dictionary<string, object>> (in_jsonData);
            data[OperationParam.PlayerStatisticsServiceStats.Value] = stats;

            ServerCallback callback = BrainCloudClient.CreateServerCallback(in_success, in_failure, in_cbObject);
            ServerCall sc = new ServerCall(ServiceName.GlobalStatistics, ServiceOperation.UpdateIncrement, data, callback);
            m_brainCloudClientRef.SendRequest(sc);
        }
    }
}
