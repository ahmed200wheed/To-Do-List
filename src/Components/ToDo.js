import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useContext , useState} from 'react';
import { TodosContext } from '../contexts/todosContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';



export default function ToDo({todo,handleCheck}){
  const [open, setOpen] = useState(false);
  const {todos, setTodos} = useContext(TodosContext)
  function handleCheckClick(){
       const updatetodo = todos.map((t)=>{
         if (t.id == todo.id) 
          {
          t.isCompleted = ! t.isCompleted;
         }
         return t;
        });
        setTodos(updatetodo);
  }

  function handleDeleteConfirm() {
  const updatedTodos = todos.filter((t) => t.id != todo.id);
  setTodos(updatedTodos);
  setOpen(false);
}

  
  function handleClickOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  }
    return(
        <>
      <Dialog style={{direction:"rtl"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من حذف هذه المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          بعد الضغط علي موافق لا يمكن التراجع عن الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا اوافق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            موافق
          </Button>
        </DialogActions>
      </Dialog>
    <Card className='todocard'
    sx={{ minWidth: 275 , background:"#7A1CAC" , color:"white",marginTop:"20px"}} >
      <CardContent>
        <Grid container spacing={2}>
        <Grid size={8}>
          <Typography variant="h4" style={{textAlign:"right"}}>
          {todo.title}
        </Typography>

         <Typography variant="h6" style={{textAlign:"right"}}>
          {todo.details}
        </Typography> 
        </Grid>
        <Grid size={4} 
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        >
            <IconButton 
              onClick={()=>{
                handleCheckClick();
              }}
              className='iconButton'
              aria-label="check"
              style={{color: todo.isCompleted ? "white": "green",
                background: todo.isCompleted ? "green": "white",
              border:"3px solid green"}}>
                <CheckIcon />
            </IconButton>

            <IconButton 
              className='iconButton'
              aria-label="edit"
              style={{color:"blue",background:"white",border:"3px solid blue"}}>
                <ModeEditOutlineOutlinedIcon />
            </IconButton>

            <IconButton
              className='iconButton'
              aria-label="delete"
              style={{color:"red",background:"white",border:"3px solid red"}}
              onClick={handleClickOpen}
              >
                <DeleteOutlineIcon />
            </IconButton>
        </Grid>
        </Grid>

        
        
      </CardContent>
    </Card>
        </>
    )
}