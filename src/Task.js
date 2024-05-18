import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Form} from "react-bootstrap";
import {
    ArrowDown,
    ArrowLeftCircleFill,
    ArrowRightCircleFill,
    ArrowUp,
    PenFill,
    Trash3Fill
} from "react-bootstrap-icons";

const Task = ({task, editTask, deleteTask, changeStatus, changePriority}) => {

    const [editModeOn, setEditModeOn] = useState(false)

    const [newName, setNewName] = useState('')

    const handleEditTask = () => {
        editTask(task.id, newName);
        setEditModeOn(false);
        setNewName('')
    }


    return (
        <Card
            className='d-flex-column justify-content-between align-items-center m-3'
            style={{border:'none'}}
        >
            <Card.Body>

                <div className='d-flex justify-content-between align-items-center mb-5'>
                    <div className='me-4'>

                        <Card.Title>{task.name}</Card.Title>

                        <Card.Subtitle>Status:{task.status}</Card.Subtitle>

                    </div>


                    <ButtonGroup
                        vertical
                        className='d-flex align-items-center'
                    >
                        {task.priority >= 1 && task.priority <= 9 && (
                            <Button
                                onClick={() => changePriority(task.id, 'up')}
                                variant="outline-info"
                                size='s'
                            >
                                <ArrowUp/>

                            </Button>
                        )}

                        <h5>  {task.priority}  </h5>

                        {task.priority >= 2 && task.priority <= 10 && (

                            <Button
                                onClick={() => changePriority(task.id, 'down')}
                                variant="outline-info"
                                size='s'
                            >
                                <ArrowDown/>

                            </Button>

                        )}
                    </ButtonGroup>

                </div>

                <div className='d-flex justify-content-around'>
                    {task.status !== 'todo' && (
                        <Button
                            onClick={() => changeStatus(task.id, 'left')}
                            variant="outline-info"
                        >
                            <ArrowLeftCircleFill/>
                        </Button>
                    )}

                    {task.status !== 'finish' && (
                        <Button
                            onClick={() => changeStatus(task.id, 'right')}
                            variant="outline-info"
                        >
                            <ArrowRightCircleFill/>
                        </Button>
                    )}

                </div>


                <hr/>

                <footer>

                    {editModeOn ? (
                        <>
                            <Form.Control
                                placeholder='New Task name'
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                            />
                            <br/>
                            <div className='d-flex justify-content-around'>
                                <Button
                                    onClick={handleEditTask}
                                    variant="outline-danger"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setEditModeOn(false)}
                                    variant="outline-danger"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='d-flex justify-content-around'>
                                <Button
                                    onClick={() => setEditModeOn(true)}
                                    variant="outline-danger"
                                >
                                    <PenFill/>

                                </Button>

                                <Button
                                    onClick={() => deleteTask(task.id)}
                                    variant="outline-danger"
                                >
                                    <Trash3Fill/>

                                </Button>
                            </div>
                        </>
                    )}
                </footer>

                <hr/>


            </Card.Body>


        </Card>
    );
};

export default Task;