import { useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserPage.css'

const UserPage = () => {
    const userData = useSelector(state => state.session.stats?.user)
    const matchData = useSelector(state => state.session.stats?.matches)
    const dispatch = useDispatch()
    const history = useHistory();
    const matches = useMediaQuery('(min-width:1127px)');
    // window.location.reload(history.push("/"));
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
                        <div id='bannerProfPic'>
                            <div id='sumLvl'>
                                <span>100</span>
                            </div>
                        </div>
                    </div>
                    <div id='bannerSumName'>
                        <h1>SumName</h1>
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
                    <div className='gameContainer'>
                        <div className='Gameinfo'>
                            <div className='gameType'>
                                Normal
                            </div>
                            <div className='whenGameCreated'>
                                19 days ago
                            </div>
                            <div className='divider'>

                            </div>
                            <div className='winOrLoss'>
                                Victory
                            </div>
                            <div className='GameLength'>
                                32m 28s
                            </div>
                        </div>
                        <div className='ChampData'>
                            <div className='Champimages'>
                                <div className='champPic'>

                                </div>
                                <div className='sumSpellContainer'>
                                    <div className='SumSpell1'>

                                    </div>
                                    <div className='SumSpell2'>

                                    </div>
                                </div>
                            </div>
                            <div className='Champtext'>
                                <div className='Text'>
                                    AAtrox
                                </div>
                            </div>
                        </div>
                        <div className='kdaAndRatio'>
                            <div className='KDA'>
                                <div>
                                    0
                                </div>
                                /
                                <div>
                                    2
                                </div>
                                /
                                <div>
                                    0
                                </div>
                            </div>
                            <div className='Ratio'>
                                1.00/1 KDA
                            </div>
                        </div>
                        <div className='ChampStats'>

                        </div>
                        <div className='items'>

                        </div>
                        <div className='participants'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
