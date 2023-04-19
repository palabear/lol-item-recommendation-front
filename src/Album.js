import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import champions_list from './ChampionList';
import {useState} from 'react';
import axios from "axios";
import default_Img from "./teeeemo.jpg"
import item_list from "./item_lsit.json"



const champions = champions_list;


const theme = createTheme();

export default function Album() {       
    const [myChampion, setMyChampionid] = useState(0);
    const [enemyChampion,setEnemyChampionid] = useState(0);
    const [itemImage,setItemImage] = useState([1,2,3,4,5,6]);

    const onErrorImg = (e) => {
      e.target.src = default_Img
    }
    
    
    const fetchUsers = async () => {   
      try {             
        const res = await axios.get("http://localhost:8080/recommend",{params:{'my_champion': myChampion, 'enemy_champion': enemyChampion},});        
        const itemjson = JSON.stringify(res.data)
        if (itemjson == null) {          
          setItemImage([0,0,0,0,0,0])
        } else {
          const parsed = JSON.parse(itemjson)
          setItemImage([parsed.recommand_craft_1,parsed.recommand_craft_2,parsed.recommand_craft_3,parsed.recommand_value_1,parsed.recommand_value_2,parsed.recommand_value_3])          
          console.log(parsed.recommand_craft_1);
        }
        
        console.log(itemjson)
        
        //parsed.
      } catch (e) {
        console.log(e)
      }      
    };    

    const getItemname = (itemid) =>{         
        try{
          return item_list.data[itemid].name
        } catch(e){
          return 'Choose Champion'
        }
    };
    
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>         
            <Typography variant="h5" color="inherit" noWrap>
              League of Legend item recommendation
            </Typography>
          </Toolbar>
        </AppBar>
        <main>         
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 4,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">           
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
              <b>How to use</b><br/> Select your champion, Select enemy champion and press the "Recommend" button
              </Typography>
              <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">My Champion</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"                
                  label="My Champion"
                  onChange = {(e)=> (setMyChampionid(e.target.value))}
              >
                  {champions.map((champ)=>(
                      <MenuItem value={champ.champion_id}>{champ.champion_name}
                      </MenuItem>
                  ))}           
              </Select>            
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Enemy Champion</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"                
                  label="Enemy Champion"
                  onChange = {(e)=> (setEnemyChampionid(e.target.value))}         
              >
                  {champions.map((champ)=>(
                      <MenuItem value={champ.champion_id}>{champ.champion_name}</MenuItem>
                  ))} 
              </Select>            
              </FormControl>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button onClick={fetchUsers} variant="contained">Recommend</Button>           

              </Stack>
            </Container>
          </Box>          
          <Container sx={{ py: 8 }} maxWidth="md">            
            <Grid container spacing={4}>
              {itemImage.map((itemimg) => (
                <Grid item key={itemimg} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"                      
                      image= {`http://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${itemimg}.png`}
                      alt=""
                      onError={onErrorImg}                      
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" align='center' onError ='Empty' >
                        {getItemname(itemimg)}                       
                      </Typography>                                       
                    </CardContent>                    
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>      
      </ThemeProvider>
    );
}

