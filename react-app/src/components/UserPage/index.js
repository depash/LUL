import { useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { GetMatches } from '../../store/Stats';
import './UserPage.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)


const timeAgo = new TimeAgo('en-US')

const UserPage = () => {
    const userData = useSelector(state => state.stats.user)
    const matchData = useSelector(state => state.stats.matches)
    const dispatch = useDispatch()
    const history = useHistory();
    const matches = useMediaQuery('(min-width:1127px)');
    // window.location.reload(history.push("/"));
    const params = useParams();
    useEffect(() => {
        async function fetchData() {
            await dispatch(GetMatches(params.userName, params.region))
        }
        fetchData()
    }, [])
    const getTimeSince = (match) => {
        const date = new Date(match.gameCreaton);
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    const findParticipant = (participants) => {
        for (let participant = 0; participant < participants.length; participant++) {
            const element = participants[participant];
            if (element.summonerName === userData.name) {
                return element
            }
        }
    }
    const idToSpellName = (id) => {
        if (id === 21) {
            return 'Barrier'
        }
        if (id === 1) {
            return 'Cleanse'
        }
        if (id === 14) {
            return 'Dot'
        }
        if (id === 3) {
            return 'Exhaust'
        }
        if (id === 4) {
            return 'Flash'
        }
        if (id === 6) {
            return 'Ghost'
        }
        if (id === 7) {
            return 'Heal'
        }
        if (id === 13) {
            return 'Clarity'
        }
        if (id === 11) {
            return 'Smite'
        }
        if (id === 12) {
            return 'Teleport'
        }
    }
    return (
        <div id='userPageContainer'>
            {/* <div id='profileIcon' style={{
                backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${userData.profileIconId}.png")`
            }}>
            </div> */}
            <div id='background'>

            </div>
            <div id='banner'>
                <div>
                    <div id='PicAndLvl'>
                        <div id='bannerProfPic' style={{
                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${userData && userData.profileIconId}.png")`
                        }}>
                            <div id='sumLvl'>
                                <span>100</span>
                            </div>
                        </div>
                    </div>
                    <div id='bannerSumName'>
                        <h1>
                            {userData && userData.name}
                        </h1>
                    </div>
                </div>
            </div>
            <div id='rankDisplayAndGamesContainer'>
                <div id='rankDisplay'>
                    {!matches ?
                        <>
                            <div className='RankContainer'>
                                <span>
                                    Rank Type
                                </span>
                                <div className='rankBody'>
                                    <div className='RankImage'>
                                        <div className='rankPlaceholder'>

                                        </div>
                                    </div>
                                    <div className='RankInfo'>
                                        <span>
                                            Rank
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='RankContainer'>
                                <span>
                                    Rank Type
                                </span>
                                <div className='rankBody'>
                                    <div className='RankImage'>
                                        <div className='rankPlaceholder'>

                                        </div>
                                    </div>
                                    <div className='RankInfo'>
                                        <span>
                                            Rank
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className='RankContainer'>
                                <div className='RankImage'>
                                    <div className='rankPlaceholder'>

                                    </div>
                                </div>
                                <div className='RankInfo'>
                                    <span>
                                        Rank Type
                                    </span>
                                    <span>
                                        Rank
                                    </span>
                                </div>
                            </div>
                            <div className='RankContainer'>
                                <div className='RankImage'>
                                    <div className='rankPlaceholder'>

                                    </div>
                                </div>
                                <div className='RankInfo'>
                                    <span>
                                        Rank Type
                                    </span>
                                    <span>
                                        Rank
                                    </span>
                                </div>
                            </div>
                        </>}
                </div>
                <div id='allGamesContainer'>
                    {matchData && matchData.map((match, i) => (
                        <div className='gameContainer victory'>
                            <div className='Gameinfo'>
                                <div className='gameType'>
                                    {match.gameMode}
                                </div>
                                <div className='whenGameCreated'>
                                    {getTimeSince(match) + ' ago'}
                                </div>
                                <div className='divider'>

                                </div>
                                {match.participants[0].win ?
                                    <div className='winOrLoss victoryText'>
                                        victory
                                    </div>
                                    :
                                    <div className='winOrLoss defeatText'>
                                        defeat
                                    </div>
                                }
                                <div className='GameLength'>
                                    {match.gameDuration}
                                </div>
                            </div>
                            <div className='ChampData'>
                                <div className='Champimages' >
                                    <div className='champPic' style={{
                                        backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${findParticipant(match.participants).champ}.png")`
                                    }}>

                                    </div>
                                    <div className='sumSpellContainer'>
                                        <div className='SumSpell1' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/Summoner${idToSpellName(findParticipant(match.participants).summoner1Id)}.png")`
                                        }}>

                                        </div>
                                        <div className='SumSpell2' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/Summoner${idToSpellName(findParticipant(match.participants).summoner2Id)}.png")`
                                        }}>

                                        </div>
                                    </div>
                                </div>
                                <div className='Champtext'>
                                    <div className='Text'>
                                        {findParticipant(match.participants).champ}
                                    </div>
                                </div>
                            </div>
                            <div className='kdaAndRatio'>
                                <div className='KDA'>
                                    <div>
                                        {findParticipant(match.participants).kills}
                                    </div>
                                    /
                                    <div style={{
                                        color: `#ff2b2b`
                                    }}>
                                        {findParticipant(match.participants).deaths}
                                    </div>
                                    /
                                    <div>
                                        {findParticipant(match.participants).assists}
                                    </div>
                                </div>
                                <div className='Ratio'>
                                    {(findParticipant(match.participants).kills + findParticipant(match.participants).assists / findParticipant(match.participants).deaths).toFixed(2)}/1 KDA
                                </div>
                            </div>
                            <div className='ChampStats'>
                                <div className='lvl'>
                                    {'Level ' + findParticipant(match.participants).champLevel}
                                </div>
                                <div className='CS'>
                                    {findParticipant(match.participants).totalMinionsKilled + ' '}CS
                                </div>
                                <div className='dmgDelt'>
                                    {'Damage ' + findParticipant(match.participants).totalDamageDealt}
                                </div>
                            </div>
                            <div className='items'>
                                <div className='ItemsContainer'>
                                    <div>
                                        <div className='Item' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${findParticipant(match.participants).item0}.png")`
                                        }}>

                                        </div>
                                        <div className='Item' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${findParticipant(match.participants).item1}.png")`
                                        }}>

                                        </div>
                                        <div className='Item' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${findParticipant(match.participants).item2}.png")`
                                        }}>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='Item' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${findParticipant(match.participants).item3}.png")`
                                        }}>

                                        </div>
                                        <div className='Item' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${findParticipant(match.participants).item4}.png")`
                                        }}>

                                        </div>
                                        <div className='Item' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${findParticipant(match.participants).item5}.png")`
                                        }}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='participants'>
                                <div className='yourTeam'>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[0].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[0].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[1].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[1].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[2].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[2].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[3].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[3].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[4].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[4].summonerName}
                                        </span>
                                    </div>
                                </div>
                                <div className='EnemyTeam'>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[5].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[5].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[6].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[6].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[7].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[7].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[8].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[8].summonerName}
                                        </span>
                                    </div>
                                    <div className='Member'>
                                        <div className='MemberPic' style={{
                                            backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${match.participants[9].champ}.png")`
                                        }}>

                                        </div>
                                        <span className='MemberName'>
                                            {match.participants[9].summonerName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPage;
