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
import TextField from '@mui/material/TextField';



export default function ToDo({todo,handleCheck}){
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatedTodo,setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details
  })
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
        localStorage.setItem("todos" , JSON.stringify(updatetodo));
  }

  function handleDeleteConfirm() {
  const updatedTodos = todos.filter((t) => t.id != todo.id);
  setTodos(updatedTodos);
  setOpen(false);
  localStorage.setItem("todos" , JSON.stringify(updatedTodos));
}


  function handleUpdateConfirm() {
  const updatedtodos = todos.map((t)=>{
    if (t.id == todo.id){
      return {...t , title:updatedTodo.title , details:updatedTodo.details}
    }else{
      return t
    }
  })
  setTodos(updatedtodos);
  setUpdate(false);
  localStorage.setItem("todos" , JSON.stringify(updatedtodos));
  }
  
  function handleClickOpen(){
    setOpen(true);
  };


  function handleUpdateClick(){
    setUpdate(true);
  };


  function handleDeleteClose(){
    setOpen(false);
  };

  function handleUpdateClose(){
    setUpdate(false);
  };


    return(
        <>
      <Dialog style={{direction:"rtl"}}
        open={open}
        onClose={handleDeleteClose}
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
          <Button onClick={handleDeleteClose}>لا اوافق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            موافق
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog style={{direction:"rtl"}}
        open={update}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"تعديل المهمة"}
        </DialogTitle>
        <DialogContent>
           <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) => {
                setUpdatedTodo({...updatedTodo , title: e.target.value})
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="التفاصيل"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) => {
                setUpdatedTodo({...updatedTodo , details: e.target.value})
              }}
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>لا اوافق</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            تعديل
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
              onClick={handleUpdateClick}
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