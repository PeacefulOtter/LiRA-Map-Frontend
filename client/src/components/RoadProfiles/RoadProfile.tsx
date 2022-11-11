import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContext from '@mui/lab/TabContext';
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CheckboxList from "./CheckboxList";
import Graph from "./Graph";
import {useEffect,useState} from "react";
import {RoadData, Segment} from "../../pages/RoadCondition";
import segments from "../CarData/Segments";

export default function RoadProfile(roadData:RoadData) {

    const [checked, setChecked] = useState<boolean[]>(new Array(roadData.segmentList.length).fill(true));


    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5">{roadData.roadName}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Button variant="outlined">ADD TO LIST</Button>

                        <CheckboxList
                            checked = {checked}
                            setChecked = {setChecked}
                        >
                        </CheckboxList>
                    </Grid>
                    <Grid item xs={5}>
                        <TabContext value={value}>
                            <TabList onChange={handleChange}>
                                <Tab label="Condition" value="1" />
                                <Tab label="Energy" value="2" />
                                <Tab label="Friction" value="3" />
                                <Tab label="Aviation" value="4" />
                            </TabList>
                            <TabPanel value="1">
                                <div> </div>
                                <Graph segments = {roadData.segmentList}></Graph>
                            </TabPanel>
                            <TabPanel value="2">
                                <Graph segments = {roadData.segmentList}></Graph>
                            </TabPanel>
                            <TabPanel value="3">
                                <div> </div>
                                <Graph segments = {roadData.segmentList}></Graph>
                            </TabPanel>
                            <TabPanel value="4">
                                <Graph segments = {roadData.segmentList}></Graph>
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}