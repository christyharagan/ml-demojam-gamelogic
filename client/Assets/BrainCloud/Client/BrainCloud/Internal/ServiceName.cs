﻿//----------------------------------------------------
// brainCloud client source code
// Copyright 2015 bitHeads, inc.
//----------------------------------------------------

using System;
using System.Collections.Generic;
using System.Text;

namespace BrainCloud.Internal
{
    internal class ServiceName
    {
        // Services
        public static readonly ServiceName Authenticate = new ServiceName("authenticationV2");
        public static readonly ServiceName Identity = new ServiceName("identity");
        public static readonly ServiceName Currency = new ServiceName("currency");
        public static readonly ServiceName FriendData = new ServiceName("friendData");
        public static readonly ServiceName HeartBeat = new ServiceName("heartbeat");
        public static readonly ServiceName ServerTime = new ServiceName("time");

        public static readonly ServiceName PushNotification = new ServiceName("pushNotification");
        public static readonly ServiceName GlobalGameStatistics = new ServiceName("globalGameStatistics");
        public static readonly ServiceName PlayerStatisticsEvent = new ServiceName("playerStatisticsEvent");
        public static readonly ServiceName Twitter = new ServiceName("twitter");
        public static readonly ServiceName Steam = new ServiceName("steam");

        public static readonly ServiceName PlayerState = new ServiceName("playerState");
        public static readonly ServiceName Entity = new ServiceName("entity");
        public static readonly ServiceName GlobalEntity = new ServiceName("globalEntity");
        public static readonly ServiceName Friend = new ServiceName("friend");
        public static readonly ServiceName Time = new ServiceName("time");

        public static readonly ServiceName SocialLeaderboard = new ServiceName("socialLeaderboard");
        public static readonly ServiceName Event = new ServiceName("event");
        public static readonly ServiceName Product = new ServiceName("product");
        public static readonly ServiceName PlayerStatistics = new ServiceName("playerStatistics");
        public static readonly ServiceName GlobalStatistics = new ServiceName("globalGameStatistics");
        public static readonly ServiceName AsyncMatch = new ServiceName("asyncMatch");

        public static readonly ServiceName Script = new ServiceName("script");
        public static readonly ServiceName MatchMaking = new ServiceName("matchMaking");
        public static readonly ServiceName OneWayMatch = new ServiceName("onewayMatch");
        public static readonly ServiceName PlaybackStream = new ServiceName("playbackStream");
        public static readonly ServiceName Gamification = new ServiceName("gamification");

        public static readonly ServiceName GlobalApp = new ServiceName("globalApp");

        private ServiceName(string value)
        {
            Value = value;
        }

        public string Value
        {
            get;
            private set;
        }

    }
}
