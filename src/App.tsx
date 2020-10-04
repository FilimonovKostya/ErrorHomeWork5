import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    id:string
    title:string
    isDone:boolean
}

export type TasksStateType = {
    [key: string] : Array<TasksType>
}

function App() {


    let todoListID1 = v1()
    let todoListID2 = v1()

    let [tasks,setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "All", isDone: false},
            {id: v1(), title: "WebPack", isDone: true},
            {id: v1(), title: "NodeJs", isDone: true},
        ]
    })


    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), title: 'What to learn', filter: "active"},
        {id: v1(), title: 'Why u should know?', filter: "completed"},
    ])



    function removeTask(id: string, todoListID:string) {
       let todoListsTasks = tasks[todoListID]
        tasks[todoListID] = todoListsTasks.filter(f=> f.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID:string) {
       let task = {id:v1(), title: title , isDone: false}
        let todolistTasks = tasks[todoListID]
         tasks[todoListID] = [task,...todolistTasks]
        //не понятно вообще ничего
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID:string) {
       let changeTask = tasks[todoListID]
        let getTask = changeTask.find(f=> f.id === taskId)
        if(getTask){
            getTask.isDone = isDone
            setTasks({...tasks})
        }
    }


    function changeFilter(value: FilterValuesType , todoListID:string) {
        //1. мы находим нужный нам тудулист, id которого придет в todoListID и мы его проверяем с уже известными f.id и он выберет нужный
        debugger
        let todoList = todoLists.find(f=> f.id === todoListID)
        if(todoList){
            debugger
            todoList.filter = value // здесь мы меняем значение фильтра на пришедшее в value
            setTodoLists([...todoLists]) // просто вызываем перерисовку
        } else {
            setTodoLists([...todoLists])
        }
    }

debugger
    return (
        <div className="App">

            {
                todoLists.map(tl => {
                    debugger
                    let allTodoListTasks  = tasks[tl.id]
                    let tasksForTodolist = allTodoListTasks;
                            debugger
                    if (tl.filter === "active") {
                        debugger
                        tasksForTodolist = allTodoListTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        debugger
                        tasksForTodolist = allTodoListTasks.filter(t => t.isDone);
                    }

                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     todoID={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }


        </div>
    );
}

export default App;
