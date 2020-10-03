import React, { useEffect, useState } from 'react'
import { ContentCollection } from '/imports/api/content';
import { useTracker } from 'meteor/react-meteor-data';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: 'flex',
      padding: 10
    },
    content: {
        width: '80%'
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const [weather, setWeather] = useState(null)
    const content = useTracker(() => ContentCollection.find().fetch());

    useEffect(() => {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=Nur-Sultan&appid=e0c6f048e71e320b10dba1dc5a18e13a')
            .then(res => res.json())
            .then(data => setWeather(data))
    }, [])

    if (!content[0]) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.content} dangerouslySetInnerHTML={{__html: content[0].content}} />

            {weather &&
                <div>
                    <p>Weather:</p>
                    <p>Temperature: {weather.main.temp - 274,15} ( °C )</p>
                    <p>Feels like: {weather.main.feels_like - 274,15} ( °C )</p>
                </div>
            }
        </div>
    )
}

export default HomePage