import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";

/**
 * 
 * @param {String} elementId 
 */

const ElementIDs={
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',

}

export const App = ( elementId ) =>{
    const displayTodos=()=>{
        const todos= todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }


    const updatePendingCount = () =>{
        renderPending(ElementIDs.PendingCountLabel);
    }

    // Cuando la función App() se llama
    (()=>{
        const app= document.createElement('div');
        app.innerHTML=html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput= document.querySelector( ElementIDs.NewTodoInput );
    const todoListUl= document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton= document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIS= document.querySelectorAll(ElementIDs.TodoFilters);
 
    
    //Listeners
    newDescriptionInput.addEventListener('keyup', (event)=>{
        if( event.key !=='Enter') return;
        if( event.target.value.trim().length === 0) return;
        
        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value= '';
    });

    todoListUl.addEventListener('click', (event)=>{
       
        const element= event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })
    
    todoListUl.addEventListener('click', (event)=>{

        const element= event.target.closest('[data-id]');
        
        if(!element || event.target.className!=='destroy') {
            return;
        };
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
      
    })
    
    
    clearCompletedButton.addEventListener('click', ()=>{

        
        todoStore.deleteCompleted();
        displayTodos();
    });

    //No se porque Fernando usa el nombre de element tanto como parametro usando forEach como en el addEventListener, pero teneer en cuenta que son distintos solo que se llaman igual. Eso si , si dentro del listener no encontrara elemento lo buscaria en el forEach por como esta construido
    //normalmente yo he visto hasta la fecha que se usa 'event' o 'e' como nombre del parametro para el listener
    filtersLIS.forEach(element=>{
        element.addEventListener('click', (element)=>{
            filtersLIS.forEach(elem=>elem.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFiler(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFiler(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFiler(Filters.Completed);
                    break;

                
            }
            displayTodos();

        })
    })


}