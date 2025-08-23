import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { TodosContext } from '../contexts/todosContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState , useEffect} from 'react';



export default function ToDoList() {


  useEffect(()=>{
    console.log("Hello World");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  } , [])

  function handleAddClick(){
    const newTodo = {
      id: uuidv4(),
      title:titleInput,
      details:"",
      isCompleted: false,
    }

    const updatedTodos = [...todos , newTodo]
    setTodos(updatedTodos);
    localStorage.setItem("todos" , JSON.stringify(updatedTodos));
    setTitleInput("")

    }
  const {todos,setTodos} = useContext(TodosContext);
  const [titleInput , setTitleInput] = useState("");
  const todoJSX=todos.map((t)=>{
    return <ToDo key={t.id} todo={t} />    
  })
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
         <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h2" component="div" style={{fontWeight:"bold"}}>
          قائمة المهام
        </Typography>
        <Divider />

        <ToggleButtonGroup style={{direction:"ltr",margin:"30px"}}
      color="primary"
    //   value={alignment}
      exclusive
    //   onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web" style={{fontWeight:"bold"}} >المنجز</ToggleButton>
      <ToggleButton value="android" style={{fontWeight:"bold"}} >غير المنجز</ToggleButton>
      <ToggleButton value="ios" style={{fontWeight:"bold"}} >الكل</ToggleButton>
    </ToggleButtonGroup>

    {todoJSX}


    <Grid container style={{marginTop:"20px"}}spacing={2}>
        <Grid size={8} >
          <TextField style={{width:"100%"}}
          id="outlined-basic"
          label="عنوان المهمة"
          variant="outlined" 
          value={titleInput}
          onChange={(e)=>{
            setTitleInput(e.target.value)
          }}
          />
        </Grid>
        <Grid size={4} style={{}}>
          <Button variant="contained" 
          style={{
            width:"100%",
            height:"100%",
            fontWeight:"bold",
            fontSize:"20px"
            }}
            onClick={handleAddClick}
            >إضافة</Button>
        </Grid>
    </Grid>
      </CardContent>
    </Card>
      </Container>
    </>
  );
}