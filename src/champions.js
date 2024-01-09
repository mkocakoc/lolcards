import React, { useState, useEffect } from 'react';

const Champions = () => {
    const [championsData, setChampionsData] = useState(null);
    const [championsList, setChampions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/tr_TR/champion.json'
                );

                if (!response.ok) {
                    throw new Error('Veri çekilemedi');
                }

                const data = await response.json();
                setChampionsData(data.data);

                let champions = [];
                for (var i in data.data) {
                    champions.push(data.data[i]);
                };

                setChampions(champions);


            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchData();
    }, []); // Boş bağımlılık dizisi, sadece bir kere çalışması için

    if (!championsData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='champions'>
            {championsList.map((champion) => (
                <div className='champion' key={champion.id}   style={{
                    backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg')`,
                    backgroundRepeat: 'no-repeat',
                  }}>                   
                    <div className='champion_info'>
                        <div className='champion_info__stats'>
                            <div className='champion_info__stats__item'>
                                <div className='champion_info__stats__item__icon'>
                                    <img src='https://cdn2.iconfinder.com/data/icons/simple-ui-games/512/13-256.png' alt='Attack Damage' />
                                </div>
                                <div className='champion_info__stats__item__value'>
                                    {champion.info.attack}
                                </div>
                            </div>
                            <div className='champion_info__stats__item'>
                                <div className='champion_info__stats__item__icon'>
                                    <img src='https://cdn2.iconfinder.com/data/icons/simple-ui-games/512/5_copy-256.png' alt='Magic Damage' />
                                </div>
                                <div className='champion_info__stats__item__value'>
                                    {champion.info.magic}
                                </div>
                            </div>
                            <div className='champion_info__stats__item'>
                                <div className='champion_info__stats__item__icon'>
                                    <img src='https://cdn2.iconfinder.com/data/icons/simple-ui-games/512/5-256.png' alt='Defense' />
                                </div>
                                <div className='champion_info__stats__item__value'>
                                    {champion.info.defense}
                                </div>
                            </div>
                            <div className='champion_info__stats__item'>
                                <div className='champion_info__stats__item__icon'>
                                    <img src='https://cdn2.iconfinder.com/data/icons/simple-ui-games/512/4_copy-256.png' alt='Difficulty' />
                                </div>
                                <div className='champion_info__stats__item__value'>
                                    {champion.info.difficulty}
                                </div>
                            </div>
                        </div>
                        <div className='champion_info__tags'>
                            {champion.tags.map((tag) => (
                                <div className='champion_info__tags__item' key={tag}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='champion_content'>

                        <h3>{champion.name}</h3>
                        <h4>{champion.title}</h4>
                        <p>{champion.blurb}</p>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default Champions;
