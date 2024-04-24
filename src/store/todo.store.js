import { Todo } from "../todos/models/todo.model";

export const Filters ={
    All:'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state={

    todos:[
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de la realidad'),
    ],

    filter: Filters.All

}

const initStore=()=>{
    console.log(state);
    console.log('es de tipo', typeof(state.filter));
    console.log('initStore 🥑');

    loadStore();
}

const loadStore=()=>{
    if (!localStorage.getItem('state')) return;
    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage=()=>{
    localStorage.setItem('state', JSON.stringify(state) );
    
}

const getTodos= (filter= Filters.All)=>{

    switch( filter ){
        case Filters.All:
            // (...), estás creando una nueva instancia de la matriz, lo que significa que las referencias de los dos arrays no están relacionadas.
            return [...state.todos];
        
        case Filters.Completed:
            //hacer todo.done es igual que  todo.done===true
            return state.todos.filter( todo => todo.done );
            
        case Filters.Pending:
            //hacer !todo.done es igual que  todo.done===false
            return state.todos.filter( todo => !todo.done );
        
        default:
            throw new Error (`Option ${ filter } is not valid`);

    }

}


/**
 * @param {string} description
 */

const addTodo =(description)=>{
    if(!description) throw new Error('description is required');
    
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * 
 * @param {string} todoId Identidicador de todo 
 */

const toggleTodo= (todoId)=>{
    state.todos= state.todos.map(todo=>{
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }
        console.log(todo.done);
        return todo;
    });
    
    saveStateToLocalStorage();
}

const deleteTodo =(todoId)=>{
  state.todos= state.todos.filter(todo => todo.id !== todoId)
    
  saveStateToLocalStorage();

}

const deleteCompleted =()=>{
    state.todos= state.todos.filter( todo => !todo.done );

    saveStateToLocalStorage();
    
}

/**
 * 
 * @param {Filters} newFilter 
 */

//Función para cambiar de filtro
const setFiler=(newFilter = Filters.All)=>{
    state.filter= newFilter;
    
}

//Para tener acceso al objeto state de una manera mas controlada
const getCurrentFilter = ()=>{
    return state.filter;
    
}

export default{
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFiler,
    getCurrentFilter
}