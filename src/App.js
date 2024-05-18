import './App.css';
import Column from "./Column";
import {useState} from "react";
import {Button, Container, InputGroup, Form, Row} from "react-bootstrap";


const columns = [
    {id: 1, title: 'To do', status: 'todo'},
    {id: 2, title: 'In review', status: 'review'},
    {id: 3, title: 'In test', status: 'test'},
    {id: 4, title: 'Finish', status: 'finish'}
]

const taskList = [
    {id: 11, name: 'Counter App', status: 'todo', priority: '1'},
    {id: 12, name: 'ToDo List App', status: 'todo', priority: '5'},
    {id: 13, name: 'Memory Game App', status: 'review', priority: '4'},
    {id: 14, name: 'Tic Tac Toe App', status: 'test', priority: '9'},
    {id: 15, name: 'Booking App', status: 'finish', priority: '7'},
    {id: 16, name: 'Shopping Cart App', status: 'review', priority: '3'},
    {id: 17, name: 'Weather Widgets App', status: 'test', priority: '8'},
]

function App() {

    const [tasks, setTasks] = useState(taskList)

    const statuses = ['todo', 'review', 'test', 'finish']

    const [addModeOn, setAddModeOn] = useState(false)

    const [newTask, setNewTask] = useState('')

    const [newPriority, setNewPriority] = useState('')

// todo  change priority

    const changePriority = (id, direction) => {

        const newTasks = tasks.map(task => {
            if (task.id === id) {
                if (direction === 'up') return {...task, priority: +task.priority + 1};
                if (direction === 'down'  && task.priority !== 0) return {...task, priority: +task.priority - 1};
            }
            return task;
        })
        setTasks(newTasks);
    }

//  todo change status

    const changeStatus = (id, direction) => {

        const newTasks = tasks.map(task => {
            if (task.id === id) {
                if (direction === 'left') {
                    return {...task, status: statuses[statuses.indexOf(task.status) - 1]};
                }
                if (direction === 'right') {
                    return {...task, status: statuses[statuses.indexOf(task.status) + 1]};
                }
            } else {
                return task
            }
        })
        setTasks(newTasks)
    }

//   delete task

    const deleteTask = (id) => {

        if (window.confirm('Delete?')) {

            const newTasks = tasks.filter(task => task.id !== id);
            setTasks(newTasks)
        }
    }

    //   edit task

    const editTask = (id, newName) => {
        const newTasks = tasks.map(task => {
            if (task.id === id) return {...task, name: newName};
            return task
        })
        setTasks(newTasks)

    }

    //   add task

    const addNewTask = (newTask, newPriority) => {
        const newTasks = [...tasks, {id: Math.random(), name: newTask, status: 'todo', priority: newPriority}];
        setTasks(newTasks)
        setAddModeOn(false)
        setNewTask('')
        setNewPriority('')
    }

    return (
        <Container>

            <h1>Kanban V-1</h1>
            <hr/>

            {!addModeOn && (
                <Button
                    onClick={() => setAddModeOn(true)}
                    variant="outline-info"
                    className='m-4'
                >
                    Add new task
                </Button>

            )}

            {addModeOn && (
                <>

                    {/*// todo input*/}

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Task
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        // section_input>input:focus {
                            className="shadow-none"


                        />
                    </InputGroup>
                    <br/>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Priority
                        </InputGroup.Text>
                        <Form.Control
                            type='number'
                            min={1}
                            max={10}
                            aria-label="Priority"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                            className="shadow-none"
                        />
                    </InputGroup>
                    <Button
                        onClick={() => addNewTask(newTask, newPriority)}
                        variant='outline-danger'
                        className='m-2'
                    >
                        Save
                    </Button>

                    <Button
                        onClick={() => setAddModeOn(false)}
                        variant='outline-danger'
                        className='m-2'
                    >
                        Cancel
                    </Button>

                </>
            )}

            <br/>

            <Container>

                <Row>



                    {columns.map(column =>

                        <Column
                            column={column}
                            tasks={tasks}
                            key={column.id}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            changeStatus={changeStatus}
                            changePriority={changePriority}
                        />
                    )}


                </Row>

            </Container>

        </Container>
    );
}

export default App;
