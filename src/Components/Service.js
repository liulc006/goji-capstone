import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, Link, useParams } from "react-router-dom";

const Service = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { services } = useSelector(state=>state);

    const serviceName = [
        'Dog Walking', 
        'House Sitting', 
        'Dog Day Care'
    ];

    const [checked, setChecked] = useState(id || {
        dogWalking: false,
        houseSitting: false,
        dogDaycare: false
    })

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
    };

    useEffect(()=>{
        navigate(`/services/filter/${JSON.stringify(checked)}`);
    }, [checked])

    const filterExtractor = (obj) => {
        const result=[];
        for (let key in obj){
            if(obj[key]){
                if(key === 'dogWalking'){
                    result.push('Dog Walking');
                }
                else if (key==='houseSitting'){
                    result.push('House Sitting');
                }
                else if (key === 'dogDaycare'){
                    result.push('Dog Day Care');
                }
            };
        };
        return result;
    };

    const filterInPlace = filterExtractor(JSON.parse(id || '{}'));

    const filteredServices = services.filter(ele => {
        if(filterInPlace.length === 0){
            return ele;
        }
        else if(filterInPlace.includes(ele.task)){
            return ele ;
        };
    });

    // console.log(filterInPlace)
    console.log(filteredServices)

    return (
        <>
            <Grid container>
                <Grid item md={2} key={'filter'} sx={{border: 'black solid 1px'}}>
                    <h1>Filter</h1>
                    <FormControl>
                        <h2>Service Type:</h2>
                        {Object.keys(checked).map((taskName, idx) => {
                            return (
                                <FormControlLabel
                                key={idx}
                                label={serviceName[idx]}
                                control={
                                    <Checkbox
                                        checked={services[taskName]}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        name={taskName}
                                    />
                                }
                            />
                            )
                        })}
                    </FormControl>
                </Grid>
                <Grid item md={7} key={'service list'} sx={{border: 'black solid 1px'}}>
                    {
                        filteredServices.map((service, idx) => {
                            return <ServiceCard key={service.id} service={service} count={idx+1}/>
                        })
                    }
                </Grid>
                <Grid item md={3} key={'map'} sx={{border: 'black solid 1px'}}>
                    <h1>Map</h1>
                </Grid>
            </Grid>
        </>
    );
};

export default Service;